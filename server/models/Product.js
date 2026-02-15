import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sku: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    required: true,
  },

  // Descriptions
  shortDescription: {
    type: String,
    required: true,
  },
  fullDescription: {
    type: String,
    required: true,
  },

  // Pricing
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    default: null,
  },

  // Inventory
  stockQuantity: {
    type: Number,
    required: true,
    default: 0,
  },
  inStock: {
    type: Boolean,
    default: true,
  },

  // Badge
  badge: {
    type: String,
    default: 'none', // 'none', 'new', 'sale', 'hot', etc.
  },

  // Additional Info
  warrantyNumber: {
    type: String,
    default: '',
  },

  // Metrics
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewsCount: {
    type: Number,
    default: 0,
  },
  salesCount: {
    type: Number,
    default: 0,
  },
  viewsCount: {
    type: Number,
    default: 0,
  },

  // Google Sheets Integration
  googleSheets: {
    email: {
      type: String,
      default: '',
    },
    spreadsheetId: {
      type: String,
      default: '',
    },
  },

  // Images (S3 URLs)
  images: {
    type: [String],
    default: [],
  },
  mainImage: {
    type: String,
    default: '',
  },

  // Product Features
  features: {
    type: [String],
    default: [],
  },

  // Product Properties (key-value pairs)
  properties: {
    type: Map,
    of: String,
    default: new Map(),
  },

  // Special Offers
  offers: [{
    title: String,
    description: String,
    price: Number,
    validUntil: Date,
  }],

  // Customer Reviews
  reviews: [{
    customerName: String,
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
});

export default mongoose.model('Product', productSchema);
