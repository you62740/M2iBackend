var http 			= require('http'); 
var url 			= require('url');
var querystring 	= require('querystring');
var EventEmitter 	= require('events').EventEmitter;
var server 			= null;
var dispatcher 		= null;



function contactHandler( response, user_params )
{
	response.writeHead(200, {'Content-Type': 'text/html'}); 
	response.write(	'<h1>CONTACT PAGE</h1>'); 
	response.end();
}

function homeHandler( response, user_params )
{
	response.writeHead(200, {'Content-Type': 'text/html'}); 
	response.write(	'<h1>HOME PAGE</h1>'); 
	response.end();
}

function notFoundHandler( response )
{
	response.writeHead(404, {'Content-Type': 'text/html'}); 
	response.write(	'<h1>NOT FOUND</h1>'); 
	response.end();
}

function requestHandler(request, response) 
{ 
	var currentURL	= url.parse(request.url); 
	var params 		= querystring.parse(currentURL.query);
	
	switch( currentURL.pathname )
	{
		case '/home.html':
			dispatcher.emit( 'home', response, params );
			break;
			
		case '/contact.html':
			dispatcher.emit( 'contact', response, params );
			break;
			
		default:
			dispatcher.emit( 'notfound', response );
			break;
	}
}

server = http.createServer();
server.on('request', requestHandler );
server.listen(3000);  

dispatcher = new EventEmitter();
dispatcher.on('home', homeHandler );
dispatcher.on('contact', contactHandler );
dispatcher.on('notfound', notFoundHandler );