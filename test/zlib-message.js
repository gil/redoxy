var fs = require('fs');
var zlib = require('zlib');
var redis = require('redis');
var cfg = require('../config.json');


var redisClient = redis.createClient(cfg.redis.port, cfg.redis.host, {});

zlib.gzip('macacos me mordam!', function(err, gziped) {
	console.log('gziped', gziped.toString('utf8'));
	
	
	
	zlib.gunzip(new Buffer(gziped.toString('binary'), 'binary'), function(err, gunziped) {
		console.log('gunziped', gunziped.toString());
	});
	
	
});


