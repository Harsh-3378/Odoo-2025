import FullPageLoader from "@/components/FullPageLoader";
import { loginUser, selectProfilePending } from "@/state/authSlice";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserData } from "./authApi";

const PUBLIC_ROUTES = ["/login", "/signup"];

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const hasCheckedAuth = useRef(false);
  const profilePending = useSelector(selectProfilePending);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (hasCheckedAuth.current) return;
      hasCheckedAuth.current = true;

      const token = localStorage.getItem("token");
      const isPublic = PUBLIC_ROUTES.includes(location.pathname);

      if (!token) {
        console.warn("[Auth] No token found. Redirecting to login.");
        localStorage.removeItem("token"); // Ensure token is removed

        if (!isPublic) {
          toast.error("Please login to access this page");
          navigate("/login", { replace: true });
        }
        setLoading(false);
        return;
      }

      try {
        const response = await getUserData();
        // Fix: handle user data at any of the possible locations
        const user =
          response?.data?.user ||
          response?.data?.data?.user ||
          response?.data?.data ||
          response?.data;

        console.log("userData", user);

        if (!user || typeof user !== "object" || Array.isArray(user)) {
          console.warn("[Auth] Token is present but user data is malformed:", user);
          throw new Error("Malformed user data");
        }

        dispatch(
          loginUser({
            data: {
              data: user,
              auth_token: token,
              email: user.email || "",
              profilePending: user.profilePending ?? true,
            },
          }),
        );

        // Redirect based on profilePending
        if (user.profilePending ?? true) {
          navigate("/profile-setup", { replace: true });
        } else if (isPublic) {
          console.log("[Auth] Redirecting to /home since user is already logged in.");
          toast.success("Already logged in, redirecting...");
          navigate("/home", { replace: true });
        }
      } catch (err) {
        const status = err?.response?.status;
        const isAuthError = status === 401 || status === 403;

        console.error("[Auth] Auth error:", err?.message || err);

        // Clear token and redirect to login for any authentication error
        localStorage.removeItem("token");

        if (isAuthError) {
          toast.error("Session expired. Please login again.");
        } else {
          toast.error("Authentication failed. Please login again.");
        }

        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [dispatch, location.pathname, navigate]);

  // Redirect to profile setup if profile is pending and not already on that page
  // if (!loading && profilePending && location.pathname !== "/profile-setup") {
  //   navigate("/profile-setup", { replace: true });
  //   return null;
  // }

  if (loading) return <FullPageLoader />;
  return children;
};

export default AuthProvider;
