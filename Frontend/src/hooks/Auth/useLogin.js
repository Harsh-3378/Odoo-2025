// src/hooks/useLogin.js
import API_URLS from "@/api/apiUrls";
import { postData } from "@/services/authApi";
import { setupUser } from "@/utils/authHelper";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (data) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await postData(API_URLS.auth.login, data);
      setupUser(response, dispatch, navigate);
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setError(null);
  };

  return { login, isLoading, error, reset };
};
