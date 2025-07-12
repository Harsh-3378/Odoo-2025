import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true,
    unique: true,
    trim:true,
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  category: {
    type: String,
    required: true,
    // enum: ['tops', 'bottoms', 'dresses', 'outerwear', 'shoes', 'accessories', 'bags', 'jewelry']
  },
  type: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true,
    // enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '6', '7', '8', '9', '10', '11', '12', 'One Size']
  },
  brand: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true,
    // enum: ['New with tags', 'Like new', 'Good', 'Fair', 'Poor']
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  pointsValue: {
    type: Number,
    required: true,
    min: 10
  },
  images: [{
    url: String,
    alt: String
  }],
  tags: [String],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    // enum: ['pending', 'approved', 'rejected', 'available', 'reserved', 'swapped'],
    default: 'pending'
  },
  availability: {
    type: String,
    // enum: ['available', 'swap-only', 'points-only', 'both'],
    default: 'both'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  reports: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: String,
    reportedAt: {
      type: Date,
      default: Date.now
    }
  }],
  moderationNotes: String,
  rejectionReason: String,
  featuredUntil: Date,
  isPromoted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema, 'products');

export default Product;