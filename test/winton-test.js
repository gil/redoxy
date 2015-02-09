var logger = require('winston');

logger.exitOnError = false;
//logger.add(logger.transports.File, { filename: 'redoxy.log' });
logger.add(logger.transports.DailyRotateFile, { filename: 'redoxy.log', json: false, label: 'Redoxy', maxFiles: 31, timestamp: 'yyyy-MM-dd HH:mm:ss' });
logger.remove(logger.transports.Console);

logger.info('AAAAAAAAAAAAAAAAAAAAAA', { anything: 'This is metadata' });
