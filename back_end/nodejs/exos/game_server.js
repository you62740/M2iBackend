function requestHandler(request, response)
{
	var params 	= querystring.parse(url.parse(request.url).query);
	var page 	= url.parse(request.url).pathname;
	var query 	= url.parse(request.url).query;
	var content	= '';
	
	if( page == '/')
	{
		content = filesystem.readFileSync('game_client.html', 'utf8');
		response.writeHead(200, {'Content-Type': 'text/html'}); 
		response.write(content);
		response.end();
	}
	else if( page == '/client')
	{
		content = filesystem.readFileSync('game_client.js', 'utf8');
			
		response.writeHead(200, {'Content-Type': 'text/javascript'}); 
		response.write(content);
		response.end();
	}
	else if( page == '/socketio')
	{
		content = filesystem.readFileSync('node_modules/socket.io/node_modules/socket.io-client/socket.io.js', 'utf8');
		response.writeHead(200, {'Content-Type': 'text/javascript'}); 
		response.write(content);
		response.end();
	}
};

function sendDataToAllUsers()
{
	var all_messages 	= new Array();
	var all_users	 	= new Array();
	var i				= 0;
	var max				= users.length;
	var currentUser		= null;
	
	for( i = 0; i < max; i++)
	{
		all_users.push(users[i].pseudo);
	}
	
	max = messages.length;
	
	for( i = 0; i < max; i++ )
	{
		currentUser = getUser(messages[i].user_id);
		
		if( currentUser != null )
		{
			all_messages.push({msg: messages[i].msg, pseudo: currentUser.pseudo });
			messages[i].pseudo = currentUser.pseudo;
		}
		else
		{
			all_messages.push({msg: messages[i].msg, pseudo: messages[i].pseudo });
		}
	}
	
	
	io.emit("refresh_data", {users: all_users, messages: all_messages});
}

function getUser(unique_id)
{
	var i 		= 0;
	var max 	= users.length;
	
	for( i = 0; i < max; i++ )
	{
		if( users[i].id == unique_id )
		{
			return users[i];
		}
	}
	
	return null;
}

function removeUser(unique_id)
{
	var i 		= 0;
	var max 	= users.length;
	
	for( i = 0; i < max; i++ )
	{
		if( users[i].id == unique_id )
		{
			users.splice(i, 1);
			return;
		}
	}
}

function addUser(unique_id, pseudo)
{
	removeUser(unique_id);
	users.push({id: unique_id, pseudo: pseudo});
}

function messageHandler(socket,data)
{
	removeUser(socket.client.id);
	addUser(socket.client.id, data.pseudo);
	
	messages.push(	{
						msg: data.msg, 
						user_id: socket.client.id,
						pseudo: data.pseudo
					}
	);
	
	if( messages.length > NUM_MESSAGES)
		messages.shift();
	
	sendDataToAllUsers();
}

function closeHandler(socket, data)
{
	removeUser(socket.client.id);
	sendDataToAllUsers();
}

function connectHandler(socket)
{	
	socket.on("send_message", messageHandler.bind(this, socket) );
	socket.on("disconnect", closeHandler.bind(this, socket) );
	socket.emit("server_version", SERVER_VERSION );
	sendDataToAllUsers();
};

const SERVER_VERSION	= 0.1;
const NUM_MESSAGES 		= 30;

var unique_id			= 0;
var messages			= new Array();
var users				= new Array();
var filesystem 			= require('fs');
var http 				= require('http');
var socketio 			= require('socket.io');
var url 				= require('url');
var querystring 		= require('querystring');
var server 				= http.createServer();
var io 					= socketio.listen(server);


server.listen(3000); 
server.on('request', requestHandler);	
io.sockets.on('connection', connectHandler );
