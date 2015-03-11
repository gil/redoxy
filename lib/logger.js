var winston = require('winston');
var fs = require('fs');
var cfg = require('../config.json');

if (cfg.logger.dir && !fs.existsSync(cfg.logger.dir)) {
	// Create the directory if it does not exist
	fs.mkdirSync(cfg.logger.dir);
}

var logger = new (winston.Logger)({
	transports : [ new winston.transports.DailyRotateFile({
		filename : cfg.logger.dir + cfg.logger.file,
		json : false,
		label : 'Redoxy',
		maxFiles : cfg.logger.maxfiles,
		timestamp : true,
	}) ],
	exceptionHandlers : [ new winston.transports.File({
		filename : cfg.logger.dir + cfg.logger.errorfile
	}) ]
});

if (process.env.NODE_ENV === 'dev') {
	logger.remove(winston.transports.DailyRotateFile);
	logger.add(winston.transports.Console);
}

logger.exitOnError = false;

module.exports = logger;