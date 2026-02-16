import { connectToDatabase } from '../_lib/mongodb.js';
import { Product } from '../_lib/models.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectToDatabase();

    // GET simplified product list for debugging
    if (req.method === 'GET') {
      const products = await Product.find({}, 'name slug _id mainImage inStock')
        .sort({ createdAt: -1 });

      return res.status(200).json({
        count: products.length,
        products: products.map(p => ({
          _id: p._id,
          name: p.name,
          slug: p.slug || 'NO_SLUG',
          mainImage: p.mainImage,
          inStock: p.inStock,
          url: `/product/${p.slug || p._id}`,
        }))
      });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('[API Error] /api/products/list:', error);
    return res.status(500).json({
      message: error.message,
    });
  }
}
