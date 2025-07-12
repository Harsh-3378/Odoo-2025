import mongoose from 'mongoose';

const pointPurchaseRequestSchema = new mongoose.Schema({
  product: {
    type: String, // product_id (not _id)
    required: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PointPurchaseRequest = mongoose.model('PointPurchaseRequest', pointPurchaseRequestSchema, 'point_purchase_requests');

export default PointPurchaseRequest;
