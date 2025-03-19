const logger = require('../utils/logger');

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(`Error occurred: ${err.message}`);
  logger.error(`Error occurred: ${err.message}`, { stack: err.stack, url: req.originalUrl });
  
  // Define the status code based on the error type
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  
  // Send the error response
  res.status(statusCode).json({
    status: 'error',
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
};

// 404 Not Found middleware
const notFound = (req, res, next) => {
  console.error(`Route not found: ${req.originalUrl}`);
  logger.warn(`Route not found: ${req.originalUrl}`);
  
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = {
  errorHandler,
  notFound
}; 