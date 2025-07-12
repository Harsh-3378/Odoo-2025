import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  user_id: {
    type: String,
    required: true,
    unique: true,
    trim:true,
  },first_name: {
    type: String,
    default: null,
  },
  last_name: {
    type: String,
    default: null,
  },
   email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    minlength: 6,
    required: function () {
      return !this.googleId; // Required only if not using Google auth
    },
  },
  googleId: {
    type: String,
    default: null,
  },
  gender:{
    type: String,
    enum:['male','female','other'],
    // required: true   
  },
  avatar: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    maxlength: 500
  },
  location: {
    city: String,
    state: String,
    country: String
  },
  points: {
    type: Number,
    default: 100 // Starting bonus points
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  preferences: {
    sizes: [String],
    categories: [String],
    brands: [String]
  },
  stats: {
    totalSwaps: { type: Number, default: 0 },
    totalListings: { type: Number, default: 0 },
    rating: { type: Number, default: 5.0 },
    reviewCount: { type: Number, default: 0 },
    sustainabilityScore: { type: Number, default: 0 }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password only if it exists and is modified
userSchema.pre('save', async function (next) {
  if (!this.password || !this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare passwords only if user has one
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema, 'users');

export default User;