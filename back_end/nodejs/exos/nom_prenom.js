var http = require('http'); 
var url = require('url');
var querystring = require('querystring');
var server = null;

function registerhandler(data, response)
{
	var mon_formulaire='<form method="GET" action="http//localhost:3000/register">';
	
	mon_formulaire += '<label>Nom</label>';
	mon_formulaire += '<input type ="text" value "votre nom"/><br/>';
 }

function requestHandler(request, response) 
{ 
	var myurl  =  url.parse(request.url)
	var params = querystring.parse(myurl.query);
	var page   = myurl.pathname
	dispatcheremit(page, params, response)

}
function contactHandler(data, response) 
{ 
	
	response.writeHead(200, {'Content-Type': 'text/html'}); 
	response.write('<h1>CONTACT</h1>' + data.nom ); 
	response.end();
}
function homeHandler(data, response) 
{ 
	
	response.writeHead(200, {'Content-Type': 'text/html'}); 
	response.write('<h1>HOME</h1>' + data.nom ); 
	response.end();
}

server = http.createServer();
server.on('request', requestHandler );
server.listen(3000);  

dispatcher.on('/request'	,requesthandler);
dispatcher.on('/contact'	,contacthandler);
dispatcher.on('/home'	,contacthandler);