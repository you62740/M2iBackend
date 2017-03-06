function CarVO()
{
	this.id = CarVO._counter++;
}

CarVO._counter = 0;

CarVO.prototype.id		= 0;
CarVO.prototype.name 	= null;
CarVO.prototype.img 	= null;
CarVO.prototype.desc 	= null;
CarVO.prototype.price 	= 0;

