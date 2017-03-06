var http 			= require('http'); 
var url 			= require('url');
var querystring 	= require('querystring');
var server 			= null;
var remoteRequest 	= null;
var options			= new Object();


function errorHandler()
{
	console.log("oh no !");
}

function masterResponse()
{
	console.log("yeah !");
}

function requestHandler(request, response) 
{ 
	var params 	= querystring.parse(url.parse(request.url).query);
	var page 	= url.parse(request.url).pathname;
	var query 	= url.parse(request.url).query;
	
	switch( page )
	{
		case "/meteo": 
			response.writeHead(200, {'Content-Type': 'text/html'}); 
			response.write( "Alban : Il fait beau dans le sahara mais il pleut à AMIENS !");
			response.end();
			break;
			
		default:
			response.writeHead(404, {'Content-Type': 'text/javascript'}); 
			response.end();
	}
	
}

server = http.createServer();
server.on('request', requestHandler );
server.listen(5000);  


options.protocol 	= "http:";
options.host 		= "172.30.2.84";
options.port 		= 3000;
options.path 		= "/addslave?host=172.30.2.84&service=/meteo&port=5000";


remoteRequest = http.request( options, masterResponse );
remoteRequest.on("error", errorHandler);
remoteRequest.end();