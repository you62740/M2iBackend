function PlayerVO(name,color,socket)
{
	this._init(name,color,socket);
}


PlayerVO.prototype.socket 		= null;
PlayerVO.prototype.time			= 0;
PlayerVO.prototype.entity		= null;
PlayerVO.prototype.id			= 0;

PlayerVO.prototype._init 		= function(name,color,socket)
{
	this.entity 			= new EntityVO();
	this.socket 			= socket;
	
	this.entity.name 		= name;
	this.entity.color 		= color;
	this.entity.x 			= parseInt( Math.random() * MAP_WIDTH );
	this.entity.y 			= parseInt( Math.random() * MAP_HEIGHT );
	this.id					= this.entity.id;
	this.time				= Date.now();
	
	EntityVO.setMass(this.entity, DEFAULT_PLAYER_MASS );
};

PlayerVO.prototype.setState 	= function(data)
{
	this.time	= Date.now();
	EntityVO.setServerState(this.entity, data);
};

PlayerVO.prototype.getState		= function()
{
	return this.entity;
};

PlayerVO.prototype.destroy 		= function()
{
	this.socket.disconnect();
	this.entity = null;
	this.time = 0;
};

