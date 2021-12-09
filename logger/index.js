require('dotenv').config();
const { createLogger, transports, format } = require('winston');
const { combine, timestamp, simple, json } = format;

const logger = createLogger({
  format: combine(timestamp(), json()),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(timestamp(), simple()),
    })
  );
}

module.exports = logger;
