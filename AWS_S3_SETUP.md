# AWS S3 Setup Guide for Image Uploads

## Overview
This guide will help you set up Amazon S3 (Simple Storage Service) for storing product images in your Crystal Oil e-commerce application.

## Prerequisites
- AWS Account (create one at https://aws.amazon.com if you don't have one)
- Credit card for AWS account verification (AWS has a free tier)

## Step 1: Create an AWS Account
1. Go to https://aws.amazon.com
2. Click "Create an AWS Account"
3. Follow the signup process
4. Verify your email and phone number
5. Add payment information (you'll use the free tier for testing)

## Step 2: Create an S3 Bucket

1. **Log in to AWS Console**: https://console.aws.amazon.com
2. **Search for S3** in the search bar at the top
3. **Click "Create bucket"**
4. **Bucket settings:**
   - **Bucket name**: Choose a unique name (e.g., `crystal-oil-products-images`)
   - **AWS Region**: Choose a region close to you (e.g., `us-east-1` for US East)
   - **Object Ownership**: Keep "ACLs disabled (recommended)"
   - **Block Public Access**: UNCHECK "Block all public access" (we need images to be publicly accessible)
     - ⚠️ Check the acknowledgment box that appears
   - **Bucket Versioning**: Disabled (or enable if you want version history)
   - **Default encryption**: Enable (Server-side encryption with Amazon S3 managed keys)
5. **Click "Create bucket"**

## Step 3: Configure Bucket Policy for Public Read Access

1. **Go to your bucket** → Click on the bucket name
2. **Go to the "Permissions" tab**
3. **Scroll down to "Bucket policy"** → Click "Edit"
4. **Paste this policy** (replace `YOUR-BUCKET-NAME` with your actual bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

5. **Click "Save changes"**

## Step 4: Enable CORS (Cross-Origin Resource Sharing)

1. **Still in "Permissions" tab**
2. **Scroll down to "Cross-origin resource sharing (CORS)"** → Click "Edit"
3. **Paste this configuration:**

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

4. **Click "Save changes"**

## Step 5: Create IAM User with S3 Access

1. **Search for "IAM"** in the AWS Console search bar
2. **Click "Users"** in the left sidebar → **"Create user"**
3. **User details:**
   - **User name**: `crystal-oil-app`
   - Click "Next"
4. **Set permissions:**
   - Select "Attach policies directly"
   - Search for and select: `AmazonS3FullAccess`
   - Click "Next"
5. **Click "Create user"**

## Step 6: Create Access Keys

1. **Click on the user you just created** (`crystal-oil-app`)
2. **Go to "Security credentials" tab**
3. **Scroll down to "Access keys"** → Click "Create access key"
4. **Use case:**
   - Select "Application running outside AWS"
   - Check the acknowledgment box
   - Click "Next"
5. **Description tag (optional):** "Crystal Oil App"
6. **Click "Create access key"**
7. **IMPORTANT:** Copy both:
   - **Access key ID**
   - **Secret access key**
   - ⚠️ Save these securely - you won't be able to see the secret key again!

## Step 7: Update Your .env File

Update your `.env` file with the AWS credentials:

```env
# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_access_key_id_from_step_6
AWS_SECRET_ACCESS_KEY=your_secret_access_key_from_step_6
AWS_REGION=us-east-1  # or the region you chose
AWS_S3_BUCKET_NAME=crystal-oil-products-images  # your bucket name
```

## Step 8: Test the Upload

1. **Restart your backend server** (stop and run `npm run server` again)
2. **Go to the dashboard** at http://localhost:8081/dashboard
3. **Navigate to Products** → Click "إضافة منتج"
4. **Try uploading an image** - you should now see a drag-and-drop upload area instead of URL input
5. **Upload a test image** - it should upload to S3 and show the image preview

## Folder Structure in S3

Images will be organized in your bucket as:
```
your-bucket-name/
└── products/
    ├── uuid-1.jpg
    ├── uuid-2.png
    └── uuid-3.webp
```

## Security Best Practices

1. **Never commit .env file to git** - it contains sensitive credentials
2. **Use IAM user with minimum required permissions** (we used FullAccess for simplicity, but you can restrict to specific bucket)
3. **Regularly rotate access keys** (every 90 days recommended)
4. **Enable S3 bucket logging** for audit trail
5. **Set up S3 lifecycle policies** to automatically delete old/unused images

## Cost Estimation

**AWS S3 Free Tier (First 12 months):**
- 5 GB of standard storage
- 20,000 GET requests
- 2,000 PUT requests

**After Free Tier:**
- Storage: ~$0.023 per GB/month
- PUT requests: $0.005 per 1,000 requests
- GET requests: $0.0004 per 1,000 requests

**Example:** 1,000 products with 5 images each (5,000 images @ 500KB average):
- Storage: ~2.5 GB = $0.06/month
- Total cost: < $1/month for typical usage

## Troubleshooting

### Error: "Access Denied"
- Check bucket policy is applied correctly
- Verify IAM user has S3FullAccess policy
- Confirm access keys are correct in .env

### Error: "CORS policy error"
- Verify CORS configuration is saved
- Check allowed origins include your frontend URL

### Images not loading
- Verify bucket is set to public access
- Check bucket policy allows GetObject
- Confirm image URLs are correct format

### Error: "Bucket not configured"
- Make sure AWS_S3_BUCKET_NAME is set in .env
- Restart your backend server after updating .env

## Next Steps

After setup is complete, you can:
1. Use the ImageUpload component in AddProduct and EditProduct forms
2. Upload multiple images for each product
3. Delete images from S3 when products are removed
4. Set up CloudFront CDN for faster image delivery (optional, for production)

## Production Recommendations

For production deployment:
1. **Use CloudFront CDN** in front of S3 for better performance and lower costs
2. **Enable S3 versioning** to prevent accidental deletions
3. **Set up S3 bucket lifecycle rules** to archive or delete old images
4. **Use separate buckets** for development and production
5. **Implement image optimization** (compression, resize) before upload
6. **Add virus scanning** for uploaded files (AWS Lambda + ClamAV)
