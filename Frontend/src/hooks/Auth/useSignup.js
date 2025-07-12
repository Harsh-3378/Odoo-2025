// src/hooks/useSignup.js

import { signupUser } from "@/services/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (data) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await signupUser(data);
      if (response?.data?.status === 200) {
        navigate("/login");
      } else {
        throw new Error("Signup failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setError(null);
  };

  return { signup, isLoading, error, reset };
};
