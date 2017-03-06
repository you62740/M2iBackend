var http 		= require('http'); 
var url 		= require('url');
var querystring = require('querystring');
var server 		= null;



function requestHandler(request, response) 
{ 
	var params 	= querystring.parse(url.parse(request.url).query);
	var page 	= url.parse(request.url).pathname;
	var query 	= url.parse(request.url).query;
	
	switch( page )
	{
		case "/wagons": 
			response.writeHead(200, {'Content-Type': 'text/html'}); 
			response.write( "attention Pinardier , laissez passer");
			response.end();
			break;
			
		default:
			response.writeHead(404, {'Content-Type': 'text/javascript'}); 
			response.end();
	}
	
}

server = http.createServer();
server.on('request', requestHandler );
server.listen(4000);  