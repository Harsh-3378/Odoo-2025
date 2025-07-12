import Product from '../models/Products.js';
import { v4 as uuidv4 } from 'uuid';

const generateProductId = () => {
  return `PROD_${uuidv4().split('-')[0].slice(0, 6).toLowerCase()}`;
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

    const owner = req.user._id; 

    const product_id = generateProductId();

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

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products'
    });
  }
};

export const getProductById = async (req, res) => {
  console.log('Fetching product with ID:', req.params.id);
  try {
    const product = await Product.findOne({ product_id: req.params.id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching product'
    });
  }
};

export const getUserProducts = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log('Fetching products for user ID:', userId);
    const products = await Product.find({ owner: userId });
    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user products'
    });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products by category'
    });
  }
};