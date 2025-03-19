const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

console.log('Loading configuration...');

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  logLevel: process.env.LOG_LEVEL || 'info',
  
  // Add database configuration here when implemented
  // db: {
  //   url: process.env.DATABASE_URL
  // },
  
  // Add JWT secret when implementing authentication
  // jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  // jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d'
};

console.log('Configuration loaded with environment:', config.env);
console.log('Server port set to:', config.port);

module.exports = config; 