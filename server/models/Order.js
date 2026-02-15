import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  customerAddress: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productVariant: {
    type: String,
    default: '',
  },
  variantPrice: {
    type: String,
    required: true,
  },
  productUrl: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Order', orderSchema);
