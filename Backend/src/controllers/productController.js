import Product from '../models/Products.js';
import { v4 as uuidv4 } from 'uuid';

const generateProductId = () => {
  return `prod-${uuidv4().split('-')[0].slice(0, 6).toLowerCase()}`;
};

export const registerProduct = async (req, res) => {
    console.log('Registering product with data:', req.user);
  try {
    const {
      title,
      description,
      category,
      type,
      size,
      brand,
      color,
      condition,
      originalPrice,
      pointsValue,
      images,
      tags,
      availability
    } = req.body;

    const owner = req.user._id; // 👈 Get from authMiddleware

    const product_id = `PROD-${uuidv4().slice(0, 6).toUpperCase()}`;

    const newProduct = new Product({
      product_id,
      title,
      description,
      category,
      type,
      size,
      brand,
      color,
      condition,
      originalPrice,
      pointsValue,
      images,
      tags,
      availability: availability || 'both',
      owner
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: 'Product registered successfully',
      product: newProduct
    });
  } catch (error) {
    console.error('Register product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while registering product'
    });
  }
};