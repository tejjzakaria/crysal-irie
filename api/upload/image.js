import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, S3_BUCKET_NAME } from '../_lib/s3.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import formidable from 'formidable';
import fs from 'fs';

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to parse multipart form data using formidable
async function parseMultipartForm(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }

      const file = files.image;
      if (!file) {
        reject(new Error('No file uploaded'));
        return;
      }

      // Handle both single file and array of files
      const fileData = Array.isArray(file) ? file[0] : file;

      resolve(fileData);
    });
  });
}

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
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the multipart form data
    const file = await parseMultipartForm(req);

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Check if S3 is configured
    if (!S3_BUCKET_NAME) {
      return res.status(500).json({ error: 'S3 bucket not configured' });
    }

    // Validate file type
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedMimes.includes(file.mimetype)) {
      return res.status(400).json({ error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.' });
    }

    // Read file buffer
    const fileBuffer = fs.readFileSync(file.filepath);

    // Generate unique filename
    const fileExtension = path.extname(file.originalFilename || file.newFilename);
    const fileName = `products/${uuidv4()}${fileExtension}`;

    // Upload to S3
    const uploadParams = {
      Bucket: S3_BUCKET_NAME,
      Key: fileName,
      Body: fileBuffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    // Clean up temporary file
    fs.unlinkSync(file.filepath);

    // Construct the S3 URL
    const s3Url = `https://${S3_BUCKET_NAME}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${fileName}`;

    return res.status(200).json({
      success: true,
      url: s3Url,
      fileName: fileName,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to upload image', message: error.message });
  }
}
