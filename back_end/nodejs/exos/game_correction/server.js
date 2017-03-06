

//common
const GAME_PORT				= 3000;
const MAP_WIDTH				= 1500;
const MAP_HEIGHT			= 1500;
const MIN_MASS 				= 1;
const MAX_MASS 				= 2000;
const MAX_RADIUS 			= 150;
const MIN_RADIUS 			= 10;
const MAX_DEZOOM 			= 100;


// server
const DEFAULT_PLAYER_MASS 	= 30;
const INACTIVITY_TIME		= 10000; // in ms
const EAT_FACTOR			= 1.2;
const SERVER_IDLE_TIME		= 8; // in ms
const SERVER_STATS_TIME		= 10000 // in ms
const NUM_FOOD_START		= 300;


// front notifications
const GAME_READY 			= "game_ready";
const SEND_DATA 			= "send_data";
const PLAYER_LOOP 			= "player_loop";
const START_APPLICATION 	= "start_application";
const GET_SERVER_DATA 		= "get_server_data";



// communication events
const NET_GAME_OVER 		= "net_game_over"; 
const NET_SET_PLAYER_DATA 	= "net_set_player_data"; 
const NET_COLLIDE_FOOD 		= "net_collide_food"; 
const NET_COLLIDE_PLAYER 	= "net_collide_player"; 
const NET_REFRESH_WORLD 	= "net_refresh_world"; 
const NET_CREATE_PLAYER		= "net_create_player";
const NET_ASK_PLAYER		= "net_ask_player";






function EntityVO()
{
	this.id = EntityVO._counter;
	EntityVO._counter++;
}




EntityVO.prototype.id 			= 0;
EntityVO.prototype.name 		= null;
EntityVO.prototype.color 		= null;
EntityVO.prototype.x 			= null;
EntityVO.prototype.y 			= null;
EntityVO.prototype.mass 		= 0;
EntityVO.prototype.radius 		= 10;

//static
EntityVO._counter				= 0;

EntityVO.getRadius				= function(mass)
{
	var t 		= mass;
	var d 		= MAX_MASS;
	var ratio 	= (t==d) ? 1 : (-Math.pow(2, -10 * t/d) + 1);
	var min 	= MIN_RADIUS;
	var max 	= MAX_RADIUS;
	var radius 	= min + ( max - min ) * ratio;
	return parseInt(radius);
};

EntityVO.setMass				= function(vo,mass)
{
	vo.mass = mass;
	vo.radius = EntityVO.getRadius(mass);
};

EntityVO.setServerState			= function(vo,obj)
{
	vo.x		= obj.x;
	vo.y		= obj.y;
	vo.name		= obj.name;
	vo.color	= obj.color;
};

EntityVO.setClientState			= function(vo, obj)
{
	vo.id 		= obj.id;
	vo.name 	= obj.name;
	vo.radius 	= obj.radius;
	vo.color 	= obj.color;
	vo.mass 	= obj.mass;
};

EntityVO.setState				= function(vo,obj)
{
	vo.id 		= obj.id;
	vo.x 		= obj.x;
	vo.y 		= obj.y;
	vo.name 	= obj.name;
	vo.radius 	= obj.radius;
	vo.color 	= obj.color;
	vo.mass 	= obj.mass;
};




function GameServer(){}

GameServer._instance 						= null;
GameServer.getInstance 						= function()
{
	GameServer._instance = GameServer._instance || new GameServer();
	return GameServer._instance;
};

GameServer.prototype._server 				= null;
GameServer.prototype._io 					= null;
GameServer.prototype._players 				= null;
GameServer.prototype._foods 				= null;
GameServer.prototype._sockets 				= null;
GameServer.prototype._fps					= 0;
GameServer.prototype._lastTime				= 0;
GameServer.prototype._statsTime				= 0;


GameServer.prototype.stats					= function()
{
	if(this._lastTime - this._statsTime > SERVER_STATS_TIME)
	{
		this._statsTime = this._lastTime;
		console.log("fps: ", this._fps, "num players: ", this._players.length);
	}
};

GameServer.prototype.refresh				= function()
{
	var timestamp	= Date.now();
	var inactives	= new Array();
	var data		= {players: [], food: this._foods};
	var i 			= this._players.length;
	var current 	= null;
	
	while( --i > -1 )
	{
		current = this._players[i];
		
		if( timestamp - current.time > INACTIVITY_TIME )
		{
			inactives.push(current);
		}
		else
		{
			data.players.push( current.getState() );
		}
	}
	
	i = inactives.length;
	
	while( --i > -1 )
	{
		this.gameOver( inactives[i] );
	}
	
	this._fps = parseInt( 1000 / ( timestamp - this._lastTime ) );
	this._lastTime = timestamp;
	
	this.stats();
	
	this._io.emit(NET_REFRESH_WORLD, data);
	setTimeout( this.refresh.bind(this), SERVER_IDLE_TIME );
};

GameServer.prototype.gameOver				= function(player)
{
	this._players.splice( this._players.indexOf( player ), 1);
	
	console.log("disconnected: ", player.entity.name);
	
	if( player.socket.connected == true )
	{
		player.socket.emit(NET_GAME_OVER, null);
	}
	
	player.destroy();
	player = null;
};

GameServer.prototype.init 					= function()
{
	var http 		= require('http');
	var socketio 	= require('socket.io');
	var i 			= NUM_FOOD_START;
	var myfood		= null;
	
	this._sockets	= new Array();
	this._players 	= new Array();
	this._foods		= new Array();
	this._server 	= http.createServer();
	
	this._server.listen(GAME_PORT);  
	this._io = socketio.listen(this._server);
	this._io.sockets.on('connection', this._connectHandler.bind(this) );
	
	
	while( --i > -1 )
	{
		myfood 			= new EntityVO();
		myfood.x 		= ( Math.random() * MAP_WIDTH ) >> 0;
		myfood.y 		= ( Math.random() * MAP_HEIGHT ) >> 0;
		myfood.color 	= '#'+parseInt( Math.random() * 0xFFFFFF ).toString(16);
		myfood.id 		= i;
		
		EntityVO.setMass(myfood,1);
			
		this._foods.push(myfood);
	}
	
	this.refresh();
};

GameServer.prototype._getPlayerById			= function(playerId)
{
	var i = this._players.length;
	while( --i > -1 )
	{
		if( playerId == this._players[i].id )
		{
			return this._players[i];
		}
	}
	
	return null;
};

GameServer.prototype._getFoodById			= function(foodId)
{
	var i = this._foods.length;
	while( --i > -1 )
	{
		if( foodId == this._foods[i].id )
		{
			return this._foods[i];
		}
	}
	
	return null;
};

GameServer.prototype._createHandler			= function(socket, name, color)
{
	var player = new PlayerVO(name,color,socket);
	this._players.push( player );
	
	socket.emit(NET_CREATE_PLAYER	, player.getState());
	
	socket.on(NET_SET_PLAYER_DATA	, this._setDataHandler.bind(this) 			);
	socket.on(NET_COLLIDE_FOOD		, this._collideFoodHandler.bind(this) 		);
	socket.on(NET_COLLIDE_PLAYER	, this._collidePlayerHandler.bind(this) 	);
	
	console.log("new player has been created ! " + player.entity.id, player.id);
};

GameServer.prototype._setDataHandler		= function(playerId,data)
{
	var player = this._getPlayerById(playerId);
	
	if( player == null )
		return;
		
	player.setState(data);
};

GameServer.prototype._collideFoodHandler	= function(playerId, foodId)
{
	var current = null;
	var player 	= this._getPlayerById(playerId);
	var food	= this._getFoodById(foodId);
	
	if( player == null  || food == null)
		return;
	
	food.x = parseInt(Math.random() * MAP_WIDTH);
	food.y = parseInt(Math.random() * MAP_HEIGHT);
	EntityVO.setMass( player.entity, player.entity.mass + parseInt( food.mass ) );
};

GameServer.prototype._collidePlayerHandler	= function(id1, id2)
{
	var playerA = this._getPlayerById(id1);
	var playerB = this._getPlayerById(id2);
	
	if( playerA == null || playerB == null )
		return;
		
	var biggest = ( playerA.entity.mass > playerB.entity.mass ) ? playerA : playerB;
	var smallest = ( playerA == biggest ) ? playerB : playerA;
	
	if( biggest.entity.mass >= smallest.entity.mass * EAT_FACTOR )
	{
		EntityVO.setMass( biggest.entity, biggest.entity.mass + parseInt( smallest.entity.mass ) );
		this.gameOver(smallest);
	}
};

GameServer.prototype._connectHandler 		= function(socket)
{
	socket.once(NET_ASK_PLAYER, this._createHandler.bind(this, socket) );
	this._sockets.push(socket);
};


GameServer.getInstance().init();







function PlayerVO(name,color,socket)
{
	this._init(name,color,socket);
}


PlayerVO.prototype.socket 		= null;
PlayerVO.prototype.time			= 0;
PlayerVO.prototype.entity		= null;
PlayerVO.prototype.id			= 0;

PlayerVO.prototype._init 		= function(name,color,socket)
{
	this.entity 			= new EntityVO();
	this.socket 			= socket;
	
	this.entity.name 		= name;
	this.entity.color 		= color;
	this.entity.x 			= parseInt( Math.random() * MAP_WIDTH );
	this.entity.y 			= parseInt( Math.random() * MAP_HEIGHT );
	this.id					= this.entity.id;
	this.time				= Date.now();
	
	EntityVO.setMass(this.entity, DEFAULT_PLAYER_MASS );
};

PlayerVO.prototype.setState 	= function(data)
{
	this.time	= Date.now();
	EntityVO.setServerState(this.entity, data);
};

PlayerVO.prototype.getState		= function()
{
	return this.entity;
};

PlayerVO.prototype.destroy 		= function()
{
	this.socket.disconnect();
	this.entity = null;
	this.time = 0;
};



