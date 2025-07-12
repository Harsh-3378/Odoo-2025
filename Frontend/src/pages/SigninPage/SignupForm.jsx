import { PasswordInputField } from "@/components/FromComponents/PasswordInputField";
import { PasswordValidationPopover } from "@/components/FromComponents/PasswordValidationPopover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { setupUser, signupUser } from "@/utils/authHelper";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export function SignupForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("Passwords don't match");
    } else {
      setConfirmPasswordError("");
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) return;

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords don't match");
      return;
    }

    const payload = {
      email,
      password,
    };

    console.log("Signup payload:", payload);

    try {
      const signupResponse = await signupUser(payload);
      console.log("Signup success:", signupResponse);
      setupUser(signupResponse, dispatch, navigate);
      // Optionally handle navigation or state update here
    } catch (error) {
      console.error("Signup failed:", error);
      // Optionally show an error message to the user
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold mona-sans">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to create your account
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
          </div>
          <div className="relative">
            <PasswordInputField
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isError={!!passwordError && password.length > 0}
            />
            <PasswordValidationPopover
              password={password}
              isValid={isValid}
              passwordError={passwordError}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
          </div>
          <div className="relative">
            <PasswordInputField
              id="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isError={!!confirmPasswordError}
            />
            {confirmPasswordError && (
              <p className="text-xs text-red-500 mt-1">{confirmPasswordError}</p>
            )}
          </div>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={!isValid || password !== confirmPassword || !confirmPassword}
        >
          Create
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </form>
  );
}
