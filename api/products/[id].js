import { connectToDatabase } from '../_lib/mongodb.js';
import { Product } from '../_lib/models.js';

export default async function handler(req, res) {
  // Enable CORS
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:8080',
    'http://localhost:5001',
    process.env.FRONTEND_URL,
  ].filter(Boolean);

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Fallback: extract id from URL path if req.query.id is not populated
  // (can happen when the request is routed via a vercel.json rewrite)
  const id = req.query.id || req.url?.split('/').filter(Boolean).pop()?.split('?')[0];

  try {
    if (!id) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    await connectToDatabase();

    // GET single product
    if (req.method === 'GET') {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(product);
    }

    // UPDATE product
    if (req.method === 'PUT') {
      const product = await Product.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(product);
    }

    // DELETE product
    if (req.method === 'DELETE') {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json({ message: 'Product deleted successfully' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error(`API Error [/api/products/${id}]:`, error);
    return res.status(500).json({
      message: error.message,
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
