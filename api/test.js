import { connectToDatabase } from './_lib/mongodb.js';
import { Product, Order, Hero } from './_lib/models.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const results = {
    timestamp: new Date().toISOString(),
    environment: {},
    mongodb: {},
    aws: {},
    collections: {},
  };

  // Check environment variables
  results.environment = {
    MONGODB_URI: !!process.env.MONGODB_URI,
    AWS_ACCESS_KEY_ID: !!process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: !!process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION || 'not set',
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || 'not set',
    NODE_ENV: process.env.NODE_ENV || 'not set',
    VITE_API_URL: process.env.VITE_API_URL || 'not set',
    FRONTEND_URL: process.env.FRONTEND_URL || 'not set',
  };

  // Test MongoDB connection
  try {
    await connectToDatabase();
    results.mongodb.status = '✅ Connected';
    results.mongodb.connection = 'success';

    // Count documents in each collection
    try {
      const productCount = await Product.countDocuments();
      const orderCount = await Order.countDocuments();
      const heroCount = await Hero.countDocuments();

      results.collections = {
        products: {
          count: productCount,
          status: productCount > 0 ? '✅ Has data' : '⚠️ Empty'
        },
        orders: {
          count: orderCount,
          status: orderCount > 0 ? '✅ Has data' : '⚠️ Empty'
        },
        hero: {
          count: heroCount,
          status: heroCount > 0 ? '✅ Has data' : '⚠️ Empty (will auto-create)'
        }
      };
    } catch (collectionError) {
      results.collections.error = collectionError.message;
      results.collections.status = '❌ Failed to query collections';
    }
  } catch (mongoError) {
    results.mongodb.status = '❌ Connection failed';
    results.mongodb.error = mongoError.message;
    results.mongodb.connection = 'failed';
  }

  // Check AWS configuration
  results.aws = {
    configured: !!(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY),
    region: process.env.AWS_REGION || 'not set',
    bucket: process.env.AWS_S3_BUCKET_NAME || 'not set',
  };

  // Overall status
  results.overall = {
    ready: results.mongodb.connection === 'success' && results.environment.MONGODB_URI,
    issues: []
  };

  if (!results.environment.MONGODB_URI) {
    results.overall.issues.push('❌ MONGODB_URI not set');
  }
  if (results.mongodb.connection !== 'success') {
    results.overall.issues.push('❌ MongoDB connection failed');
  }
  if (!results.aws.configured) {
    results.overall.issues.push('⚠️ AWS S3 not configured (uploads will fail)');
  }
  if (results.collections.products?.count === 0) {
    results.overall.issues.push('⚠️ No products in database');
  }

  if (results.overall.issues.length === 0) {
    results.overall.issues.push('✅ All systems operational');
  }

  return res.status(200).json(results);
}
