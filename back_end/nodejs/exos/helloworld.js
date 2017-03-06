var http 	= require('http'); 
var server 	= null;

function requestHandler(request, response) 
{ 
	response.writeHead(200, {'Content-Type': 'text/html'}); 
	response.write('<h1>hello world</h1>'); 
	response.end();
}

server = http.createServer();
// server.on == server.addEventListener
server.on('request', requestHandler );
server.listen(5000);  