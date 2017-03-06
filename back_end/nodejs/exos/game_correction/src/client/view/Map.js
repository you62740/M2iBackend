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

