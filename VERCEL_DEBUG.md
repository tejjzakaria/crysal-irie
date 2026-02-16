# 🔍 Vercel Production Debugging Guide

## Quick Diagnostics

### Step 1: Check Browser Console
1. Open your Vercel site
2. Press `F12` (or `Cmd+Option+I` on Mac)
3. Go to **Console** tab
4. Look for errors (red messages)
5. **Take a screenshot and share it**

### Step 2: Check Network Tab
1. Still in DevTools, go to **Network** tab
2. Refresh the page
3. Look for failed requests (red status codes like 404, 500)
4. Click on failed requests
5. Check:
   - **Request URL** - Is it calling `/api/products`?
   - **Status Code** - What error code?
   - **Response** - What error message?
6. **Take screenshots of failed requests**

### Step 3: Check Vercel Environment Variables
1. Go to Vercel Dashboard: https://vercel.com
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Verify these are set:

```
✅ MONGODB_URI (should start with mongodb+srv://)
✅ AWS_ACCESS_KEY_ID
✅ AWS_SECRET_ACCESS_KEY
✅ AWS_REGION (us-east-1)
✅ AWS_S3_BUCKET_NAME
✅ NODE_ENV (production)
✅ VITE_API_URL (/api)
✅ VITE_GOOGLE_SHEETS_URL
✅ FRONTEND_URL (your vercel URL)
```

**Missing any?** Add them and redeploy.

### Step 4: Check Vercel Function Logs
1. In Vercel Dashboard → Your Project
2. Go to **Deployments** → Click latest deployment
3. Click **Functions** tab
4. Click on any function (like `api/products/index`)
5. Check **Real-time Logs** for errors

Common errors:
- `MongooseError: MONGODB_URI is not defined` → Missing env variable
- `Connection refused` → MongoDB IP whitelist issue
- `ValidationError` → Bad data structure
- `Timeout` → Function taking too long

### Step 5: Test API Directly
Open these URLs in your browser (replace YOUR-SITE with your Vercel URL):

```
https://YOUR-SITE.vercel.app/api/health
https://YOUR-SITE.vercel.app/api/products
https://YOUR-SITE.vercel.app/api/orders
https://YOUR-SITE.vercel.app/api/hero
```

Expected results:
- `/api/health` → `{"status":"OK","message":"Server is running"}`
- `/api/products` → JSON array of products
- `/api/orders` → JSON array of orders
- `/api/hero` → JSON object with hero data

If you get errors, note the error messages.

---

## Common Issues & Fixes

### Issue 1: "Failed to fetch products"
**Cause:** API calls failing
**Fix:**
1. Check `VITE_API_URL=/api` is set in Vercel (NOT `http://...`)
2. Verify MongoDB connection string is correct
3. Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
4. Check Vercel function logs for MongoDB errors

### Issue 2: "MongooseError: buffering timed out"
**Cause:** MongoDB connection failed
**Fix:**
1. Go to MongoDB Atlas → Network Access
2. Add IP Address: `0.0.0.0/0` (allow all)
3. Click "Confirm"
4. Redeploy on Vercel

### Issue 3: "CORS error"
**Cause:** CORS headers not configured
**Fix:**
- Check `FRONTEND_URL` environment variable matches your Vercel URL exactly
- Redeploy after adding/updating

### Issue 4: "404 Not Found" on API routes
**Cause:** Vercel routing not configured correctly
**Fix:**
- Check `vercel.json` exists in root
- Should have rewrites for `/api/:path*`
- Redeploy

### Issue 5: Empty products/orders
**Cause:** Database is empty
**Fix:**
1. Check MongoDB Compass or Atlas
2. Verify `crystal-oil` database exists
3. Verify `products` and `orders` collections have data
4. If empty, add products via admin panel

---

## Emergency Rollback

If site is completely broken:
1. Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

---

## Get Help

Share these with me:
1. Browser console screenshot
2. Network tab screenshot (failed requests)
3. Vercel function logs
4. API test results (from Step 5)
