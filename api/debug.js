export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Return debug information
  return res.status(200).json({
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    query: req.query,
    headers: {
      origin: req.headers.origin,
      host: req.headers.host,
      'user-agent': req.headers['user-agent'],
    },
    env: {
      VITE_API_URL: process.env.VITE_API_URL || 'not set',
      NODE_ENV: process.env.NODE_ENV || 'not set',
      FRONTEND_URL: process.env.FRONTEND_URL || 'not set',
      MONGODB_URI_SET: !!process.env.MONGODB_URI,
    },
    message: 'Debug endpoint is working. Use /api/test for full diagnostics.'
  });
}
