var redis = require('redis');
var zlib = require('zlib');
var cfg = require('../config.json');

var redisClient = redis.createClient(cfg.redis.port, cfg.redis.host, {});

redisClient.keys('*', function(err, keys) {

	if (keys) {
		console.log('Ok, now I have all keys! :P ' + keys.length);
		
		var current = 0;
		
		var processNext = function() {
			if( current < keys.length ) {
				elements( keys[current], current, processNext );
				current++;
			}
		}
	
		processNext();
	}
});

function elements(key, i, callback) {
	redisClient.get(key, function(err, data) {
		redisClient.ttl(key, function (err, time) {
			zlib.gzip(data, function(err, gzipData) {
				redisClient.setex(key, time, gzipData);
				console.log('key:' + key, i );
				callback();
			});
		});
	});
}

