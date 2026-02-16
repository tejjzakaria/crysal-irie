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
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Get slug from query parameter
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ message: 'Slug parameter is required' });
  }

  try {
    await connectToDatabase();

    // GET product by slug
    if (req.method === 'GET') {
      console.log('[API] Fetching product by slug:', slug);

      // Try to find by slug first
      let product = await Product.findOne({ slug });

      // If not found by slug, try to find by name (case-insensitive)
      // This helps if products were created without slugs
      if (!product) {
        console.log('[API] Product not found by slug, trying by name...');
        const decodedSlug = decodeURIComponent(slug).replace(/-/g, ' ');
        product = await Product.findOne({
          name: new RegExp(`^${decodedSlug}$`, 'i')
        });
      }

      // If still not found, try by _id in case slug is actually an ID
      if (!product && slug.match(/^[0-9a-fA-F]{24}$/)) {
        console.log('[API] Product not found by slug or name, trying by ID...');
        product = await Product.findById(slug);
      }

      if (!product) {
        console.log('[API] Product not found for slug:', slug);
        // List available products for debugging
        const allProducts = await Product.find({}, 'name slug _id').limit(10);
        console.log('[API] Available products:', allProducts.map(p => ({
          name: p.name,
          slug: p.slug,
          id: p._id
        })));
        return res.status(404).json({
          message: 'Product not found',
          slug,
          availableProducts: allProducts.map(p => ({ name: p.name, slug: p.slug }))
        });
      }

      console.log('[API] Product found:', product._id, product.name);
      return res.status(200).json(product);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('[API Error] /api/products/by-slug:', error);
    return res.status(500).json({
      message: error.message,
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
