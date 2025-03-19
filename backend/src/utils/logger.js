const winston = require('winston');
const config = require('../config');

// Define the logger configuration
const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'intelligent-consume-api' },
  transports: [
    // Write to all logs with level `info` and below to the console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp, ...metadata }) => {
          let msg = `${timestamp} [${level}]: ${message}`;
          
          // Add metadata if present
          if (Object.keys(metadata).length > 0 && metadata.service) {
            msg += JSON.stringify(metadata);
          }
          
          return msg;
        })
      )
    }),
    // Additional transports could be added here (file, database, etc.)
  ]
});

console.log('Logger initialized with level:', config.logLevel);

module.exports = logger; 