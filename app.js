// src/app.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const cryptoRoutes = require('./routes/crypto.routes');
const errorMiddleware = require('./middleware/error.middleware');
const { startCronJob } = require('./jobs/fetch-crypto.job');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', cryptoRoutes);

// Error handling
app.use(errorMiddleware);

// Start server function
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();
    
    // Start background job to fetch initial data
    await startCronJob();
    
    // Start server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();