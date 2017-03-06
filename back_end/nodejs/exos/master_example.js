var http 			= require('http'); 
var url 			= require('url');
var querystring 	= require('querystring');

// on va chercher le module child_process qui nous permet
// de lancer des scripts node js côté serveur 
// en même temps que le script principal
// on appellera ces scripts, des processus enfants 
// éxécutés en parralèle.
var child_process 	= require('child_process');


// on crée un tableau destiné à stocker les objets de type response
// qui vont nous servir à renvoyer une réponse à nos clients
var tabResponses	= new Array();

// puis on crée un processus enfant et on récupère un objet
// qui nous permet de communiquer avec lui
var slave 			= child_process.fork("./slave_example.js");
var slave2 			= child_process.fork("./slave2_example.js");


// le processus enfant nous a répondu 
// on reçoit donc des données en paramètre çàd celles
// qu'il nous a envoyé
function slaveHandler(childResponse)
{
	// on peut récupérer la position de l'objet Response
	// dans le tableau de réponses
	var index 		= parseInt(childResponse.response_id);
	var response 	= tabResponses[index];
	
	// et écrire notre réponse à notre client ,
	// réponse dont le contenu a été généré par notre processus
	// enfant.
	
	response.writeHead(200, {'Content-Type': 'text/html'}); 
	response.write(childResponse.result);
	response.end();
}

// on récupère toutes les requêtes client
// dans notre fonction requestHandler
// de la même façon que les fois précédentes
function requestHandler(request, response) 
{ 
	// on analyse l'url demandée...
	var params 	= querystring.parse(url.parse(request.url).query);
	var page 	= url.parse(request.url).pathname;
	var query 	= url.parse(request.url).query;
	
	// si la page demandée est '/slave'
	if( page == '/slave' )
	{
		// alors on stocke notre objet de type Response
		// dans le tableau de reponses car on ne peut l'envoyer
		// à notre processus enfant, et il faudra bien 
		// renvoyer une réponse au client lorsque le processus enfant
		// nous aura envoyé des données.
		tabResponses.push(response);
		
		// on envoie donc des données au processus enfant
		// (essentiellement l'id de notre réponse dans le tableau de réponses )
		slave.send( 
				{ 
					"response_id":tabResponses.length - 1 
				}
		);
	}
	else if( page == '/richard_aux_gros_bras' )
	{
		tabResponses.push(response);
		slave2.send(
			{ 
				"response_id":tabResponses.length - 1 
			}
		);
	}
	
	
}

// à chaque fois que l'objet de communication
// reçoit l'évenement 'message', la fonction 
// slaveHandler sera appelée et recevra en paramètre
// les données envoyées par le processus enfant
slave.on('message', slaveHandler);
slave2.on('message', slaveHandler);


// on initialise un serveur http classique nodejs
server = http.createServer();
server.on('request', requestHandler );
server.listen(3000);  

