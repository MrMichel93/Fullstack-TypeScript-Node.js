/**
 * Auth System - Server Entry Point
 * 
 * TODO: Students will implement:
 * 1. Express server setup
 * 2. Database connection
 * 3. Routes registration
 * 4. Error handling middleware
 * 5. Server startup
 */

import express, { Application } from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Add routes here
// app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Auth API is running' });
});

// TODO: Add error handling middleware

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Ready for development!`);
});

export { app };
