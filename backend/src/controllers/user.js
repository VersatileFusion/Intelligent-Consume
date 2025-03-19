const logger = require('../utils/logger');

// Register a new user
const registerUser = (req, res) => {
  console.log('Controller: registerUser called');
  logger.info('Registering new user', { email: req.body.email });
  
  const { name, email, password } = req.body;
  
  // Validate request
  if (!email || !password) {
    console.error('Validation failed - Missing required fields');
    logger.error('User registration failed - Missing required fields');
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  // Mock user creation
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    // In a real implementation, password would be hashed
    location: req.body.location || '',
    houseSize: req.body.houseSize || 0,
    occupants: req.body.occupants || 1
  };
  
  console.log('Created new user:', { ...newUser, password: '[HIDDEN]' });
  logger.info('User registered successfully', { id: newUser.id, email: newUser.email });
  res.status(201).json({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email
  });
};

// User login
const loginUser = (req, res) => {
  console.log('Controller: loginUser called');
  logger.info('User login attempt', { email: req.body.email });
  
  const { email, password } = req.body;
  
  // Validate request
  if (!email || !password) {
    console.error('Validation failed - Missing email or password');
    logger.error('Login failed - Missing email or password');
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  // Mock authentication (in a real app, would check against stored users)
  if (email === 'test@example.com' && password === 'password123') {
    const mockUser = {
      id: '12345',
      name: 'Test User',
      email: 'test@example.com'
    };
    
    // Mock JWT token
    const token = 'mock.jwt.token';
    
    console.log('Login successful for user:', email);
    logger.info('Login successful', { user: email });
    res.json({
      token,
      user: mockUser
    });
  } else {
    console.error('Login failed - Invalid credentials');
    logger.warn('Login failed - Invalid credentials', { email });
    res.status(401).json({ error: 'Invalid email or password' });
  }
};

// Get user profile
const getUserProfile = (req, res) => {
  console.log('Controller: getUserProfile called');
  logger.info('Getting user profile');
  
  // Mock user profile (in a real app, would get from authenticated user in middleware)
  const userProfile = {
    id: '12345',
    name: 'Test User',
    email: 'test@example.com',
    location: 'Tehran',
    houseSize: 120,
    occupants: 3
  };
  
  console.log('Returning profile for user:', userProfile.email);
  logger.info('Retrieved user profile', { user: userProfile.id });
  res.json({ user: userProfile });
};

// Update user profile
const updateUserProfile = (req, res) => {
  console.log('Controller: updateUserProfile called');
  logger.info('Updating user profile', { updates: req.body });
  
  // Mock profile update (in a real app, would update authenticated user)
  const updatedProfile = {
    id: '12345',
    name: req.body.name || 'Test User',
    email: 'test@example.com',
    location: req.body.location || 'Tehran',
    houseSize: req.body.houseSize || 120,
    occupants: req.body.occupants || 3
  };
  
  console.log('Updated profile for user:', updatedProfile.email);
  logger.info('User profile updated successfully', { user: updatedProfile.id });
  res.json({ user: updatedProfile });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
};