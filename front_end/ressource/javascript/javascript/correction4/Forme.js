function Forme(p_obj)
{
	if( p_obj != undefined )
	{
		this.x 		= p_obj.x;
		this.y 		= p_obj.y;
		this.width 	= p_obj.width;
		this.height = p_obj.height;
		this.color 	= p_obj.color;
	}
}


Forme.prototype.x 		= 0;
Forme.prototype.y 		= 0;
Forme.prototype.width 	= 100;
Forme.prototype.height 	= 100;
Forme.prototype.color 	= "black";

Forme.prototype.render 	= function(context){};