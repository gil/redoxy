#!/usr/bin/env node

var pkg = require('./package.json');
var cfg = require('./config.json');
var server = require('./server');

var program = require('commander');
program
	.version(pkg.version)
    .option('-p, --port <port>', 'Port on which to listen to. default: 8077')
    .option('--redis-port <port>', 'Redis port. default: 6379')
    .option('--redis-host <port>', 'Redis host. default: 127.0.0.1 [localhost]')
    .parse(process.argv);

cfg.port = program.port || cfg.port;
cfg.redis.port = program.redisPort || cfg.redis.port;
cfg.redis.host = program.redisHost || cfg.redis.host;

server.start(cfg);