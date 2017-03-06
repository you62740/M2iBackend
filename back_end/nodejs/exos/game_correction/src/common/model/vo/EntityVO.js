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
