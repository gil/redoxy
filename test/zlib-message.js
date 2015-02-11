var fs = require('fs');
var zlib = require('zlib');

var filename = 'huge-message.json';

var gzip = zlib.createGzip();
var fs = require('fs');
var inp = fs.createReadStream(filename);
var out = fs.createWriteStream(filename + '.zlib');

inp.pipe(gzip).pipe(out);

