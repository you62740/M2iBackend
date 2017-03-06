function Tile(p_texture, p_state)
{
	this.texture 			= p_texture || null;
	this.currentState 		= p_state;
}

Tile.prototype.currentState	= null;
Tile.prototype.scaleX		= 1;
Tile.prototype.scaleY		= 1;
Tile.prototype.pivotX		= 0;
Tile.prototype.pivotY		= 0;
Tile.prototype.x			= 0;
Tile.prototype.y			= 0;
Tile.prototype.width		= 50;
Tile.prototype.height		= 50;
Tile.prototype.texture 		= null;
Tile.prototype.rotation		= 0;
Tile.prototype.draw 			= function(context)
{
	
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