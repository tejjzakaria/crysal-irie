# 🚀 Deployment Guide - Crystal Oil E-commerce (Vercel Full-Stack)

## Overview

This application is deployed entirely on **Vercel**, using:
- **Frontend**: Vite + React (static files from `/dist`)
- **Backend**: Vercel Serverless Functions (from `/api` directory)
- **Database**: MongoDB Atlas (cloud)
- **File Storage**: AWS S3
- **Order Tracking**: Google Sheets via Apps Script

## Prerequisites

Before deploying, ensure you have:
- ✅ GitHub account
- ✅ Vercel account (free tier works perfectly)
- ✅ MongoDB Atlas account with connection string
- ✅ AWS S3 bucket with credentials
- ✅ Google Sheets with Apps Script deployed

---

## Part 1: Prepare Your Services

### 1. MongoDB Atlas (Database)

**You already have this set up**, but ensure:
- Database is accessible from anywhere (IP whitelist: `0.0.0.0/0`)
- You have your connection string ready
- Format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

### 2. AWS S3 (Image Storage)

**You already have this set up**, but verify you have:
- AWS Access Key ID
- AWS Secret Access Key
- S3 Bucket Name
- AWS Region
- Bucket permissions allow public read access for uploaded images

### 3. Google Sheets (Order Tracking)

**You already have this set up**, but ensure:
- Apps Script is deployed as web app
- You have the web app URL
- Format: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`

---

## Part 2: Push Code to GitHub

### Step 1: Initialize Git Repository

```bash
cd /Users/z.tejjani/Desktop/crystal-modern-makeover

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Crystal Oil e-commerce site"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `crystal-oil-ecommerce` (or your preferred name)
3. **Keep it PRIVATE** (to protect credentials in commit history)
4. Don't initialize with README (you already have code)
5. Click "Create repository"

### Step 3: Push to GitHub

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/crystal-oil-ecommerce.git

# Push code
git branch -M main
git push -u origin main
```

---

## Part 3: Deploy to Vercel (Full-Stack)

### Step 1: Go to Vercel

1. Go to https://vercel.com
2. Click "Sign Up" or "Login"
3. Sign in with GitHub

### Step 2: Import Your Project

1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Vercel will auto-detect it's a Vite project

### Step 3: Configure Project

**Framework Preset:** Vite (auto-detected)
**Root Directory:** `./` (leave as is)
**Build Command:** `npm run build`
**Output Directory:** `dist`
**Install Command:** `npm install`

### Step 4: Add Environment Variables

Click "Environment Variables" and add these **one by one**:

#### Database Configuration:
```env
MONGODB_URI=your_mongodb_connection_string_here
```
Get this from MongoDB Atlas → Cluster → Connect → Connect your application

#### AWS S3 Configuration:
```env
AWS_ACCESS_KEY_ID=your_aws_access_key_id_here
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key_here
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your_s3_bucket_name_here
```
Get these from AWS Console → IAM → Users → Security credentials

#### Application Configuration:
```env
NODE_ENV=production
```

#### Frontend API URL (Relative Path):
```env
VITE_API_URL=/api
```
⚠️ **Important:** Use `/api` (relative path) since frontend and backend are on the same domain

#### Google Sheets Integration:
```env
VITE_GOOGLE_SHEETS_URL=your_google_sheets_script_url_here
```
Get this from Google Apps Script → Deploy → Web app URL

⚠️ **Important:** Use your actual credentials from your `.env` file

### Step 5: Deploy

1. Click "Deploy"
2. Wait 3-5 minutes for build to complete
3. You'll get a URL like: `https://crystal-oil-ecommerce.vercel.app`
4. **Copy this URL** - you'll need it for the next step

### Step 6: Add Frontend URL Variable

1. In Vercel dashboard → Your Project → Settings → Environment Variables
2. Add one more variable:

```env
FRONTEND_URL=https://crystal-oil-ecommerce.vercel.app
```

Replace `https://crystal-oil-ecommerce.vercel.app` with your actual Vercel URL from Step 5

3. Go to Deployments tab → Click "..." menu on latest deployment → "Redeploy"
4. Wait 2-3 minutes for redeployment

---

## Part 4: Test Your Deployment

### ✅ Checklist:

Visit your Vercel URL and thoroughly test:

**Frontend Tests:**
- [ ] Homepage loads correctly
- [ ] Hero section displays with proper styling
- [ ] Product images display (from S3)
- [ ] Products load from MongoDB
- [ ] Product cards show correct information
- [ ] Footer displays correctly

**Product Detail Tests:**
- [ ] Click a product → detail page opens
- [ ] Product images display in gallery
- [ ] Product description (rich text HTML) renders correctly
- [ ] Customer review screenshots display
- [ ] Order form appears

**Order Flow Tests:**
- [ ] Fill out order form with test data
- [ ] Submit order (should succeed)
- [ ] Check MongoDB Compass/Atlas → verify order appears in database
- [ ] Check Google Sheet → verify order appears in spreadsheet

**Admin Panel Tests:**
- [ ] Go to `/admin/login`
- [ ] Enter passcode `123456`
- [ ] Should redirect to `/dashboard`
- [ ] Dashboard shows correct stats (total orders, products)
- [ ] Products admin page loads (`/dashboard/products`)
- [ ] Orders admin page loads (`/dashboard/orders`)
- [ ] Click "Add Product" → form loads
- [ ] Try uploading a product image → should upload to S3
- [ ] Try editing a product → rich text editor works
- [ ] Save product → should save to MongoDB

**API Tests:**
- [ ] Open browser DevTools → Network tab
- [ ] Navigate site and verify API calls to `/api/*` succeed
- [ ] Check response times are reasonable (<1s)
- [ ] No CORS errors in console

---

## Part 5: Custom Domain (Optional)

### Add Custom Domain to Vercel:

1. In Vercel dashboard → Settings → Domains
2. Add your domain (e.g., `crystaloil.ma`)
3. Follow DNS configuration instructions:
   - Add A record or CNAME record as instructed
   - Vercel will auto-generate SSL certificate
4. Wait for DNS propagation (5-30 minutes)

### Update Environment Variables:

After adding custom domain:

1. Go to Settings → Environment Variables
2. Update `FRONTEND_URL` to your custom domain:
```env
FRONTEND_URL=https://crystaloil.ma
```
3. Redeploy

---

## Part 6: Monitor and Optimize

### View Logs:

**Function Logs (Backend API):**
1. Vercel Dashboard → Your Project
2. Click "Deployments" → Click latest deployment
3. Click "Functions" tab → View logs for each API function
4. Check for errors, slow queries, or issues

**Build Logs:**
1. Click "Deployments" → Click deployment
2. View "Building" section for build-time errors

### Performance Monitoring:

**Vercel Analytics** (already integrated):
- Dashboard → Analytics
- View page views, unique visitors, top pages

**Vercel Speed Insights:**
- Dashboard → Speed Insights
- View Web Vitals (LCP, FID, CLS)
- Optimize slow pages

### Uptime Monitoring:

Set up **UptimeRobot** (free):
1. Go to https://uptimerobot.com
2. Add new monitor for your Vercel URL
3. Get alerts if site goes down

---

## Part 7: Security Best Practices

### ✅ Recommended Actions:

1. **Change Admin Passcode:**
   - Update `src/lib/auth.ts` line 2
   - Change from `123456` to a secure 6-digit code
   - Push to GitHub (auto-deploys)

2. **Rotate Secrets Regularly:**
   - Change MongoDB password every 3-6 months
   - Rotate AWS access keys periodically
   - Update environment variables in Vercel

3. **Enable 2FA:**
   - Enable two-factor authentication on Vercel account
   - Enable 2FA on GitHub account
   - Enable 2FA on MongoDB Atlas

4. **Review Vercel Logs:**
   - Check function logs weekly for suspicious activity
   - Monitor for failed login attempts in admin

5. **Keep Dependencies Updated:**
   ```bash
   npm audit
   npm audit fix
   ```

---

## Part 8: Ongoing Deployments

### Auto-Deploy on Git Push:

Vercel automatically deploys when you push to GitHub:

```bash
# Make your changes locally
git add .
git commit -m "Your update message"
git push

# Vercel will auto-deploy in ~2-3 minutes
# You'll get email notification when deploy completes
```

### Manual Redeploy:

If you need to redeploy without code changes (e.g., after updating environment variables):

1. Vercel Dashboard → Deployments
2. Click "..." menu on latest deployment
3. Click "Redeploy"

### Preview Deployments:

Vercel creates preview deployments for branches:

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and push
git push origin feature/new-feature

# Vercel creates preview deployment with unique URL
# Test changes before merging to main
```

---

## Architecture Details

### Frontend (Static Files):
- **Location**: `/dist` directory (built from Vite)
- **Files**: HTML, CSS, JS, images, fonts
- **Deployment**: Served from Vercel Edge Network (CDN)
- **Build Time**: ~1-2 minutes

### Backend (Serverless Functions):
- **Location**: `/api` directory
- **Runtime**: Node.js 18
- **Memory**: 1024 MB per function
- **Timeout**: 10 seconds per function
- **Cold Start**: ~500ms first request, then warm
- **Endpoints**:
  - `/api/products` - Product CRUD
  - `/api/orders` - Order CRUD
  - `/api/hero` - Hero section data
  - `/api/upload/*` - Image uploads to S3
  - `/api/health` - Health check

### Database (MongoDB Atlas):
- **Connection**: Cached in serverless functions
- **Pool Size**: 10 connections max
- **Region**: Auto-selected based on MongoDB Atlas cluster

### File Storage (AWS S3):
- **Uploads**: Via serverless functions
- **Access**: Public read for product images
- **CDN**: S3 serves files directly (no CloudFront needed for MVP)

---

## Cost Breakdown

### Free Tier Limits:

- **Vercel**:
  - 100GB bandwidth/month
  - 100GB-hrs serverless function execution
  - Unlimited static hosting
  - **Cost**: FREE

- **MongoDB Atlas**:
  - 512MB storage
  - Shared cluster
  - **Cost**: FREE

- **AWS S3**:
  - 5GB storage
  - 20,000 GET requests
  - 2,000 PUT requests
  - **Cost**: ~$0.50-2/month (minimal image storage)

- **Google Sheets**:
  - **Cost**: FREE

**Total Monthly Cost**: ~$0.50-2/month

### If You Exceed Free Tier:

- **Vercel Pro**: $20/month (100x more bandwidth)
- **MongoDB Atlas**: $9/month (M2 cluster, 2GB storage)
- **AWS S3**: Pay-as-you-go ($0.023/GB storage)

---

## Troubleshooting

### Issue: "Cannot connect to database"
**Solution:**
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify `MONGODB_URI` environment variable in Vercel
- Check MongoDB Atlas cluster is running (not paused)
- View Vercel function logs for detailed error

### Issue: "Images not loading"
**Solution:**
- Check AWS S3 bucket permissions (public read access)
- Verify AWS environment variables in Vercel
- Check image URLs in MongoDB (should be S3 URLs)
- Test S3 URL directly in browser

### Issue: "API calls failing / CORS errors"
**Solution:**
- Verify `VITE_API_URL=/api` (relative path, no domain)
- Check `FRONTEND_URL` environment variable is correct
- View browser console for specific CORS error
- Check Vercel function logs

### Issue: "Orders not saving to Google Sheets"
**Solution:**
- Verify `VITE_GOOGLE_SHEETS_URL` is correct
- Check Apps Script is deployed as "web app"
- Ensure Apps Script allows anonymous access
- Test Google Sheets URL directly (should return JSON)

### Issue: "File upload failing"
**Solution:**
- Check AWS credentials are correct (Access Key ID, Secret Key)
- Verify S3 bucket name and region
- Check file size is under 10MB
- View Vercel function logs for S3 error details

### Issue: "Build failing"
**Solution:**
- Check build logs in Vercel deployments
- Verify `package.json` has correct scripts
- Ensure all dependencies are in `package.json`
- Try building locally: `npm run build`

### Issue: "Serverless function timeout"
**Solution:**
- Check function execution time in logs
- Optimize MongoDB queries (add indexes)
- Reduce image processing if any
- Consider upgrading Vercel plan for longer timeout

---

## Next Steps After Successful Deployment

1. **Test thoroughly** - Go through entire checklist above
2. **Change admin passcode** - Update from default `123456`
3. **Set up monitoring** - UptimeRobot + Vercel Analytics
4. **Add custom domain** - Professional branded URL
5. **Share with stakeholders** - Send Vercel URL for feedback
6. **Plan marketing** - SEO, social media, ads

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **AWS S3 Docs**: https://docs.aws.amazon.com/s3
- **Vite Docs**: https://vitejs.dev

---

🎉 **Congratulations! Your full-stack Crystal Oil e-commerce site is now live on Vercel!**
