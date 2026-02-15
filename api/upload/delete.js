import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, S3_BUCKET_NAME } from '../_lib/s3.js';

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
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileName } = req.body;

    if (!fileName) {
      return res.status(400).json({ error: 'File name is required' });
    }

    if (!S3_BUCKET_NAME) {
      return res.status(500).json({ error: 'S3 bucket not configured' });
    }

    const deleteParams = {
      Bucket: S3_BUCKET_NAME,
      Key: fileName,
    };

    const command = new DeleteObjectCommand(deleteParams);
    await s3Client.send(command);

    return res.status(200).json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete image', message: error.message });
  }
}
