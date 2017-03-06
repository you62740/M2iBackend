var http 			= require('http'); 
var url 			= require('url');
var querystring 	= require('querystring');
var child_process 	= require('child_process');

var tabResponses	= new Array();
var meteo 			= child_process.fork("./local_meteo.js");
var wagons 			= child_process.fork("./local_wagons.js");
var doc 			= child_process.fork("./local_doc.js");

function childProcessHandler(childResponse)
{
	var response = tabResponses[parseInt(childResponse.response_id)];
	
	if( response != undefined )
	{
		response.writeHead(200, {'Content-Type': 'text/html'}); 
		response.write(childResponse.result);
		response.end();
	}
}

function requestHandler(request, response) 
{ 
	var params 	= querystring.parse(url.parse(request.url).query);
	var page 	= url.parse(request.url).pathname;
	var query 	= url.parse(request.url).query;
	
	
	if( page == '/meteo' )
	{
		tabResponses.push(response);
		
		meteo.send(		{ 
							"type": "meteo", 
							"result":"",
							"response_id":tabResponses.length - 1 
						}
				);
	}
	else if( page == '/doc' )
	{
		tabResponses.push(response);
		
		doc.send(		{ 
							"type": "doc", 
							"result":"",
							"response_id":tabResponses.length - 1 
						}
				);
	}
	else if( page == '/wagons' )
	{
		tabResponses.push(response);
		
		wagons.send(	{ 
							"type": "wagons", 
							"result":"",
							"response_id":tabResponses.length - 1 
						}
				);
	}
	else
	{
		response.writeHead(404, {'Content-Type': 'text/javascript'}); 
		response.end();
	}
	
}

meteo.on('message', childProcessHandler);
wagons.on('message', childProcessHandler);
doc.on('message', childProcessHandler);
server = http.createServer();
server.on('request', requestHandler );
server.listen(3000);  

