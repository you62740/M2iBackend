
function dataFromClientHandler(socket, data)
{
	var num_cacahuete = parseInt(data.cacahuete);
	var num_poireaux = parseInt(data.poireaux);
	var num_patates = parseInt(data.patates);
	
	num_cacahuete++;
	num_poireaux++;
	num_patates++;
	
	console.log("nombre de cacahuetes = "+num_cacahuete);
	console.log("nombre de poireaux = "+num_poireaux);
	console.log("nombre de patates = "+num_patates);
	
	socket.emit('data_from_server', 
				{
					cacahuete: num_cacahuete, 
					poireaux: num_poireaux,
					patates: num_patates
				} 
	);
}

function connectHandler(socket)
{	
	console.log("un utilisateur veut se connecter par le biais d'une socket");
	socket.on("data_from_client",dataFromClientHandler.bind( this,socket) );
	// socket.on("disconnect", closeHandler.bind(this, socket) );
	// socket.emit("server_version", SERVER_VERSION );
};

var http 				= require('http');
var socketio 			= require('socket.io');
var server 				= http.createServer();
var io 					= socketio.listen(server);


server.listen(3000); 
io.sockets.on('connection', connectHandler );
