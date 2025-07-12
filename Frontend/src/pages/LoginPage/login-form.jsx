import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/Auth/useLogin";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react"; // Import eye icons
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useLogin();

  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }

    if (!/[A-Za-z]/.test(password)) {
      setPasswordError("Password must contain at least one letter");
      return false;
    }

    if (!/[0-9]/.test(password)) {
      setPasswordError("Password must contain at least one number");
      return false;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      setPasswordError("Password must contain at least one special character");
      return false;
    }

    setPasswordError("");
    return true;
  };

  useEffect(() => {
    if (password) {
      const valid = validatePassword(password);
      setIsValid(valid);
    }
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      return;
    }

    // Create payload with form data
    const payload = {
      email,
      password,
    };
    const res = await login(payload);
    console.log("Login response:", res);
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold mona-sans">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={" " + (passwordError && password ? "border-red-500" : "")}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <AnimatePresence>
              {password && !isValid && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="absolute text-sm space-y-1 p-3 w-full top-10 left-0 shadow-lg z-10">
                    <p className={passwordError ? "text-red-500" : "text-green-500"}>
                      {passwordError || "✅ Valid password format"}
                    </p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li
                        className={`flex items-center gap-2 ${
                          password.length >= 8 ? "text-green-500" : ""
                        }`}
                      >
                        {password.length >= 8 ? "✅" : "⚪"} At least 8 characters
                      </li>
                      <li
                        className={`flex items-center gap-2 ${
                          /[A-Za-z]/.test(password) ? "text-green-500" : ""
                        }`}
                      >
                        {/[A-Za-z]/.test(password) ? "✅" : "⚪"} At least one letter
                      </li>
                      <li
                        className={`flex items-center gap-2 ${
                          /[0-9]/.test(password) ? "text-green-500" : ""
                        }`}
                      >
                        {/[0-9]/.test(password) ? "✅" : "⚪"} At least one number
                      </li>
                      <li
                        className={`flex items-center gap-2 ${
                          /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
                            ? "text-green-500"
                            : ""
                        }`}
                      >
                        {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? "✅" : "⚪"} At
                        least one special character
                      </li>
                    </ul>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={!isValid && password.length > 0}>
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to={"/signup"} className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
