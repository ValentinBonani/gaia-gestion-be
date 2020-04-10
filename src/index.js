/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', 'localhost' , port)
  );
  
  // logger.info('Feathers application started on http://%s:%d', '192.168.1.10' , port)
// "mongodb": "mongodb://localhost:27017/time_tracker_be",
  // "mongodb": "//gaia:Gaiac00p@ds125684.mlab.com:25684/heroku_nblpjf2w",
