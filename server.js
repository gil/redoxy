var http = require('http');
var redis = require('redis');
var crypto = require('crypto');
var cfg = require('./config.json');
var filters = require('./filters')

function start(cfg) {

	console.log('redoxy.port ' + cfg.port);
	console.log('redis.port ' + cfg.redis.port);
	console.log('redis.host ' + cfg.redis.host);

	var redisClient = redis.createClient(6379, '127.0.0.1', {});

	var server = http.createServer(function(req, res) {

		var host = req.headers.host;

		var url = req.headers.host + req.url;

		var uhash = crypto.createHash('sha1').update(url).digest('hex');

		redisClient.on('error', function(e) {
			console.log('erro: ' + e);
		})

		redisClient.get(uhash, function(err, reply) {

			if (reply) {
				console.log('#cached result url=' + uhash);
				res.end(reply);
			} else {
				doGet(req, res, redisClient, uhash);
			}

		});

	});

	function doGet(req, res, rc, uhash) {
		http.get({
			host : req.headers.host,
			path : req.url
		}, function(response) {
			// Continuously update stream with data
			var body = '';
			response.on('data', function(data) {
				body += data;
			});

			response.on('end', function() {
				if(filters.body(body)) {
					console.log('#new result url=' + uhash);
					rc.setex(uhash, cfg.cache.ttl, body);
				} else {
					console.log('#filtered body result url=' + uhash);
				}
				res.end(body);
			});
		});
	}

	server.listen(cfg.port);
	console.log('Redoxy started and listening on port: %s, redis.port: %s, redis.host: ', cfg.port, cfg.redis.port);
	console.log('Redoxy using Redis on: port %s and host %s', cfg.redis.port, cfg.redis.host);

}

exports.start = start;
