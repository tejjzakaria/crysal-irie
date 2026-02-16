# 🔧 Fix: "Product Not Found" in Production

## What Changed

I've created a better routing system for product detail pages that works reliably in Vercel:

### New Endpoint
- **Old**: `/api/products/slug/[slug]` (nested dynamic route - problematic in Vercel)
- **New**: `/api/products/by-slug?slug=product-name` (query parameter - reliable)

### Added Debug Tools
- `/api/products/list` - Lists all products with their slugs
- `/api/products/by-slug` - Enhanced with fallback search by name and ID
- Better error logging

---

## Step-by-Step Fix

### Step 1: Push Updated Code

```bash
git add -A
git commit -m "Fix product detail page routing for Vercel"
git push
```

Wait 2-3 minutes for Vercel to redeploy.

### Step 2: Test Available Products

Open this URL in your browser (replace YOUR-SITE with your Vercel URL):

```
https://YOUR-SITE.vercel.app/api/products/list
```

**Expected Result:**
```json
{
  "count": 4,
  "products": [
    {
      "_id": "abc123",
      "name": "زيت الفيرمونات",
      "slug": "pheromone-oil",
      "url": "/product/pheromone-oil"
    },
    ...
  ]
}
```

**Look for:**
- ✅ `slug` field exists and has a value
- ❌ `slug: "NO_SLUG"` means products don't have slugs

### Step 3: If Products Don't Have Slugs

If you see `"slug": "NO_SLUG"` in the response, you need to add slugs to your products:

**Option A: Via Admin Panel (Recommended)**
1. Go to your site `/admin/login`
2. Login with passcode `123456`
3. Go to Products admin page
4. Edit each product
5. Add a slug (e.g., "pheromone-oil", "goddess-rose-oil")
6. Save

**Option B: Direct in MongoDB**
1. Go to MongoDB Atlas → Browse Collections
2. Select `crystal-oil` database → `products` collection
3. Edit each product document
4. Add field: `slug: "product-name-in-english"`
   - Use lowercase
   - Replace spaces with hyphens
   - Example: "Pheromone Oil" → `slug: "pheromone-oil"`

### Step 4: Test a Product Detail Page

After fixing slugs, click on a product from your homepage.

**Or test directly:**
```
https://YOUR-SITE.vercel.app/api/products/by-slug?slug=pheromone-oil
```

(Replace `pheromone-oil` with actual slug from Step 2)

**Expected:** Product data returned as JSON

---

## Debug: Still Not Working?

### Check 1: Browser Console
1. Open product page
2. Press F12 → Console tab
3. Look for error: `Failed to fetch product by slug: xxx`
4. Screenshot and share

### Check 2: Network Tab
1. F12 → Network tab
2. Click on the failed request to `by-slug`
3. Check:
   - Request URL
   - Status code
   - Response
4. Screenshot and share

### Check 3: Vercel Function Logs
1. Vercel Dashboard → Deployments → Latest
2. Click "Functions" tab
3. Click `api/products/by-slug`
4. Check logs for errors
5. Look for `[API] Product not found for slug: xxx`

---

## Common Issues

### Issue 1: Products Have No Slugs
**Symptom:** `/api/products/list` shows `"slug": "NO_SLUG"`

**Fix:**
- Add slugs to all products (see Step 3 above)
- Slugs should be URL-friendly (lowercase, hyphens, no spaces)

### Issue 2: Slug Mismatch
**Symptom:** URL says `/product/pheromone-oil` but product slug is different

**Fix:**
- Check actual slug in `/api/products/list`
- Update product slug to match URL
- Or click product from homepage (uses correct slug)

### Issue 3: Products Show on Homepage But Not Detail Page
**Symptom:** Products display correctly on `/` but clicking one gives "not found"

**Fix:**
- Likely slug issue (see Issue 1)
- Check browser console for actual URL being requested
- Verify slug in database matches URL

### Issue 4: Works Locally But Not in Production
**Symptom:** Everything works on localhost:5173 but not on Vercel

**Fix:**
- Check environment variables in Vercel (especially `VITE_API_URL=/api`)
- Verify MongoDB connection (IP whitelist)
- Check Vercel function logs for specific errors

---

## Enhanced Fallback Logic

The new `/api/products/by-slug` endpoint now tries multiple ways to find your product:

1. **By slug** (primary): `slug: "pheromone-oil"`
2. **By name** (fallback): Converts slug to name and searches (case-insensitive)
3. **By ID** (fallback): If slug looks like MongoDB ID, tries that

This means even if your products don't have perfect slugs, it should still work!

---

## Verification Checklist

After pushing changes:

- [ ] Vercel redeployed successfully
- [ ] `/api/products/list` returns products with slugs
- [ ] `/api/products/by-slug?slug=xxx` returns product data
- [ ] Clicking product from homepage opens detail page
- [ ] Product detail page shows correct product info
- [ ] No errors in browser console

---

## Quick Test Commands

Replace `YOUR-SITE` with your Vercel URL:

```bash
# Test products list
curl https://YOUR-SITE.vercel.app/api/products/list

# Test specific product by slug
curl "https://YOUR-SITE.vercel.app/api/products/by-slug?slug=pheromone-oil"

# Test health check
curl https://YOUR-SITE.vercel.app/api/health

# Test system diagnostics
curl https://YOUR-SITE.vercel.app/api/test
```

---

## Need Help?

Share with me:
1. Output from `/api/products/list`
2. The slug you're trying to access
3. Browser console screenshot
4. Vercel function logs screenshot

I'll help you fix it immediately!
