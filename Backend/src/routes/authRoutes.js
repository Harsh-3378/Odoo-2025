import express from "express";
import { check } from "express-validator";

import authController from "../controllers/authController.js";
import {googleAuthentication} from "../controllers/googleAuthentication.js";

import { authenticate } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validator.js";

const router = express.Router();

// Google Auth route
router.post(
  "/googleAuth",
  [check("token", "Google ID token is required").not().isEmpty()],
  validateRequest,
  googleAuthentication,
);

// Register user
router.post(
  "/register",
  [
    // check("username", "Username is required").not().isEmpty().trim(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  validateRequest,
  authController.register,
);

// Login user
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  validateRequest,
  authController.login,
);

// Get current user
router.get("/userData", authenticate, authController.getMe);

export default router;
