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
