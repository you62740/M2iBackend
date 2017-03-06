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



