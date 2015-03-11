var http = require('http');
var redis = require('redis');
var crypto = require('crypto');
var cfg = require('./config.json');
var filters = require('./filters');
var logger = require('./lib/logger');
var zlib = require('zlib');

function start(cfg) {

	var redisClient = redis.createClient(cfg.redis.port, cfg.redis.host, {});

	redisClient.on('error', function(e) {
		logger.error('erro: ' + e);
	});

	var server = http.createServer(function(req, res) {
    res.setHeader('Content-Type', 'application/json; charset=UTF-8');

		var host = req.headers.host;

		var url = req.headers.host + req.url;

		var uhash = crypto.createHash('sha1').update(url).digest('hex');

		redisClient.get(uhash, function(err, reply) {
			if (reply) {
				zlib.gunzip(new Buffer(reply, 'binary'), function(err, unzipedReply) {
					res.end(unzipedReply);
				});
				
				logger.info('status=cached result url=' + uhash);
			} else {
				doGet(req, res, redisClient, uhash);
			}
		});

	});

	function doGet(req, res, rc, uhash) {
		var host = cfg.proxy && cfg.proxy.host || req.headers.host;
		var port = cfg.proxy && cfg.proxy.port || 80;
		var headers = cfg.proxy && cfg.proxy.host && { 'Host':  req.headers.host} || {};
		
		http.get({
			host : host,
			port : port,
			path : req.url,
			headers : headers
		}, function(response) {
			
			var body = '';
			response.on('data', function(data) {
				body += data;
			});

			response.on('end', function() {
				if(filters.body(body)) {
					logger.info('status=new result url=' + uhash);
					
					zlib.gzip(body, function(err, gzipBody) {
						rc.setex(uhash, cfg.cache.ttl, gzipBody.toString('binary'));
						res.end(body);
					});
				} else {
					logger.info('status=filtered body result url=' + uhash);
					res.end(body);
				}
			});
		});
	}

	server.listen(cfg.port);
	logger.info('Redoxy started and listening on port: %s, redis.port: %s, redis.host: ', cfg.port, cfg.redis.port, cfg.redis.host);
	logger.info('Redoxy using Redis on: port %s and host %s', cfg.redis.port, cfg.redis.host);

}

exports.start = start;
