var winston = require('winston');



var logger = new (winston.Logger)({
    transports: [
      new winston.transports.DailyRotateFile({ filename: 'redoxy.log', json: false, label: 'Redoxy', maxFiles: 31, timestamp: 'yyyy-MM-dd HH:mm:ss' })
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: 'path/to/exceptions.log' })
    ]
  });

logger.exitOnError = false;


// function l() {


//   logger.exitOnError = false;
//   //logger.add(logger.transports.File, { filename: 'redoxy.log' });
//   logger.add(logger.transports.DailyRotateFile, { filename: 'redoxy.log', json: false, label: 'Redoxy', maxFiles: 31, timestamp: 'yyyy-MM-dd HH:mm:ss' });
//   return logger;
// };


module.exports = logger;