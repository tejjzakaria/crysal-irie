import { connectToDatabase } from '../_lib/mongodb.js';
import { Category } from '../_lib/models.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function setCors(req, res) {
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
  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));
}

export default async function handler(req, res) {
  setCors(req, res);

  if (req.method === 'OPTIONS') return res.status(200).end();

  const id = req.query.id || req.url?.split('/').filter(Boolean).pop()?.split('?')[0];

  try {
    if (!id) {
      return res.status(400).json({ message: 'Category ID is required' });
    }

    await connectToDatabase();

    if (req.method === 'GET') {
      const category = await Category.findById(id);
      if (!category) return res.status(404).json({ message: 'Category not found' });
      return res.status(200).json(category);
    }

    if (req.method === 'PUT') {
      const category = await Category.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!category) return res.status(404).json({ message: 'Category not found' });
      return res.status(200).json(category);
    }

    if (req.method === 'DELETE') {
      const category = await Category.findByIdAndDelete(id);
      if (!category) return res.status(404).json({ message: 'Category not found' });
      return res.status(200).json({ message: 'Category deleted successfully' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error(`API Error [/api/categories/${id}]:`, error);
    return res.status(500).json({ message: error.message });
  }
}
