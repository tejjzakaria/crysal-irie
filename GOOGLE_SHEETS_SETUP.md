# Google Sheets Integration Setup

This guide explains how to set up Google Sheets to receive orders from your Crystal Oil website.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Crystal Oil Orders" (or any name you prefer)
4. In the first row, add the following column headers **exactly as shown**:
   - `Order ID`
   - `Order date`
   - `First name`
   - `Phone`
   - `City`
   - `Variant price`
   - `Product variant`
   - `Product name`
   - `Product URL`

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Paste the following code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);

    // Format the date to a readable format
    const orderDate = new Date(data.orderDate);
    const formattedDate = Utilities.formatDate(orderDate, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');

    // Add new row with order data
    sheet.appendRow([
      data.orderId || '',
      formattedDate || '',
      data.firstName || '',
      data.phone || '',
      data.city || '',
      data.variantPrice || '',
      data.productVariant || '',
      data.productName || '',
      data.productUrl || ''
    ]);

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Order added successfully',
      rowNumber: sheet.getLastRow()
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log error for debugging
    Logger.log('Error: ' + error.toString());

    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function - you can run this to test manually
function testDoPost() {
  const testData = {
    orderId: 'TEST123',
    orderDate: new Date().toISOString(),
    firstName: 'Test Customer',
    phone: '0612345678',
    city: 'Casablanca',
    variantPrice: '299 MAD',
    productVariant: 'عبوة واحدة',
    productName: 'Test Product',
    productUrl: 'https://example.com/product/test'
  };

  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(e);
  Logger.log(result.getContent());
}
```

4. Click **Save** (disk icon)
5. Name your project "Crystal Oil Orders Handler"

## Step 3: Deploy the Script

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure:
   - **Description**: "Orders webhook"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. **Authorize** the script:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to [project name] (unsafe)"
   - Click "Allow"
7. **Copy the Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/XXXXX.../exec
   ```

## Step 4: Add URL to Your Website

1. Open your `.env` file in the project root
2. Add or update this line:
   ```
   VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/XXXXX.../exec
   ```
   (Replace with your actual URL from Step 3)
3. Save the file
4. Restart your development server:
   ```bash
   npm run dev
   ```

## Step 5: Test the Integration

1. Go to your website
2. Navigate to a product page
3. Fill out the order form
4. Submit an order
5. Check your Google Sheet - you should see a new row with the order data!

## Data Structure

Each order will be saved with these columns:

| Column | Description | Example |
|--------|-------------|---------|
| Order ID | MongoDB order ID | 507f1f77bcf86cd799439011 |
| Order date | ISO timestamp | 2024-01-15T14:30:00.000Z |
| First name | Customer name | أحمد محمد |
| Phone | Customer phone | 0612345678 |
| City | Extracted from address | الدار البيضاء |
| Variant price | Selected offer price | 299 MAD |
| Product variant | Selected offer name | عبوة واحدة |
| Product name | Product name | زيت الفيرمون الفاخر |
| Product URL | Full product URL | https://yoursite.com/product/pheromone-oil |

## Step 6: Test the Apps Script

Before testing from your website, test the script directly:

1. In the Apps Script editor, select the `testDoPost` function from the dropdown
2. Click **Run** (▶️ button)
3. Check your Google Sheet - you should see a test row added
4. If it works, the script is set up correctly!

## Troubleshooting

### Orders not appearing in Google Sheets

1. **Check browser console** for errors (F12)
2. **Verify the Google Sheets URL** is correct in `.env`
3. **Make sure the Apps Script is deployed** with "Anyone" access
4. **Check column headers** match exactly (Order ID, Order date, etc.)
5. **Run the test function** (`testDoPost`) in Apps Script to verify it works
6. **Check Apps Script logs**: In the script editor, go to **View** → **Logs** after an order is placed

### "Authorization required" errors

1. Redeploy the script with proper authorization
2. Make sure you clicked "Allow" during authorization
3. Try incognito mode if authorization keeps failing

### Data in wrong columns

1. Make sure the column headers are in the exact order shown in Step 1
2. Check that there are no extra spaces in the headers
3. Make sure the first row has the headers and data starts from row 2

### Orders appear in admin but not Google Sheets

1. The website first saves to MongoDB (admin panel), then sends to Google Sheets
2. Check browser console for Google Sheets errors
3. Verify the `VITE_GOOGLE_SHEETS_URL` is set correctly
4. The Google Sheets request uses `mode: 'no-cors'` so we can't see errors - check Apps Script logs

## Need Help?

If you encounter issues, check:
1. Browser console (F12) for JavaScript errors
2. Google Apps Script logs (View → Logs in the script editor)
3. MongoDB database to verify orders are being saved there

Both MongoDB and Google Sheets should receive the order data simultaneously.
