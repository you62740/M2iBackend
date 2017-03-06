/**
 * ...
 * @author the tiny spark
 */

function Map()
{
	this.heroes = new Array();
	this.tiles = new Array();
	
	this._initKeyboard();
}

Map._instance = null;

Map.getInstance = function()
{
	if( Map._instance == null )
	{
		Map._instance = new Map();
	}
	
	return Map._instance;
};


Map.prototype._initKeyboard = function()
{
	window.addEventListener("keyup", this._keyHandler.bind(this));
	window.addEventListener("keydown", this._keyHandler.bind(this));
};

Map.prototype._keyHandler	= function(event)
{
	if( this.heroes.length == 0 )
		return;
		
	if( event.type == "keyup" )
	{
		this.heroes[0].stop(event.keyCode);
	}
	else
	{
		this.heroes[0].move(event.keyCode);
	}
};

Map.prototype.background	= null;
Map.prototype.heroes 		= null;
Map.prototype.tiles 		= null;
Map.prototype.draw 			= function(canvas, context)
{
	var current = null;
	var max = this.tiles.length;
	var i = 0;
	
	context.drawImage(this.background, 0, 0);
	
	
	for( i = 0; i < max; i++ )
	{
		current = this.tiles[i];
		current.draw(context);
	}
	
	
	max = this.heroes.length;
	
	for( i = 0; i < max; i++ )
	{
		current = this.heroes[i];
		current.draw(context);
		
		if( current.y < ( canvas.height - current.height ) )
		{
			current.y += 3;
		}
	}
};

