# MongoDB Setup Guide

## ✅ Backend Already Created!

I've set up a complete Express + MongoDB backend for your application.

## 📁 What Was Created:

```
server/
├── index.js              # Express server & MongoDB connection
├── models/
│   ├── Hero.js          # Hero section data model
│   ├── Product.js       # Product model
│   └── Order.js         # Order model
└── routes/
    ├── hero.js          # Hero API endpoints
    ├── products.js      # Product CRUD endpoints
    └── orders.js        # Order management endpoints
```

---

## 🚀 Setup Steps:

### 1. Install MongoDB

Choose ONE option:

#### **Option A: MongoDB Atlas (Cloud - Recommended for beginners)**
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
6. Replace `<password>` with your database password
7. Add `/crystal-oil` at the end: `mongodb+srv://username:password@cluster.mongodb.net/crystal-oil`

#### **Option B: Local MongoDB**
1. Download MongoDB: https://www.mongodb.com/try/download/community
2. Install MongoDB on your computer
3. Start MongoDB service:
   - **Mac**: `brew services start mongodb-community`
   - **Windows**: MongoDB runs as a service automatically
   - **Linux**: `sudo systemctl start mongod`
4. Connection string: `mongodb://localhost:27017/crystal-oil`

---

### 2. Update .env File

Open `.env` and update:

```env
# If using MongoDB Atlas (cloud):
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/crystal-oil

# If using Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/crystal-oil
```

---

### 3. Run the Backend Server

Open a **NEW terminal** and run:

```bash
npm run server
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on http://localhost:5000
```

---

### 4. Test the API

Open browser and go to:
- **Health check**: http://localhost:5000/api/health
- **Hero data**: http://localhost:5000/api/hero
- **Products**: http://localhost:5000/api/products
- **Orders**: http://localhost:5000/api/orders

---

## 📡 API Endpoints:

### Hero Section
- `GET /api/hero` - Get hero data
- `PUT /api/hero` - Update hero data

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PATCH /api/orders/:id/status` - Update order status
- `GET /api/orders/stats/summary` - Get order statistics

---

## 🔧 Development Workflow:

You need **2 terminals running**:

**Terminal 1 - Frontend (Vite):**
```bash
npm run dev
```
Runs on: http://localhost:8081/

**Terminal 2 - Backend (Express):**
```bash
npm run server
```
Runs on: http://localhost:5000/

---

## 🎯 Next Steps:

After MongoDB is running, I'll update the frontend to:
1. Fetch hero data from API instead of localStorage
2. Connect dashboard to real database
3. Show real stats (orders, products, sales)

---

## ⚠️ Common Issues:

**"MongoDB connection error"**
- Check if MongoDB is running
- Verify MONGODB_URI in .env is correct
- For Atlas: Check if your IP is whitelisted

**"Port 5000 already in use"**
- Change PORT in .env to 5001 or another port
- Update VITE_API_URL accordingly

**"Cannot find module"**
- Make sure you ran `npm install`
- Restart the server

---

## 💡 Tips:

- Keep both terminals open while developing
- Backend auto-restarts when you save files (you may need nodemon later)
- Check terminal for error messages
- Use Postman or Thunder Client to test API endpoints

Let me know once MongoDB is connected and the server is running! 🚀
