var http 			= require('http'); 
var url 			= require('url');
var querystring 	= require('querystring');
var EventEmitter 	= require('events').EventEmitter;
var server 			= null;

function tagazouHandler(data)
{
	console.log(data);
};

function requestHandler(request, response) 
{ 
	console.log("**********************************");
	console.log("****** nouvelle requete **********");
	console.log("**********************************");
	console.log("url de la requete: "+request.url);

	// on analyse notre url à l'aide du module url
	var currentURL	= url.parse(request.url); 
	// puis on analyse la propriété query, qui contient la querystring
	// de manière à en faire un objet qui contient tous les paramètres
	// envoyés en GET
	var params 		= querystring.parse(currentURL.query);
	
	response.writeHead(200, {'Content-Type': 'text/html'}); 
	
	// ici on écrit une réponse qui contient tous nos paramètres
	response.write(	'page = ' 			+ 
					currentURL.pathname + 
					" parametres = "	+
					JSON.stringify(params)
	); 
	
	response.end();
	
	
	// on crée un nouvel objet de type eventemitter
	// qui nous permet d'écouter et d'envoyer des evenements
	var dispatcher 	= new EventEmitter();
	
	// on écoute un évenement de type 'tagazou'
	dispatcher.on('tagazou', tagazouHandler );
	
	// on peut éventuellement annuler l'écoute de l'évenement
	// décommenter la ligne du dessous pour vérifier.
	
	//dispatcher.off('tagazou', tagazouHandler);
	
	// on fait un petit test sur le nom du fichier demandé
	if( currentURL.pathname == '/toto.html' )
	{
		// si c'est le bon fichier on envoit un evenement de type tagazou
		// qui recevra les paramètres envoyés par le client
		dispatcher.emit('tagazou', params);
	}
}

server = http.createServer();
server.on('request', requestHandler );
server.listen(3000);  