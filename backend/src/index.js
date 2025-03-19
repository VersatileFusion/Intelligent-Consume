const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const winston = require('winston');
const expressWinston = require('express-winston');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Load configuration and utilities
const config = require('./config');
const logger = require('./utils/logger');
const { errorHandler, notFound } = require('./middleware/error');

// Import routes
const energyRoutes = require('./routes/energy');
const userRoutes = require('./routes/user');

// Create Express app
const app = express();
const PORT = config.port;

console.log('Initializing server...');
logger.info('Initializing server...');

// Configure Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Intelligent Consume API',
      version: '1.0.0',
      description: 'API for analyzing and optimizing home energy consumption',
      contact: {
        name: 'Erfan Ahmadvand',
        phone: '+989109924707',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
console.log('Swagger documentation initialized');
logger.info('Swagger documentation initialized');

// Middleware
app.use(cors());
console.log('CORS middleware enabled');
logger.info('CORS middleware enabled');

app.use(express.json());
console.log('JSON parsing middleware enabled');
logger.info('JSON parsing middleware enabled');

app.use(morgan('dev'));
console.log('Morgan logging middleware enabled');
logger.info('Morgan logging middleware enabled');

// Winston logger middleware
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: true,
}));
console.log('Winston logging middleware enabled');
logger.info('Winston logging middleware enabled');

// Swagger docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
console.log('Swagger UI endpoint configured at /api-docs');
logger.info('Swagger UI endpoint configured at /api-docs');

// Routes
app.use('/api/energy', energyRoutes);
console.log('Energy routes initialized');
logger.info('Energy routes initialized');

app.use('/api/users', userRoutes);
console.log('User routes initialized');
logger.info('User routes initialized');

// Root route
app.get('/', (req, res) => {
  console.log('Root route accessed');
  logger.info('Root route accessed');
  res.json({
    message: 'Welcome to Intelligent Consume API',
    documentation: '/api-docs',
    version: '1.0.0',
    author: 'Erfan Ahmadvand'
  });
});

// 404 middleware
app.use(notFound);
console.log('404 middleware configured');
logger.info('404 middleware configured');

// Error handling middleware
app.use(errorHandler);
console.log('Error handling middleware configured');
logger.info('Error handling middleware configured');

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Documentation available at http://localhost:${PORT}/api-docs`);
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Documentation available at http://localhost:${PORT}/api-docs`);
});

// Handle unexpected errors
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  logger.error('Unhandled Promise Rejection:', { error: err.message, stack: err.stack });
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  logger.error('Uncaught Exception:', { error: err.message, stack: err.stack });
  process.exit(1);
});

console.log('Error handlers for process exceptions configured');
logger.info('Error handlers for process exceptions configured'); 