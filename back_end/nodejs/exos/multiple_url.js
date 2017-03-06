var http = require('http'); 
var url = require('url');
var querystring = require('querystring');
var server = null;
var filesystem = require('fs');

function requestHandler(request, response) 
{ 
	var params = querystring.parse(url.parse(request.url).query);
	var page = url.parse(request.url).pathname;
	var query = url.parse(request.url).query;
	
	console.log(page);
	
	if( page == '/helloworld')
	{
		var data = filesystem.readFileSync('./exos/helloworld.js', 'utf8'); 
		response.writeHead(200, {'Content-Type': 'text/javascript'}); 
		response.write(data); 
		response.end();
	}
	else
	{
		response.writeHead(404, {'Content-Type': 'text/html'}); 
		response.write("<h1>404 Not Found</h1>"); 
		response.end();
	}
	
}

server = http.createServer();
server.on('request', requestHandler );
server.listen(3000);  