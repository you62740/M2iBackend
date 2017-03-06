

function Application(){}


Application._instance = null;
Application.getInstance = function()
{
	Application._instance = Application._instance || new Application();
	return Application._instance;
};


Application.prototype.init = function(data)
{
	var canvas = document.getElementById("game");
	var stage = Utils.getStage();
	stage.init(canvas);
	stage.debug = true;

	this.notify(START_APPLICATION, data);
};

Application.prototype.startMainLoop = function()
{
	var stage = Utils.getStage();
	stage.addEventListener(tomahawk_ns.Event.ENTER_FRAME, this, this._doMainLoop ); 
};

Application.prototype._doMainLoop = function()
{
	this.notify( PLAYER_LOOP, null );
};


Application.prototype.notify = function(notification, data)
{
	switch( notification )
	{
		case GAME_READY			: this.startMainLoop();									; break;			
		case PLAYER_LOOP		: PlayerLoopCommand.getInstance().execute(data)			; break;
		case START_APPLICATION	: StartApplicationCommand.getInstance().execute(data)	; break;
		case GET_SERVER_DATA	: GetServerDataCommand.getInstance().execute(data)		; break;
		case SEND_DATA			: SendDataCommand.getInstance().execute(data)			; break;
	}
};





function run()
{
	document.getElementById("loginForm").style.display = "none";
	document.getElementById("connectBtn").removeEventListener("click", run);
	
	var data	= new Object();
	data.ip 	= document.getElementById("server_ip").value;
	data.nick 	= document.getElementById("nick").value;
	data.color 	= document.getElementById("color").value;
	
	
	Tomahawk.run(); // runs the engine
	Application.getInstance().init(data);
}

window.onload = function()
{
	document.getElementById("connectBtn").addEventListener("click", run);
};






function GetServerDataCommand(){}

GetServerDataCommand._instance = null;
GetServerDataCommand.getInstance = function()
{
	GetServerDataCommand._instance = GetServerDataCommand._instance || new GetServerDataCommand();
	return GetServerDataCommand._instance;
};


GetServerDataCommand.prototype.execute = function(data)
{
	GameModel.getInstance().players = data.players;
	GameModel.getInstance().food = data.food;
	
	var player = GameModel.getInstance().currentPlayer;
	var i = data.players.length;
	
	while( --i > -1 )
	{
		if( data.players[i].id == player.id )
		{
			EntityVO.setClientState( player, data.players[i] );
			EntityVO.setState( player, data.players[i] );
		}
	}
};



function PlayerLoopCommand(){}

PlayerLoopCommand._instance = null;
PlayerLoopCommand.getInstance = function()
{
	PlayerLoopCommand._instance = PlayerLoopCommand._instance || new PlayerLoopCommand();
	return PlayerLoopCommand._instance;
};


PlayerLoopCommand.prototype.execute = function(data)
{
	var model 	= GameModel.getInstance();
	var stage	= Utils.getStage();
	var player 	= model.currentPlayer;
	var map		= Map.getInstance();
	var wx		= map.camera.x + stage.mouseX;
	var wy		= map.camera.y + stage.mouseY;
	
	model.doCollisions();
	
	
	
	//player.x += parseInt( ( stage.mouseX - player.x ) * 0.1 );
	//player.y += parseInt( ( stage.mouseY - player.y ) * 0.1 );
	player.x += parseInt( ( wx - player.x ) * 0.02 );
	player.y += parseInt( ( wy - player.y ) * 0.02 );
	
	if( player.x < 0 ) 
		player.x = 0;
		
	if( player.y < 0 ) 
		player.y = 0;
		
	if( player.x > MAP_WIDTH) 
		player.x = MAP_WIDTH;
		
	if( player.y > MAP_HEIGHT) 
		player.y = MAP_HEIGHT;

	GameModel.getInstance().sendPlayerState();
};



function StartApplicationCommand(){}

StartApplicationCommand._instance = null;
StartApplicationCommand.getInstance = function()
{
	StartApplicationCommand._instance = StartApplicationCommand._instance || new StartApplicationCommand();
	return StartApplicationCommand._instance;
};


StartApplicationCommand.prototype.execute = function(data)
{
	var stage 	= Utils.getStage();
	var canvas 	= document.getElementById("game");
	var ip		= data.ip;
	var nick	= data.nick;
	var color	= data.color;
	
	stage.addChild( Map.getInstance() ); 	// add a child to the stage
	Map.getInstance().init(canvas);
	
	GameModel.getInstance().init(ip,nick,color);
};



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





function Utils(){}

Utils.getStage = function()
{
	return tomahawk_ns.Stage.getInstance('agar.io');
};



function Map()
{
	tomahawk_ns.Sprite.apply(this);
}

Tomahawk.registerClass( Map, "Map" );
Tomahawk.extend( "Map", "Sprite" );

//static
Map._instance = null;
Map.getInstance = function()
{
	Map._instance = Map._instance || new Map();
	return Map._instance;
};

//public
Map.prototype.camera = null;


Map.prototype.init = function(canvas)
{
	this.camera = new Camera();
};

Map.prototype.draw				= function(context)
{
	var model		= GameModel.getInstance();
	var players 	= model.players;
	var food		= model.food;
	var i 			= 0;
	var current		= null;
	var radius		= 0;
	
	this.camera.update(model.currentPlayer);
	
	
	context.save();
	context.translate( -this.camera.x, -this.camera.y );
	
	i = food.length;
	
	while( --i > -1 )
	{
		current = food[i];
		radius = current.radius;
		context.save();
		context.translate(current.x, current.y);
		context.beginPath();
		context.fillStyle = current.color;
		context.arc( 0, 0, radius, 0, Math.PI * 2 );
		context.fill();
		context.restore();
	}
	
	i = players.length;
	
	while( --i > -1 )
	{
		current = players[i];
		radius 	= current.radius;
		
		context.save();
		context.translate(current.x, current.y);
		context.beginPath();
		context.fillStyle = current.color;
		context.arc( 0, 0, radius, 0, Math.PI * 2 );
		context.fill();
		context.restore();
	}
	
	context.restore();
	
};





function Camera(){}

Camera.prototype.x = 0;
Camera.prototype.y = 0;
Camera.prototype.scale = 1;

Camera.prototype.viewportWidth = 640;
Camera.prototype.viewportHeight = 480;

Camera.prototype.update = function(player)
{
	var centerX		= ( this.viewportWidth >> 1 );
	var centerY		= ( this.viewportHeight >> 1 );
	this.x			= ( player.x - centerX ) >> 0;
	this.y			= ( player.y - centerY ) >> 0;
	this.scale 		= this.getZoom(player.mass);
};

Camera.prototype.getZoom = function(mass)
{
	var t 		= mass;
	var d 		= MAX_MASS;
	var ratio 	= (t==d) ? 1 : (-Math.pow(2, -10 * t/d) + 1);
	var min 	= 1;
	var max 	= MAX_DEZOOM;
	var div 	= min + ( max - min ) * ratio;
	return 1/div;
};

Tomahawk.registerClass( Camera, "Camera" );




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


