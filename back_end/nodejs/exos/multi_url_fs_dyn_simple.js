var http 			= require('http'); 
var url 			= require('url');
var querystring 	= require('querystring');
var filesystem 		= require('fs');
var server 			= null;
var students		= null;

// dès que l'on reçoit une requête
function requestHandler(request, response) 
{ 
	// on crée un objet de type "url" qui nous permet d'obtenir
	// des informations à propos de la requête
	var currentURL	= url.parse(request.url); 
	
	// on obtient également les paramètres (GET)
	var params 		= querystring.parse(currentURL.query);
	
	// puis on vérifie si le fichier demandé, existe dans notre répertoire
	//, le répertoire ou l'on stocke nos fichiers html
	var myFile		= './exos/web'+currentURL.pathname;
	
	// on crée une variable qui contiendra les données à renvoyer au client
	var data		= "";
	
	// le code de retour http ( 200 = OK, 404 = not found etc ... )
	var httpCode	= 200;
	
	var random		= Math.round( Math.random() * (students.length - 1) );
	var currentStudent = students[random];
	
	// on vérifie si le fichier existe vraiment sur le disque dur
	if( myFile == './exos/web/presentation.html' )
	{
		data = '<h1>'+currentStudent.nom+" "+currentStudent.prenom+'</h1>';
		httpCode = 200;
	}
	else if( filesystem.existsSync(myFile) )
	{
		// si oui, alors on stocke dans la variable data
		// le contenu du fichier demandé
		data = filesystem.readFileSync(myFile);
		
		// et on spécifie que le code de retour http est 200 = OK
		httpCode = 200;
	}
	else
	{
		// sinon le code html à renvoyer est un code
		// qui nous précise que le contenu n'a pas été trouvé
		data = "<h1>404 not found</h1>";
		
		// et enfin le code de retour http = 404: not found
		httpCode = 404;
	}
	
	// on écrit notre réponse et on l'envoit au client.
	response.writeHead(httpCode, {'Content-type': 'text/html'} );
	response.write(data);	
	response.end();
	
}


students = [
	{"nom":"El ouahmani", "prenom":"Younes"},
	{"nom":"Kaczmarek", "prenom":"Richard"},
	{"nom":"Ait ben ahmed", "prenom":"Mohammed"}
];

server = http.createServer();
server.on('request', requestHandler );
server.listen(3000);  
