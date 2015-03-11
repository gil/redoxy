var cfg = require('../config.json');


var proxyHost = cfg.proxy && cfg.proxy.host || 'bla bla';

console.log(proxyHost);

var headers = cfg.proxy && cfg.proxy.host && { 'Host':  'www.buscape.com.br'} || {};

console.log(headers);