var http 			= require('http'); 
var url 			= require('url');
var querystring 	= require('querystring');
var EventEmitter 	= require('events').EventEmitter;
var server 			= null;
var dispatcher 		= new EventEmitter();
var catalogue 		= new Array(); 
function produit(data, response)
{
	
	if( data.valid_form == "OK")
	{
		var code    = data.code;
		var libelle = data.libelle;
		var prix    = data.prix;
	
		response.writeHead(200, {'Content-Type': 'text/html'}); 
		response.write('produit ajouté au catalogue, '+code+" "+libelle); 
		response.end();
	}
	else
	{
		var mon_formulaire = '<form method="GET" action="http://localhost:3000/register">';
	
		mon_formulaire += '<label>code:</label>';
		mon_formulaire += '<input name="code" type="text" placeholder="code produit"/><br/>';
		
		mon_formulaire += '<label>libelle:</label>';
		mon_formulaire += '<input name="libelle" type="text" placeholder="libelle"/><br/>';
		
		mon_formulaire += '<label>prix:</label>';
		mon_formulaire += '<input name="prix" type="text" placeholder="prix"/><br/>';
		
		mon_formulaire += '<input name="valid_form" type="submit" value="OK"/></form>';
			
		response.writeHead(200, {'Content-Type': 'text/html'}); 
		response.write(mon_formulaire); 
		response.end();
	}	
}


function addproduct(catalogue, newproduct)
{
		newproduct = new produit(data, response)
		catalogue.push(newproduct)
		console.log(catalogue)
}

server = http.createServer();
server.on('request', addproduct );
server.listen(3000);  

