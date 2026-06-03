# 🚀 Backend & Database Setup - La Bella Cucina

## Overview

This backend provides a complete RESTful API for the La Bella Cucina restaurant website with MongoDB database integration.

### Stack
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Validation**: express-validator
- **CORS**: Enabled for frontend integration

---

## 📋 Backend Structure

```
backend/
├── config/
│   └── database.js              # MongoDB connection
├── models/
│   ├── Reservation.js           # Reservation schema
│   ├── MenuItem.js              # Menu items schema
│   ├── Testimonial.js           # Reviews schema
│   └── Contact.js               # Contact messages schema
├── routes/
│   ├── reservations.js          # Reservation API
│   ├── menu.js                  # Menu API
│   ├── testimonials.js          # Testimonials API
│   └── contact.js               # Contact API
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── Dockerfile                   # Docker configuration
├── package.json                 # Dependencies
└── server.js                    # Main server file
```

---

## 🔧 Installation

### Option 1: Local Setup (Development)

#### Step 1: Install MongoDB Locally

**Windows:**
```bash
# Download and install from https://www.mongodb.com/try/download/community
# Or use Chocolatey:
choco install mongodb-community
```

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install -y mongodb
```

#### Step 2: Setup Backend

```bash
# Navigate to backend
cd c:\Users\Amit2\Desktop\flavours\Restaurant\backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with your settings
# MONGODB_URI=mongodb://localhost:27017/la-bella-cucina
```

#### Step 3: Start MongoDB

```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

#### Step 4: Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server runs at: `http://localhost:5000`

---

### Option 2: Docker Setup (Recommended)

#### Prerequisites
- Docker installed ([download](https://www.docker.com/products/docker-desktop))
- Docker Desktop running

#### Step 1: Navigate to Project Root

```bash
cd c:\Users\Amit2\Desktop\flavours\Restaurant
```

#### Step 2: Start All Services

```bash
# Build and start all containers
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

#### Step 3: Verify Services

```bash
# Check running containers
docker-compose ps

# View backend logs
docker-compose logs backend

# View database logs
docker-compose logs mongodb
```

**Services Running:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017

#### Step 4: Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (reset data)
docker-compose down -v
```

---

## 📊 Database Setup

### MongoDB Connection

**Local:**
```
mongodb://localhost:27017/la-bella-cucina
```

**With Authentication:**
```
mongodb://admin:password123@localhost:27017/la-bella-cucina?authSource=admin
```

**Cloud (MongoDB Atlas):**
```
mongodb+srv://username:password@cluster.mongodb.net/la-bella-cucina
```

### Collections Created

1. **reservations** - Table reservations
2. **menuitems** - Menu dishes
3. **testimonials** - Customer reviews
4. **contacts** - Contact messages

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Health Check
```
GET /health
```
Response:
```json
{
  "success": true,
  "message": "La Bella Cucina API is running",
  "timestamp": "2024-06-03T10:30:00Z"
}
```

---

## 📅 Reservations API

### Get All Reservations (Admin)
```
GET /api/reservations
```

### Get Reservation by ID
```
GET /api/reservations/:id
```

### Create New Reservation
```
POST /api/reservations
Content-Type: application/json

{
  "name": "Raj Patel",
  "email": "raj@example.com",
  "phone": "+91 98765 43210",
  "date": "2024-06-15",
  "time": "19:00",
  "guests": 4,
  "requests": "Window seat please"
}
```

Response:
```json
{
  "success": true,
  "message": "Reservation confirmed! We will see you soon.",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Raj Patel",
    "email": "raj@example.com",
    "status": "pending",
    "createdAt": "2024-06-03T10:30:00Z"
  }
}
```

### Update Reservation
```
PUT /api/reservations/:id
Content-Type: application/json

{
  "status": "confirmed",
  "guests": 5
}
```

### Cancel Reservation
```
DELETE /api/reservations/:id
```

### Get Available Time Slots
```
GET /api/reservations/available-slots/2024-06-15
```

Response:
```json
{
  "success": true,
  "availableSlots": ["12:00", "12:30", "13:00", "13:30", ...],
  "bookedSlots": ["19:00", "19:30", "20:00"]
}
```

---

## 🍝 Menu API

### Get All Menu Items
```
GET /api/menu
```

### Get Menu by Category
```
GET /api/menu?category=Pasta
# or
GET /api/menu/category/Pasta
```

Query Parameters:
- `category`: Antipasti | Pasta | Mains | Desserts | Drinks

### Get Popular Items
```
GET /api/menu/popular/true
```

### Get Single Item
```
GET /api/menu/:id
```

### Create Menu Item (Admin)
```
POST /api/menu
Content-Type: application/json

{
  "name": "Spaghetti Carbonara",
  "category": "Pasta",
  "description": "Creamy Roman pasta with pancetta and egg",
  "price": 890,
  "emoji": "🍝",
  "popular": true,
  "availability": true,
  "ingredients": ["spaghetti", "egg", "pancetta", "parmesan"],
  "allergens": ["egg", "dairy"],
  "calories": 520
}
```

### Update Menu Item (Admin)
```
PUT /api/menu/:id
```

### Delete Menu Item (Admin)
```
DELETE /api/menu/:id
```

---

## ⭐ Testimonials API

### Get Approved Testimonials
```
GET /api/testimonials
```

### Get All Testimonials (Admin)
```
GET /api/testimonials/admin/all
```

### Submit New Testimonial
```
POST /api/testimonials
Content-Type: application/json

{
  "text": "Best Italian food in Mumbai!",
  "author": "Priya Sharma",
  "location": "Mumbai",
  "rating": 5,
  "email": "priya@example.com"
}
```

### Approve/Feature Testimonial (Admin)
```
PUT /api/testimonials/:id

{
  "approved": true,
  "featured": true
}
```

### Delete Testimonial (Admin)
```
DELETE /api/testimonials/:id
```

---

## 💬 Contact API

### Get All Contact Messages (Admin)
```
GET /api/contact
```

### Submit Contact Message
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "subject": "Event Inquiry",
  "message": "I'd like to book the restaurant for a private event."
}
```

### Mark as Responded (Admin)
```
PUT /api/contact/:id

{
  "responded": true,
  "response": "We'll contact you soon with details.",
  "respondedAt": "2024-06-03T10:30:00Z"
}
```

### Delete Contact Message (Admin)
```
DELETE /api/contact/:id
```

---

## 🔐 Environment Variables

Create `.env` file in `backend/` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/la-bella-cucina
MONGODB_USER=admin
MONGODB_PASSWORD=password123

# JWT (for future authentication)
JWT_SECRET=your_super_secret_key_change_in_production

# CORS
FRONTEND_URL=http://localhost:3000
PRODUCTION_FRONTEND_URL=https://yourdomain.com

# Email (optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_SERVICE=gmail

# Admin
ADMIN_EMAIL=admin@labellacucina.in
ADMIN_PASSWORD=admin123
```

---

## 🧪 Testing API Endpoints

### Using cURL

```bash
# Get all menu items
curl http://localhost:5000/api/menu

# Create reservation
curl -X POST http://localhost:5000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Raj Patel",
    "email": "raj@example.com",
    "phone": "+91 98765 43210",
    "date": "2024-06-15",
    "time": "19:00",
    "guests": 4
  }'

# Get available slots
curl http://localhost:5000/api/reservations/available-slots/2024-06-15
```

### Using Postman

1. Import collection or create manually
2. Set Base URL: `http://localhost:5000/api`
3. Test each endpoint with provided examples

### Using Thunder Client (VS Code)

1. Install Thunder Client extension
2. Create new request
3. Enter endpoint URLs and test

---

## 📡 Connecting Frontend to Backend

### Update Frontend Environment

Create `.env` file in project root:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Frontend Usage Example

```javascript
// Fetch reservations
const makeReservation = async (formData) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/reservations`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }
  );
  return response.json();
};

// Get menu items
const getMenu = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/menu`
  );
  return response.json();
};
```

---

## 🐳 Docker Commands

```bash
# Build images
docker-compose build

# Start services
docker-compose up
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs
docker-compose logs backend
docker-compose logs mongodb

# Execute command in container
docker-compose exec backend npm run dev
docker-compose exec mongodb mongosh

# Remove everything
docker-compose down -v
```

---

## 🚀 Production Deployment

### Vercel (Frontend)
- Follow [VERCEL_DEPLOYMENT.md](../VERCEL_DEPLOYMENT.md)

### Heroku (Backend)

```bash
# Create Heroku app
heroku create la-bella-cucina-api

# Add MongoDB Atlas
heroku addons:create mongolab

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### MongoDB Atlas (Cloud Database)

1. Go to [atlas.mongodb.com](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster
4. Get connection string
5. Add to `MONGODB_URI` in Heroku config

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running locally or configure MONGODB_URI

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change PORT in .env or kill process using port

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: Check FRONTEND_URL in .env matches your frontend

### Docker Build Fails
```
Solution: Delete .env file from backend folder
docker-compose build --no-cache
```

---

## 📚 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message description"
}
```

### Validation Error Response
```json
{
  "success": false,
  "errors": [
    {
      "msg": "Name is required",
      "param": "name"
    }
  ]
}
```

---

## 🎯 Next Steps

1. **Setup Database**: Follow Option 1 or 2 above
2. **Configure Environment**: Update .env with your settings
3. **Start Server**: `npm run dev` or `docker-compose up`
4. **Test Endpoints**: Use curl, Postman, or Thunder Client
5. **Connect Frontend**: Update React .env with API URL
6. **Deploy**: Follow production deployment guides

---

## 📖 Additional Resources

- [Express.js Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Mongoose Docs](https://mongoosejs.com)
- [Docker Docs](https://docs.docker.com)

---

## 🎉 Backend is Ready!

Your restaurant backend is now production-ready with:
- ✅ Complete API endpoints
- ✅ MongoDB integration
- ✅ Data validation
- ✅ Error handling
- ✅ Docker containerization
- ✅ Environment configuration

**Happy coding! 🚀**
