var http 			= require('http'); 
var url 			= require('url');
var child_process 	= require('child_process');
var querystring 	= require('querystring');
var meteo 			= child_process.fork("./local_meteo.js");
var wagons 			= child_process.fork("./local_wagons.js");
var doc 			= child_process.fork("./local_doc.js");
var server 			= null;
var tabResponses	= new Array();
var slave_id		= 0;
var slaves			= [];
var fallbacks 		= [

	{ "service": "/wagons"	, "process": wagons, "type": "wagons"	},
	{ "service": "/meteo"	, "process": meteo, "type": "meteo"	},
	{ "service": "/doc"		, "process": doc, "type": "doc"	}
];


function addSlave(p_host, p_service, p_port)
{
	console.log("add slave "+p_host+", "+p_service+", "+p_port );
	slaves.push(
					{
						"host": p_host, 
						"service": p_service, 
						"port": p_port, 
						"counter": 0, 
						"id": slave_id++
					}
				);
}

function childProcessHandler(childResponse)
{
	var response = getResponse(parseInt(childResponse.response_id));
	
	if( response != undefined )
	{
		response.writeHead(200, {'Content-Type': 'text/html'}); 
		response.write(childResponse.result);
		response.end();
	}
}

function getFallBack(p_service)
{
	var i = fallbacks.length;
	var current = null;
	
	while( --i > -1 )
	{
		current = fallbacks[i];
		if( current.service == p_service )
			return current;
	}
	
	return null
}


function getResponse(response_id)
{
	return tabResponses[response_id];
}

function getNextSlave(p_service)
{
	var nextslave 	= null;
	var current 	= null;
	var i 			= slaves.length;
	var min			= 0xFFFFFFFF;
	
	while( --i > -1 )
	{
		current = slaves[i];
		
		if( current.service == p_service && current.counter < min )
		{
			nextslave 	= current;
			min 		= current.counter;
		}
	}
	
	return nextslave;
}

function masterResponse( response_id, slaveResponse )
{
	var str = "";
	slaveResponse.on(
						"data", 
						function(chunk)
						{
							str += chunk;
						}
	);
	
	slaveResponse.on(
						"end", 
						function()
						{
							getResponse(response_id).writeHead(200, {'Content-Type': 'text/html'}); 
							getResponse(response_id).write( str );
							getResponse(response_id).end();
						}
	);
}

function unReachableSlaveHandler( page, slave, response_id )
{
	var i = slaves.indexOf(slave);
	slaves.splice(i, 1);
	launchRequest(page, response_id);
}

function launchRequest(page, response_id)
{	
	var options 		= new Object();
	var slave			= getNextSlave(page);
	var remoteRequest 	= null;
	var fallback		= null;
	
	if( slave != null )
	{
		slave.counter++;
		options.protocol 	= "http:";
		options.host 		= slave.host;
		options.port 		= slave.port;
		options.path 		= slave.service;
		remoteRequest 		= http.request( options, 
											masterResponse.bind(
												this, 
												response_id
											) 
										);
										
		remoteRequest.on("error", unReachableSlaveHandler.bind(this, page, slave, response_id));
		remoteRequest.end();
	}
	else
	{
		fallback = getFallBack(page);
		
		if( fallback == null )
		{
			getResponse(response_id).writeHead(404, {'Content-Type': 'text/javascript'}); 
			getResponse(response_id).end();
		}
		else
		{
		
			fallback.process.send(		
						{ 
							"type": fallback.type, 
							"result":"",
							"response_id":response_id
						}
				);
		}
	}
}

function requestHandler(request, response) 
{ 
	var params 			= querystring.parse(url.parse(request.url).query);
	var page 			= url.parse(request.url).pathname;
	var query 			= url.parse(request.url).query;
	
	if( page == "/addslave")
	{
		addSlave(params.host, params.service, params.port);
		response.writeHead(200, {'Content-Type': 'text/html'}); 
		response.write( "OK" );
		response.end();
	}
	else
	{
		tabResponses.push(response);
		launchRequest(page, tabResponses.length - 1);
	}
}

server = http.createServer();
server.on('request', requestHandler );
server.listen(3000);  


meteo.on('message', childProcessHandler);
wagons.on('message', childProcessHandler);
doc.on('message', childProcessHandler);

/*
addSlave("172.30.2.153", "/wagons"	, 4000);
addSlave("172.30.2.153", "/doc"		, 4500);
addSlave("172.30.2.153", "/meteo"	, 5000);
addSlave("172.30.2.49", "/wagons"	, 4000);
addSlave("172.30.2.49", "/doc"		, 4500);
addSlave("172.30.2.49", "/meteo"	, 5000);
addSlave("172.30.2.176", "/wagons"	, 4000);
addSlave("172.30.2.176", "/doc"		, 4500);
addSlave("172.30.2.176", "/meteo"	, 5000);
*/
