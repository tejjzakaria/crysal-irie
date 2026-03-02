import { connectToDatabase } from '../_lib/mongodb.js';
import { Settings } from '../_lib/models.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
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

  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      let settings = await Settings.findOne();
      if (!settings) {
        settings = await Settings.create({});
      }
      return res.status(200).json(settings);
    }

    if (req.method === 'PUT') {
      let settings = await Settings.findOne();
      if (!settings) {
        settings = await Settings.create(req.body);
      } else {
        Object.assign(settings, req.body);
        await settings.save();
      }
      return res.status(200).json(settings);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('API Error [/api/settings]:', error);
    return res.status(500).json({ message: error.message });
  }
}
