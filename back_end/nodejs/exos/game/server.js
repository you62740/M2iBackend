function Player(socket)
{
	this._init(socket);
}

Player.prototype.logged = false;
Player.prototype.socket = null;
Player.prototype.name 	= null;
Player.prototype.x 		= 0;
Player.prototype.y 		= 0;
Player.prototype.color	= null;
Player.prototype.time	= 0;
Player.prototype.mass	= 0;



Player.prototype._init 					= function(socket)
{
	this.logged = false;
	this.socket = socket;
	this.socket.once("login", this._loginHandler.bind(this) );
	this.socket.on("set_player_data", this._setDataHandler.bind(this) );
	this.socket.emit("require_login");
};

Player.prototype._setDataHandler 		= function(data)
{
	this.time	= Date.now();
	this.name 	= data.name;
	this.mass	= data.mass;
	this.x 		= data.x;
	this.y 		= data.y;
	this.color 	= data.color;
	this.logged = true;
};

Player.prototype._loginHandler 			= function(data)
{
	var gameserver = GameServer.getInstance();
	this.time	= Date.now();
	this.name 	= data.name;
	this.mass	= data.mass;
	this.x 		= data.x;
	this.y 		= data.y;
	this.color 	= data.color;
	this.logged = true;
	
	this.socket.on('collide_food', gameserver.collideFoodHandler.bind(gameserver) );
	
	console.log('new player', data);
};

Player.prototype.getState				= function()
{
	return {x: this.x, y: this.y, color: this.color, name: this.name, mass: this.mass };
};

Player.prototype.destroy = function()
{
	this.socket.disconnect();
	this.logged = false;
	this.socket = null;
	this.name = null;
	this.mass = 0;
	this.time = 0;
	this.x = 0;
	this.y = 0;
	this.color = null;
};


function Food(){}
Food.prototype.x 		= 0;
Food.prototype.y 		= 0;
Food.prototype.id 		= 0;
Food.prototype.mass 	= 10;
Food.prototype.color 	= null;



function GameServer(){}

GameServer._instance 					= null;
GameServer.getInstance 					= function()
{
	GameServer._instance = GameServer._instance || new GameServer();
	return GameServer._instance;
};

GameServer.prototype._server 			= null;
GameServer.prototype._io 				= null;
GameServer.prototype._players 			= null;
GameServer.prototype._foods 			= null;


GameServer.prototype.collideFoodHandler		= function(foodId)
{
	var i = this._foods.length;
	var current = null;
	while( --i > -1 )
	{
		current = this._foods[i];
		if( current.id == foodId )
		{
			current.x = parseInt(Math.random() * 800);
			current.y = parseInt(Math.random() * 600);
		}
	}
};

GameServer.prototype.refresh			= function()
{
	var timestamp	= Date.now();
	var inactives	= new Array();
	var data		= {players: [], food: this._foods};
	var i 			= this._players.length;
	var current 	= null;
	
	while( --i > -1 )
	{
		current = this._players[i];
		if( current.logged == false )
			continue;
					
		data.players.push( current.getState() );
		
		if( timestamp - current.time > 5000 )
		{
			current.logged = false;
			console.log("disconnected: ", current.name);
			inactives.push(current);
		}
	}
	
	if( current != null )
	{
		//  on envoit au joueur courant l'état de tout les joueurs.
		current.socket.emit('refresh_world', data); 
		
		// on envoit à tout les autres la même chose, par le biais de la propriété broadcast
		current.socket.broadcast.emit('refresh_world', data);
	}
	
	i = inactives.length;
	
	while( --i > -1 )
	{
		current = inactives[i];
		this._players.splice( this._players.indexOf( current ), 1);
		current.destroy();
		current = null;
	}
	
	setTimeout( this.refresh.bind(this), 10 );
};

GameServer.prototype.init 				= function()
{
	var http 		= require('http');
	var socketio 	= require('socket.io');
	var i 			= 50;
	var myfood		= null;
	
	this._players 	= new Array();
	this._foods		= new Array();
	this._server 	= http.createServer();
	
	this._server.listen(3000);  
	this._io = socketio.listen(this._server);
	this._io.sockets.on('connection', this._connectHandler.bind(this) );
	
	
	while( --i > -1 )
	{
		myfood = new Food();
		myfood.x = ( Math.random() * 800 ) >> 0;
		myfood.y = ( Math.random() * 600 ) >> 0;
		myfood.color = '#'+parseInt( Math.random() * 0xFFFFFF ).toString(16);
		myfood.id = i;
		myfood.mass = 10;
			
		this._foods.push(myfood);
	}
	
	this.refresh();
};


GameServer.prototype._connectHandler 	= function(socket)
{
	this._players.push( new Player(socket) );
};


GameServer.getInstance().init();



