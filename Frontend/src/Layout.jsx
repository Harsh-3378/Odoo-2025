import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { AppSidebar } from "./components/sidebar/AppSidebar";
import {useSidebar} from "@/components/ui/sidebar.jsx";

const Layout = () => {
  const { open } = useSidebar();
  const routesWithoutNavigation = ["login", "signup", "forgot-password", "reset-password", "logo"];
  const location = useLocation();
  const pathname = location.pathname;

  const currentRoute =
    pathname
      .split("/")
      .filter((segment) => segment !== "")
      .join("/") || "";

  const isNavigationVisible = !routesWithoutNavigation.includes(currentRoute);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize(); // initial check
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // const contentWidthClass = isMobile ? "w-full" : open ? "w-16remless" : "w-3remless";
  const contentWidthClass = "w-full";
// console.log("contentWidthClass", contentWidthClass);
  return (
    <div className="flex overflow-x-hidden min-h-dvh w-full">
      {/*{isNavigationVisible && <AppSidebar />}*/}
      <div
        className={`min-h-screen flex flex-col transition-all duration-300 ${
          isNavigationVisible ? contentWidthClass : "w-full"
        }`}
      >
        {isNavigationVisible && <Header className={contentWidthClass} />}
        <div
          className={`flex-1 overflow-x-hidden ${
            isNavigationVisible ? "px-3 lg:px-10 pt-17 pb-8" : "p-0"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
