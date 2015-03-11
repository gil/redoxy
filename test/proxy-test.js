var http = require('http');

http.get({
	host : 'localhost',
	port : 8077,
	path : '/',
	headers : {
		'Host' : 'www.google.com.br'
	}
}, function(response) {
	
	var body = '';
	response.on('data', function(data) {
		body += data;
	});

	response.on('end', function() {
		console.log(body);
	});
	
});
