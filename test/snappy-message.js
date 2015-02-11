var fs = require('fs');
var snappy = require('snappy');

var filename = 'big-message.json';

var content = fs.readFileSync(filename, 'UTF-8');

console.log(content);
snappy.compress(content, function (err, compressed) {
  console.log('compressed is a Buffer', compressed);
  
  fs.writeFileSync(filename + '.zip.snappy', compressed);
  
  // return it as a string
  snappy.uncompress(compressed, { asBuffer: false }, function (err, original) {
    console.log('the original String', original)
  });
});
