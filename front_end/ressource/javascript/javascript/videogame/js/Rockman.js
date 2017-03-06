function Rockman(p_texture, p_states)
{
	this.texture = p_texture 	|| null;
	this.states 				= p_states;
	this.currentState 			= this.states.normal;
}

Rockman.prototype.jumpPower		= 0;
Rockman.prototype.states		= null;
Rockman.prototype.currentState	= null;
Rockman.prototype.scaleX		= 1;
Rockman.prototype.scaleY		= 1;
Rockman.prototype.pivotX		= 0;
Rockman.prototype.pivotY		= 0;
Rockman.prototype.x				= 0;
Rockman.prototype.y				= 0;
Rockman.prototype.width			= 50;
Rockman.prototype.height		= 50;
Rockman.prototype.texture 		= null;
Rockman.prototype.rotation		= 0;
Rockman.prototype.speed			= 3;

Rockman.prototype.direction		= -1;

Rockman.prototype.move			= function(keyCode)
{
	if( keyCode == 32 )
	{
		this.jumpPower = 20;
	}
	else
	{
		this.direction = keyCode;
	}
};

Rockman.prototype.stop			= function(keyCode)
{
	if( keyCode == 39 || keyCode == 37 )
		this.direction = -1;
};

Rockman.prototype.draw 			= function(context)
{
	
	this.y 			-= this.jumpPower;
	this.jumpPower 	= parseInt( this.jumpPower * 0.9 );
	
	if( this.direction == 39 )
	{
		this.x += this.speed;
	}
	else if( this.direction == 37 )
	{
		this.x -= this.speed;
	}
	
	
	this.width 		= this.currentState.width;
	this.height 	= this.currentState.height;
	
	this.pivotX		= this.width >> 1;
	this.pivotY		= this.height >> 1;
	
	context.save();
	context.translate(this.x + this.pivotX, this.y + this.pivotY);
	context.scale(this.scaleX, this.scaleY);
	context.rotate((this.rotation % 360) * (Math.PI / 180) );
	context.translate(-this.pivotX, -this.pivotY);
	
	context.drawImage(	this.texture, 
						this.currentState.x, 
						this.currentState.y, 
						this.currentState.width, 
						this.currentState.height, 
						0, 
						0, 
						this.width, 
						this.height 
	);
	context.restore();
};