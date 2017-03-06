var http = require('http'); 
var server = null;
var mysql = require('mysql');



function errorHandler(error)
{
	console.log(error);
}

function endHandler(client)
{
	client.end();
}

function resultHandler(row)
{
	console.log('id: ' + row.id);
	console.log('name: ' + row.raison);
}

function requestHandler(request, response) 
{ 
	
	var client = mysql.createConnection(
		{
			  host     : "localhost",
			  user     : "root",
			  password : "root",
			  database : "formation"
		}
	);
	
	var statement = client.query('SELECT * FROM clients');
	 
	statement.on("result", resultHandler);
	statement.on("error", errorHandler);
	statement.on("end", endHandler.bind(this,client) );
		
	
	response.writeHead(200, {'Content-Type': 'text/html'}); 
	response.write('200 OK'); 
	response.end();
}

server = http.createServer();
server.on('request', requestHandler );
server.listen(3000);  