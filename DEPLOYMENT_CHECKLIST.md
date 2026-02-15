# 🚀 Quick Deployment Checklist

## Before You Start

- [ ] MongoDB Atlas is set up and accessible
- [ ] AWS S3 bucket is created with proper permissions
- [ ] Google Sheets Apps Script is deployed
- [ ] You have all credentials ready (see below)

---

## Step-by-Step Deployment

### 1️⃣ Push to GitHub (5 minutes)

```bash
cd /Users/z.tejjani/Desktop/crystal-modern-makeover

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Crystal Oil e-commerce"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/crystal-oil-ecommerce.git
git branch -M main
git push -u origin main
```

### 2️⃣ Deploy to Vercel (10 minutes)

1. Go to https://vercel.com and sign in with GitHub
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework:** Vite (auto-detected)
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. **Add Environment Variables:**

```env
MONGODB_URI=your_mongodb_connection_string_here
AWS_ACCESS_KEY_ID=your_aws_access_key_id_here
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key_here
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your_s3_bucket_name_here
NODE_ENV=production
VITE_API_URL=/api
VITE_GOOGLE_SHEETS_URL=your_google_sheets_script_url_here
```

⚠️ **Replace placeholders with your actual credentials from .env file**

⚠️ **Important:** `VITE_API_URL=/api` uses relative path since frontend and backend are on same domain

6. Click "Deploy"
7. Wait 3-5 minutes for build
8. Copy your Vercel URL (e.g., `https://crystal-oil.vercel.app`)

### 3️⃣ Update Frontend URL Environment Variable (2 minutes)

1. In Vercel dashboard → Your Project → Settings → Environment Variables
2. Add one more variable:

```env
FRONTEND_URL=https://crystal-oil.vercel.app
```

Replace with your actual Vercel URL

3. Go to Deployments tab → Click "..." on latest → "Redeploy"

### 4️⃣ Test Your Deployment (10 minutes)

Visit your Vercel URL and test:

- [ ] Homepage loads correctly
- [ ] Product images display (from S3)
- [ ] Products load from MongoDB
- [ ] Click a product → detail page works
- [ ] Product description shows correctly
- [ ] Place a test order
- [ ] Check order appears in MongoDB
- [ ] Check order appears in Google Sheets
- [ ] Go to `/admin/login` → login with passcode `123456`
- [ ] Dashboard shows stats
- [ ] Products admin page loads
- [ ] Orders admin page loads
- [ ] Try uploading a product image in admin

---

## Environment Variables Reference

### All Variables (Set in Vercel):
```env
# Database (get from MongoDB Atlas)
MONGODB_URI=your_mongodb_connection_string_here

# AWS S3 (get from AWS Console)
AWS_ACCESS_KEY_ID=your_aws_access_key_id_here
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key_here
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your_s3_bucket_name_here

# App Configuration
NODE_ENV=production
FRONTEND_URL=https://your-vercel-url.vercel.app

# Frontend API URL (relative path)
VITE_API_URL=/api

# Google Sheets Integration (get from Apps Script)
VITE_GOOGLE_SHEETS_URL=your_google_sheets_script_url_here
```

⚠️ **Use your actual credentials from your .env file**

---

## Troubleshooting

### Images Not Loading
- Check AWS S3 bucket permissions (should allow public read)
- Verify AWS environment variables are correct in Vercel
- Check Vercel function logs for S3 errors

### API Calls Failing
- Check `VITE_API_URL=/api` (relative path, no domain)
- Check Vercel function logs for errors
- Verify MongoDB connection string is correct

### Orders Not Saving
- Check MongoDB Atlas allows connections from `0.0.0.0/0` (allow all IPs)
- Check Vercel function logs for database connection errors
- Verify MONGODB_URI environment variable

### Google Sheets Not Working
- Verify `VITE_GOOGLE_SHEETS_URL` is correct
- Check Apps Script is deployed as "web app"
- Check Apps Script permissions allow anonymous access

### File Upload Failing
- Check AWS credentials are correct
- Verify S3 bucket exists and is accessible
- Check Vercel function logs for detailed error messages
- Ensure files are under 10MB

---

## After Deployment

✅ **Change Admin Passcode:**
Update `src/lib/auth.ts` line 2 to a secure 6-digit code, then push to GitHub (auto-deploys).

✅ **Set Up Custom Domain (Optional):**
1. In Vercel: Settings → Domains → Add your domain
2. Update `FRONTEND_URL` environment variable to your custom domain
3. Redeploy

✅ **Monitor Your Site:**
- Vercel Analytics (already enabled)
- Vercel Speed Insights
- Set up UptimeRobot for uptime monitoring

---

## Future Updates

To deploy changes:

```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push

# Vercel will auto-deploy in ~2-3 minutes
```

---

## Architecture

- **Frontend:** Vite + React (Static files served from `/dist`)
- **Backend:** Vercel Serverless Functions (in `/api` directory)
- **Database:** MongoDB Atlas (cloud)
- **File Storage:** AWS S3
- **Order Tracking:** Google Sheets via Apps Script

---

**Total Time: ~25 minutes**
**Cost: FREE (with free tiers of all services)**
- Vercel: Free tier includes serverless functions
- MongoDB Atlas: 512MB free tier
- AWS S3: ~$0.50-2/month for images
- Google Sheets: Free

🎉 **Your site is now live with both frontend and backend on Vercel!**
