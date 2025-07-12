import PointPurchaseRequest from '../models/PointPurchaseRequest.js';
import Product from '../models/Products.js';

export const requestPointPurchase = async (req, res) => {
  try {
    const { product_id, points } = req.body;
    const buyer = req.user._id;

    // Find the product and its owner
    const product = await Product.findOne({ product_id });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    if (String(product.owner) === String(buyer)) {
      return res.status(400).json({ success: false, message: 'Cannot purchase your own product' });
    }

    // Create the purchase request
    const purchaseRequest = new PointPurchaseRequest({
      product: product_id,
      buyer,
      seller: product.owner,
      points,
      status: 'pending',
    });
    await purchaseRequest.save();

    res.status(201).json({
      success: true,
      message: 'Purchase request submitted',
      request: purchaseRequest,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
