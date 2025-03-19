const logger = require('../utils/logger');

/**
 * Authentication middleware to protect routes
 * In a real implementation, this would verify JWT tokens
 */
const auth = (req, res, next) => {
  console.log('Auth middleware called');
  logger.info('Running auth middleware');
  
  const token = req.header('Authorization');
  
  if (!token) {
    console.error('No auth token provided');
    logger.warn('Authentication failed - No token provided');
    return res.status(401).json({ error: 'No authentication token, access denied' });
  }
  
  try {
    // Mock token verification
    // In a real app, this would verify the JWT
    if (token === 'Bearer mock.jwt.token') {
      // Attach user to request object
      req.user = {
        id: '12345',
        email: 'test@example.com'
      };
      
      console.log('User authenticated:', req.user.email);
      logger.info('User authenticated successfully', { user: req.user.email });
      next();
    } else {
      throw new Error('Invalid token');
    }
  } catch (error) {
    console.error('Token verification failed:', error.message);
    logger.error('Authentication failed - Invalid token', { error: error.message });
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = auth; 