var http 		= require('http'); 
var url 		= require('url');
var querystring = require('querystring');
var server 		= null;
var slaves		= [
	{"host": "172.30.2.153"	, "service": "/wagons"	, "port": 4000, "counter":0	},
	{"host": "172.30.2.49"	, "service": "/wagons"	, "port": 4000, "counter":0	},
	{"host": "172.30.2.176"	, "service": "/wagons"	, "port": 4000, "counter":0	},
	{"host": "172.30.2.49"	, "service": "/doc"		, "port": 4500, "counter":0	},
	{"host": "172.30.2.153"	, "service": "/doc"		, "port": 4500, "counter":0	},
	{"host": "172.30.2.176"	, "service": "/doc"		, "port": 4500, "counter":0	},
	{"host": "172.30.2.49"	, "service": "/meteo"	, "port": 5000, "counter":0	},
	{"host": "172.30.2.153"	, "service": "/meteo"	, "port": 5000, "counter":0	},
	{"host": "172.30.2.176"	, "service": "/meteo"	, "port": 5000, "counter":0	}
];

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

function masterResponse( response, slaveResponse )
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
							response.writeHead(200, {'Content-Type': 'text/html'}); 
							response.write( str );
							response.end();
						}
	);
}

function requestHandler(request, response) 
{ 
	var params 	= querystring.parse(url.parse(request.url).query);
	var page 	= url.parse(request.url).pathname;
	var query 	= url.parse(request.url).query;
	var options = new Object();
	var slave	= getNextSlave(page);
	
	if( slave != null )
	{
		slave.counter++;
		options.protocol 	= "http:";
		options.host 		= slave.host;
		options.port 		= slave.port;
		options.path 		= slave.service;
		http.request( options, masterResponse.bind(this, response) ).end();
	}
	else
	{
		response.writeHead(404, {'Content-Type': 'text/javascript'}); 
		response.end();
	}
}

server = http.createServer();
server.on('request', requestHandler );
server.listen(3000);  