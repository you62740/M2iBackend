function GameModel(){}


GameModel._instance 						= null;
GameModel.getInstance 						= function()
{
	GameModel._instance = GameModel._instance || new GameModel();
	return GameModel._instance;
};

GameModel.prototype.food 					= null;
GameModel.prototype.players 				= null;
GameModel.prototype.currentPlayer 			= null;
GameModel.prototype._socket 				= null;
GameModel.prototype._serverIP 				= null;

GameModel.prototype.init 					= function(serverIP, name, color )
{
	this.food					= new Array();
	this.players				= new Array();
	this.currentPlayer 			= new EntityVO();
	
	this._socket 				= io.connect(serverIP+':'+GAME_PORT);
	
	this._socket.on(NET_REFRESH_WORLD, this._getDataHandler.bind(this) );
	this._socket.once(NET_GAME_OVER, this._gameOverHandler.bind(this) );
	this._socket.once(NET_CREATE_PLAYER, this._getPlayerHandler.bind(this) );
	this._socket.emit(NET_ASK_PLAYER, name, color);
};

GameModel.prototype._gameOverHandler		= function(data)
{
	
	console.log("perdu !");
	window.close();
	//window.location.reload();
};

GameModel.prototype._getPlayerHandler		= function(data)
{
	EntityVO.setState( this.currentPlayer, data );
	Application.getInstance().notify( GAME_READY, null );
};

GameModel.prototype.sendPlayerState 		= function()
{
	this._socket.emit(NET_SET_PLAYER_DATA, this.currentPlayer.id, this.currentPlayer);
};

GameModel.prototype._getDataHandler 		= function(data)
{
	Application.getInstance().notify( GET_SERVER_DATA, data);
};

GameModel.prototype.doCollisions 			= function()
{
	var entities	= this.food;
	var distX 		= 0;
	var distY 		= 0;
	var dist		= 0;
	var currentX 	= this.currentPlayer.x;
	var currentY 	= this.currentPlayer.y;
	var dist 		= 0;
	var i 			= entities.length;
	var entity 		= null;
	
	while( --i > -1 )
	{
		entity = entities[i];
		
		distX = ( entity.x - currentX ) * ( entity.x - currentX );
		distY = ( entity.y - currentY ) * ( entity.y - currentY );
		
		dist = Math.sqrt( distX + distY );
		
		if( dist <= this.currentPlayer.radius )
		{
			this._socket.emit(NET_COLLIDE_FOOD, this.currentPlayer.id, entity.id);
		}
	}
	
	
	entities 		= this.players;
	i				= entities.length;
	
	while( --i > -1 )
	{
		entity = entities[i];
		
		if( entity.id == this.currentPlayer.id )
			continue;
		
		distX = ( entity.x - currentX ) * ( entity.x - currentX );
		distY = ( entity.y - currentY ) * ( entity.y - currentY );
		
		dist = Math.sqrt( distX + distY );
		
		if( dist <= this.currentPlayer.radius )
		{
			this._socket.emit(NET_COLLIDE_PLAYER, this.currentPlayer.id, entity.id);
		}
	}
};

