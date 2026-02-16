# 🚨 Production Error - Quick Fix Guide

## Issue: "Error loading data" in production

### Step 1: Test Your API (2 minutes)

Open this URL in your browser (replace `YOUR-SITE` with your actual Vercel URL):

```
https://YOUR-SITE.vercel.app/api/test
```

This will show you a diagnostic report. **Copy the entire JSON response and share it with me.**

Expected output:
```json
{
  "overall": {
    "ready": true,
    "issues": ["✅ All systems operational"]
  },
  "mongodb": {
    "status": "✅ Connected"
  }
}
```

### Step 2: Check Environment Variables

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

**Make sure ALL of these are set:**

| Variable | Value | Status |
|----------|-------|--------|
| `MONGODB_URI` | `mongodb+srv://...` | Check from CREDENTIALS.md |
| `AWS_ACCESS_KEY_ID` | Your AWS key | Check from CREDENTIALS.md |
| `AWS_SECRET_ACCESS_KEY` | Your AWS secret | Check from CREDENTIALS.md |
| `AWS_REGION` | `us-east-1` | ✅ |
| `AWS_S3_BUCKET_NAME` | `crystaloil` | ✅ |
| `NODE_ENV` | `production` | ✅ |
| `VITE_API_URL` | `/api` | ⚠️ MUST be `/api` not a full URL |
| `VITE_GOOGLE_SHEETS_URL` | `https://script.google.com/...` | Check from CREDENTIALS.md |
| `FRONTEND_URL` | Your Vercel URL | Add this! |

**If ANY are missing:**
1. Click "Add New"
2. Enter the variable name and value
3. Click "Save"
4. Go to Deployments → Click "..." on latest → "Redeploy"

### Step 3: Check MongoDB Atlas IP Whitelist

1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Select your cluster → Network Access (left sidebar)
3. Check if you have IP: `0.0.0.0/0` (allow all)

**If NOT:**
1. Click "Add IP Address"
2. Click "Allow Access from Anywhere"
3. Enter: `0.0.0.0/0`
4. Click "Confirm"
5. Wait 2 minutes
6. Redeploy on Vercel

### Step 4: Check Browser Console

1. Open your Vercel site
2. Press F12 (or Cmd+Option+I)
3. Go to Console tab
4. **Screenshot any red errors and share them**

### Step 5: Check Vercel Function Logs

1. Vercel Dashboard → Your Project → Deployments
2. Click latest deployment
3. Click "Functions" tab
4. Click `api/products/index`
5. Look at "Real-time Logs"

**Common errors:**
- `MONGODB_URI is not defined` → Add env variable
- `IP not whitelisted` → Add 0.0.0.0/0 to MongoDB Atlas
- `Connection timeout` → MongoDB cluster paused or wrong URI

---

## Quick Fixes

### Fix 1: MongoDB Connection Failed
```bash
# In MongoDB Atlas:
# 1. Network Access → Add IP: 0.0.0.0/0
# 2. Database Access → Check user password is correct
# 3. Copy connection string exactly (no spaces)
```

### Fix 2: VITE_API_URL Wrong
```bash
# In Vercel env variables:
# MUST be: /api
# NOT: http://localhost:5001/api
# NOT: https://your-site.vercel.app/api
```

### Fix 3: Missing FRONTEND_URL
```bash
# In Vercel env variables, add:
# FRONTEND_URL=https://your-actual-vercel-url.vercel.app
# Then redeploy
```

---

## After Making Changes

1. Vercel Dashboard → Deployments
2. Click "..." on latest deployment
3. Click "Redeploy"
4. Wait 2-3 minutes
5. Test again

---

## Share With Me

1. Screenshot of `/api/test` response
2. Screenshot of browser console errors
3. Screenshot of Vercel function logs
4. List of environment variables you have set (just names, not values)

I'll help you fix it immediately!
