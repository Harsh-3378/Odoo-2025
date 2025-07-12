// const authService = require('../services/authService');
import authService from '../services/authService.js';

const register = async (req, res) => {
  try {
    const userData = {
    username: req.body.username,
    name: req.body.name, 
    email: req.body.email,
    password: req.body.password,
    role: req.body.role || 'user',
  };


    const result = await authService.registerUser(userData);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser(email, password);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await authService.getCurrentUser(req.user.user_id);

    // Determine if profile is pending (any required field is missing or empty)
    const profilePending =
      !user.first_name ||
      !user.last_name ||
      !user.bio ||
      !user.gender ||
      !user.avatar ||
      !user.location ||
      !user.location.city ||
      !user.location.state ||
      !user.location.country;

    res.status(200).json({
      success: true,
      data: {
        ...user.toObject(),
        profilePending,
      },
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};


export default {register,login,getMe};
