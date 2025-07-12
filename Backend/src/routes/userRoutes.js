import express from "express";
import { check } from "express-validator";
import { updateProfile } from "../controllers/userController.js";
import { authenticate } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validator.js";
import userService from "../services/userService.js"; // <-- add this

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// PUT /api/users/profile
router.put(
  "/profile",
  authenticate, // Attach user to req.user
  [
    check("first_name")
      .optional()
      .trim()
      .isLength({ min: 1 })
      .withMessage("First name must not be empty"),
    check("last_name")
      .optional()
      .trim()
      .isLength({ min: 1 })
      .withMessage("Last name must not be empty"),
    check("bio")
      .optional()
      .isLength({ max: 500 })
      .withMessage("Bio must be 500 characters or less"),
    check("gender").optional().isIn(["male", "female", "other"]).withMessage("Invalid gender"),
    check("avatar").optional().isURL().withMessage("Avatar must be a valid URL"),
    check("location.city").optional().isString(),
    check("location.state").optional().isString(),
    check("location.country").optional().isString(),
  ],
  validateRequest,
  updateProfile,
);

export default router;
