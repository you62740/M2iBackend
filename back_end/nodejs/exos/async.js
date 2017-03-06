var http 		= require('http'); 
var server 		= null;
var fs 			= require("fs");
var async		= require("async");

function requestHandler(request, response) 
{ 
	var wagons 	= null;
	var bdd		= null;
	
	async.waterfall(
		[
			function(callback)
			{
				fs.readFile('data/wagons.json', 'utf8', callback);
			},
			function (results, callback)
			{
				wagons = JSON.parse(results);
				fs.readFile('data/bdd.json', 'utf8', callback);
			},
			function (results, callback)
			{
				bdd = JSON.parse(results);
				callback(wagons, bdd);
			}
			
		],
		function(wagons, bdd)
		{
			console.log("resultat", bdd, wagons);
			response.writeHead(200, {'Content-Type': 'text/html'}); 
			response.write('hello world'); 
			response.end();
		}
	);



	
}

server = http.createServer();
server.on('request', requestHandler );
server.listen(3000);  