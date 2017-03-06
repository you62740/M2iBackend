var http 			= require('http'); 
var url 			= require('url');
var querystring 	= require('querystring');
var EventEmitter 	= require('events').EventEmitter;
var server 			= null;
var dispatcher 		= new EventEmitter();


function registerHandler(data, response)
{
	
	if( data.valid_form == "OK")
	{
		var nom = data.nom;
		var prenom = data.prenom;
		var phone = data.phone;
		response.writeHead(200, {'Content-Type': 'text/html'}); 
		response.write('merci d\'avoir rempli ce formulaire, '+prenom+" "+nom+", un sms vous sera envoye au "+phone); 
		response.end();
	}
	else
	{
		var mon_formulaire = '<form method="GET" action="http://localhost:3000/register">';
	
		mon_formulaire += '<label>Nom:</label>';
		mon_formulaire += '<input name="nom" type="text" placeholder="votre nom"/><br/>';
		
		mon_formulaire += '<label>Prenom:</label>';
		mon_formulaire += '<input name="prenom" type="text" placeholder="votre prenom"/><br/>';
		
		mon_formulaire += '<label>Numero de telephone:</label>';
		mon_formulaire += '<input name="phone" type="text" placeholder="06.12.34.56.78"/><br/>';
		
		mon_formulaire += '<input name="valid_form" type="submit" value="OK"/></form>';
		
		response.writeHead(200, {'Content-Type': 'text/html'}); 
		response.write(mon_formulaire); 
		response.end();
	}
	
	
}

function homeHandler(data, response)
{
	response.writeHead(200, {'Content-Type': 'text/html'}); 
	response.write('<h1>HOME</h1>' + data.nom); 
	response.end();
}

function contactHandler(data, response)
{
	response.writeHead(200, {'Content-Type': 'text/html'}); 
	response.write('<h1>CONTACT</h1>' + data.nom); 
	response.end();
}

function requestHandler(request, response) 
{ 
	var myurl	= url.parse(request.url);
	var params 	= querystring.parse(myurl.query);
	var page 	= myurl.pathname;
	dispatcher.emit(page, params,response);
}

server = http.createServer();
server.on('request', requestHandler );
server.listen(3000);  

dispatcher.on('/register'	, registerHandler );
dispatcher.on('/home'		, homeHandler );
dispatcher.on('/contact'	, contactHandler );

// dispatcher.off('tagazou', tagazouHandler);




