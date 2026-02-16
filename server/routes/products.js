import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET simplified product list (for debugging)
router.get('/list', async (req, res) => {
  try {
    const products = await Product.find({}, 'name slug _id mainImage inStock')
      .sort({ createdAt: -1 });

    res.json({
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET product by slug (query parameter version - for Vercel compatibility)
router.get('/by-slug', async (req, res) => {
  try {
    const { slug } = req.query;

    if (!slug) {
      return res.status(400).json({ message: 'Slug parameter is required' });
    }

    // Try to find by slug first
    let product = await Product.findOne({ slug });

    // If not found by slug, try by name (case-insensitive)
    if (!product) {
      const decodedSlug = decodeURIComponent(slug).replace(/-/g, ' ');
      product = await Product.findOne({
        name: new RegExp(`^${decodedSlug}$`, 'i')
      });
    }

    // If still not found, try by _id in case slug is actually an ID
    if (!product && slug.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(slug);
    }

    if (!product) {
      return res.status(404).json({ message: 'Product not found', slug });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET product by slug (legacy path parameter version)
router.get('/slug/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
