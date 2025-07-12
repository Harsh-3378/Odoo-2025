import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';


// Utility: Generate a unique user ID
const generateUserId = () => `user_${uuidv4().replace(/-/g, '').substring(0, 12)}`;

// Utility: Generate username from name or fallback
const generateUsername = (firstName = '', lastName = '', email = '') => {
  let prefix = '';
  if (firstName.length >= 2) prefix += firstName.slice(0, 2);
  if (lastName.length >= 2) prefix += lastName.slice(0, 2);
  if (!prefix && email) prefix = email.slice(0, 4);
  if (!prefix) prefix = 'user';
  return `${prefix.toLowerCase()}_${uuidv4().slice(0, 6)}`;
};

// JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// =========================
// 🟩 Register User
// =========================
const registerUser = async (userData) => {
  try {
    const existingUser = await User.findOne({
      $or: [{ email: userData.email }, { username: userData.username }],
    });

    if (existingUser) {
      if (existingUser.email === userData.email) {
        throw new Error('Email already in use');
      } else {
        throw new Error('Username already taken');
      }
    }

    // Generate ID and username
    const user_id = generateUserId();
    const username = generateUsername(userData.first_name, userData.last_name, userData.email);

    const user = new User({
      ...userData,
      user_id,
      username,
    });

    await user.save();
    const token = generateToken(user.user_id);

    return {
      user: {
        id: user._id,
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    };
  } catch (error) {
    throw error;
  }
};

// =========================
// 🟨 Login User (Traditional)
// =========================
const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = generateToken(user.user_id);

    return {
      user: {
        id: user._id,
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    };
  } catch (error) {
    throw error;
  }
};

// =========================
// 🟦 Login or Register with Google
// =========================
const loginOrRegisterGoogleUser = async ({ email, name, picture, googleId }) => {
  try {
    let user = await User.findOne({ email });

    if (!user) {
      const nameParts = name?.split(' ') || [];
      const firstName = nameParts[0] || '';
      const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';

      const user_id = generateUserId();
      const username = generateUsername(firstName, lastName, email);

      user = new User({
        user_id,
        username,
        email,
        name,
        first_name: firstName,
        last_name: lastName,
        profileImage: picture,
        googleId,
        password: googleId, // or a hashed dummy value if password validation exists
      });

      await user.save();
    }

    const token = generateToken(user.user_id);

    return {
      user: {
        id: user._id,
        user_id: user.user_id,
        username: user.username,
        name: user.name,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage || null,
      },
      token,
    };
  } catch (error) {
    throw error;
  }
};

// =========================
// 🟫 Get Current User
// =========================
const getCurrentUser = async (userId) => {
  try {
    const user = await User.findOne({ user_id: userId }).select('-password');
    if (!user) throw new Error('User not found');
    return user;
  } catch (error) {
    throw error;
  }
};


export default {
  registerUser,
  loginUser,
  loginOrRegisterGoogleUser,
  getCurrentUser
};