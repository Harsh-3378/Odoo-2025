import express from 'express';
import { check } from 'express-validator';
import { validateRequest } from "../middleware/validator.js";
import { authenticate } from "../middleware/auth.js";
import { registerProduct } from '../controllers/productController.js';


const router = express.Router();

router.post(
  '/add',
  authenticate, // make sure user is authenticated
  [
    check('title', 'Title is required').notEmpty(),
    check('description', 'Description is required').notEmpty(),
    // check('category', 'Invalid category').isIn([
    //   'tops', 'bottoms', 'dresses', 'outerwear', 'shoes',
    //   'accessories', 'bags', 'jewelry'
    // ]),
    check('type', 'Type is required').notEmpty(),
    // check('size', 'Invalid size').isIn([
    //   'XS', 'S', 'M', 'L', 'XL', 'XXL', '6', '7', '8', '9', '10', '11', '12', 'One Size'
    // ]),
    check('color', 'Color is required').notEmpty(),
    // check('condition', 'Invalid condition').isIn([
    //   'New with tags', 'Like new', 'Good', 'Fair', 'Poor'
    // ]),
    check('pointsValue', 'Points value must be at least 10').isInt({ min: 10 })
  ],
  validateRequest,
  registerProduct
);

export default router;
