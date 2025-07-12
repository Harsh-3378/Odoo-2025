import express from 'express';
import { check } from 'express-validator';
import { validateRequest } from "../middleware/validator.js";
import { authenticate } from "../middleware/auth.js";
import { requestPointPurchase } from '../controllers/purchaseController.js';

const router = express.Router();

router.post(
  '/request',
  authenticate,
  [
    check('product_id', 'Product ID is required').notEmpty(),
    check('points', 'Points must be a positive number').isInt({ min: 1 }),
  ],
  validateRequest,
  requestPointPurchase
);

export default router;
