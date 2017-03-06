/**
 * ...
 * @author the tiny spark
 */

function ApplicationModel(username)
{
	this.username 	= username;
	this._cars 		= new Array();
}

ApplicationModel.NAME 				= "appModel";

ApplicationModel.prototype.username = null;
ApplicationModel.prototype._cars 	= null;


ApplicationModel.prototype.removeCar = function(vo)
{
	var index = this._cars.indexOf(vo);
	
	if( index == -1 )
		return;
		
	this._cars.splice(index,1);
};

ApplicationModel.prototype.getCarVOById = function(id)
{
	var i = this._cars.length;
	while( --i > -1 )
	{
		if( this._cars[i].id === id )
			return this._cars[i];
	}
	
	return null;
};

ApplicationModel.prototype.addCar = function(vo)
{
	this._cars.push(vo);
};

ApplicationModel.prototype.getCars = function()
{
	return this._cars;
};

