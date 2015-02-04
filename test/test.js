var crypto = require('crypto');

// Ok, I know I'm not doing many tests here, but I'm planing to, so take it easy! :P


// Ah, yeah, this is not the right way of testing, I know, but I'm a Java developer
// and I'm learning =]


console.log(crypto.createHash('sha1').update('macarrao').digest('hex'));


