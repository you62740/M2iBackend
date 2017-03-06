function Actor(obj)
{
	this.img			= obj.img;
	this._frameTime		= parseInt(obj.frameTime);
	this._elem			= document.createElement("div");
	this._states		= obj.states;
	this._animations	= obj.animations;
	this._anim 			= this._animations[obj.anim];
	this.currentState 	= this._anim[1];
}

Actor.prototype.currentState 	= null;
Actor.prototype.img 			= null;
Actor.prototype.x 				= 0;
Actor.prototype.y 				= 0;
Actor.prototype.width 			= 1;
Actor.prototype.height 			= 1;
Actor.prototype._anim 			= null;
Actor.prototype._animations 	= null;
Actor.prototype._states 		= null;
Actor.prototype._elem 			= null;
Actor.prototype._frame 			= 0;
Actor.prototype._frameTime 		= 0;
Actor.prototype._time 			= 0;

Actor.prototype.getHTMLNode 	= function()
{
	return this._elem;
};

Actor.prototype._getStateInfo 	= function()
{
	if( this.currentState == null || 
		this._states[this.currentState] == undefined 
	)
	{
		return null;
	}
	
	return this._states[this.currentState];
};

Actor.prototype.draw			= function()
{
	var time	= new Date().getTime();
	var state 	= this._getStateInfo();
	var decalX 	= 0;
	var decalY 	= 0;
	var width 	= 0;
	var height 	= 0;
	var node	= this.getHTMLNode();
    
	if( time - this._time > this._frameTime )
	{

		this._frame++;
		
		if( this._frame >= this._anim.length )
		{
			this._frame = 0;
		}
		
		this.currentState = this._anim[this._frame];
		
		this._time = time;
	}
	
	if( state != null )
	{
		decalX 	= -state.x;
		decalY 	= -state.y;
		width	= state.width;
		height	= state.height;
	}
		
	node.style.zIndex 				= 50;
	node.style.width 				= width + 'px';
	node.style.height 				= height + 'px';
	node.style.position				= "absolute";
	node.style.top					= this.y + 'px';
	node.style.left					= this.x + 'px';
	node.style.backgroundImage 		= "url('" + this.img + "')";
	node.style.backgroundPosition 	= decalX + "px " + decalY + "px";
};

Actor.prototype.moveLeft 		= function(param_value)
{
	this._anim = this._animations["walk_left"];
	this.x -= param_value;
	this.draw();
};

Actor.prototype.moveRight 		= function(param_value)
{
	this._anim = this._animations["walk_right"];
	this.x += param_value;
	this.draw();
};

Actor.prototype.moveBottom 		= function(param_value)
{
	this._anim = this._animations["walk_bottom"];
	this.y += param_value;
	this.draw();
};

Actor.prototype.moveTop 		= function(param_value)
{
	this._anim = this._animations["walk_up"];
	this.y -= param_value;
	this.draw();
};
