var http 			= require('http'); 
var url 			= require('url');
var querystring 	= require('querystring');
var EventEmitter 	= require('events').EventEmitter;
var server 			= null;
var tabCatalog		= new Array();

function Product(p_name, p_ref)
{
	this.name 		= p_name;
	this.reference 	= p_ref;
}

Product.prototype.name 		= null;
Product.prototype.reference = null;
Product.prototype.clone 	= function()
{
	var p = new Product(this.name, this.reference);
	return p;
};


function createMenu()
{
	var menu = '<ul><li><a href="./catalog">Catalogue</a></li><li><a href="./product">Creer produit</a></li></ul>';
	return menu;
}

function productHandler(data, response)
{
	
	if( data.valid_form == "OK")
	{
		tabCatalog.push(new Product(data.nom, data.reference));
		response.writeHead(200, {'Content-Type': 'text/html'}); 
		response.write(createMenu()); 
		response.write("merci, le produit a ete rentre en base."); 
		response.end();
	}
	else
	{
		var mon_formulaire = '<form method="GET" action="http://localhost:3000/product">';
	
		mon_formulaire += '<label>Nom:</label>';
		mon_formulaire += '<input name="nom" type="text" placeholder="nom produit"/><br/>';
		
		mon_formulaire += '<label>Reference:</label>';
		mon_formulaire += '<input name="reference" type="text" placeholder="reference produit"/><br/>';
		
		mon_formulaire += '<input name="valid_form" type="submit" value="OK"/></form>';
		
		response.writeHead(200, {'Content-Type': 'text/html'}); 
		response.write(createMenu()); 
		response.write(mon_formulaire); 
		response.end();
	}
	
	
}

function catalogHandler(data, response)
{
	
	var html 	= "<h1>CATALOG</h1>";
	var i 		= 0;
	var max 	= tabCatalog.length;
	
	html += "<table>";
	
	for( i = 0; i < max; i++ )
	{
		html += "<tr><td>"+tabCatalog[i].name+"</td><td>"+tabCatalog[i].reference+"</td></tr>";
	}
	
	html += "</table>";
	
	response.writeHead(200, {'Content-Type': 'text/html'}); 
	response.write(createMenu()); 
	response.write(html); 
	response.end();
}

function requestHandler(request, response) 
{ 
	var myurl	= url.parse(request.url);
	var params 	= querystring.parse(myurl.query);
	var page 	= myurl.pathname;
	
	switch( page )
	{
		case '/product': 
			productHandler(params,response); 
			break;
			
		case '/catalog': 
			catalogHandler(params,response); 
			break;
			
		default : 
			catalogHandler(params,response); 
			break;
	}
	
}

server = http.createServer();
server.on('request', requestHandler );
server.listen(3000);  




