var redis = require('redis');
var zlib = require('zlib');
var cfg = require('../config.json');

var redisClient = redis.createClient(cfg.redis.port, cfg.redis.host, {});

redisClient.keys('*', function(err, keys) {

	if (keys) {
		console.log('Ok, now I have all keys! :P ' + keys.length);
		for(var i = 0; i < keys.length; i++) {
			elements(keys[i], i);
		}
	}
});

function elements(key, i) {
	redisClient.get(key, function(err, data) {
		redisClient.ttl(key, function (err, time) {
			zlib.gzip(data, function(err, gzipData) {
				console.log('ttl= '+time);
				
				redisClient.setex(key, time, gzipData);
				
				console.log('key:' + key);
			});
		});
	});
}

//redisClient.on('error', function(e) {
//	console.log('erro: ' + e);
//});
//
//zlib.gzip("macacos me mordam", function(err, result) {
//
//});
