function ShapeRenderer(){}

ShapeRenderer._instance = null;
ShapeRenderer.getInstance = function()
{
	if( ShapeRenderer._instance == null )
		ShapeRenderer._instance = new ShapeRenderer();
		
	return ShapeRenderer._instance;
};

ShapeRenderer.prototype.draw = function(obj)
{
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	var table = obj["data"];
	var i = table.length;
	var current = null;
	
	while( --i > -1 )
	{
		current = table[i];
		
		if( current["type"] == "cercle" )
		{
			var instance = new Cercle(current);
			instance.render(context);
		}
		else
		{
			var instance = new Carre(current);
			instance.render(context);
		}
	}
};

