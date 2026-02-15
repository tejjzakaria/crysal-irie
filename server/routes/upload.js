import express from 'express';
import multer from 'multer';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, S3_BUCKET_NAME } from '../config/s3.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only images
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'));
    }
  },
});

// Upload single image
router.post('/image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Check if S3 is configured
    if (!S3_BUCKET_NAME) {
      return res.status(500).json({ error: 'S3 bucket not configured' });
    }

    // Generate unique filename
    const fileExtension = path.extname(req.file.originalname);
    const fileName = `products/${uuidv4()}${fileExtension}`;

    // Upload to S3
    const uploadParams = {
      Bucket: S3_BUCKET_NAME,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      // ACL: 'public-read', // Uncomment if you want public read access
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    // Construct the S3 URL
    const s3Url = `https://${S3_BUCKET_NAME}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${fileName}`;

    res.json({
      success: true,
      url: s3Url,
      fileName: fileName,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload image', message: error.message });
  }
});

// Upload multiple images
router.post('/images', upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    // Check if S3 is configured
    if (!S3_BUCKET_NAME) {
      return res.status(500).json({ error: 'S3 bucket not configured' });
    }

    const uploadPromises = req.files.map(async (file) => {
      const fileExtension = path.extname(file.originalname);
      const fileName = `products/${uuidv4()}${fileExtension}`;

      const uploadParams = {
        Bucket: S3_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        // ACL: 'public-read', // Uncomment if you want public read access
      };

      const command = new PutObjectCommand(uploadParams);
      await s3Client.send(command);

      const s3Url = `https://${S3_BUCKET_NAME}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${fileName}`;

      return {
        url: s3Url,
        fileName: fileName,
        originalName: file.originalname,
      };
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    res.json({
      success: true,
      files: uploadedFiles,
    });
  } catch (error) {
    console.error('Error uploading to S3:', error);
    res.status(500).json({ error: 'Failed to upload images', message: error.message });
  }
});

// Delete image from S3
router.delete('/image', async (req, res) => {
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

    const { DeleteObjectCommand } = await import('@aws-sdk/client-s3');
    const command = new DeleteObjectCommand(deleteParams);
    await s3Client.send(command);

    res.json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting from S3:', error);
    res.status(500).json({ error: 'Failed to delete image', message: error.message });
  }
});

export default router;
