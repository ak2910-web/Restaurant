import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

// Import routes
import reservationRoutes from './routes/reservations.js';
import menuRoutes from './routes/menu.js';
import testimonialRoutes from './routes/testimonials.js';
import contactRoutes from './routes/contact.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    process.env.PRODUCTION_FRONTEND_URL || 'https://yourdomain.com',
  ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'La Bella Cucina API is running',
    timestamp: new Date(),
  });
});

// API Routes
app.use('/api/reservations', reservationRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);

// Root endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'La Bella Cucina API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      reservations: '/api/reservations',
      menu: '/api/menu',
      testimonials: '/api/testimonials',
      contact: '/api/contact',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n✅ La Bella Cucina API Server running on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`🌍 Frontend: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`\n📚 API Documentation:`);
  console.log(`   GET  /api/health - Health check`);
  console.log(`   GET  /api - API info`);
  console.log(`   GET  /api/reservations - Get all reservations (admin)`);
  console.log(`   POST /api/reservations - Create new reservation`);
  console.log(`   GET  /api/menu - Get all menu items`);
  console.log(`   GET  /api/testimonials - Get approved testimonials`);
  console.log(`   POST /api/contact - Send contact message\n`);
});

export default app;
