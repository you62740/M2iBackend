/**
 * ...
 * @author the tiny spark
 */


function Facade()
{
	this._controllers 	= new Object();
	this._models 		= new Object();
	this._views 		= new Object();
}

Facade._instance = null;
Facade.getInstance = function()
{
	Facade._instance = Facade._instance || new Facade();
	return Facade._instance;
};



Facade.prototype._controllers 	= null;
Facade.prototype._models 		= null;
Facade.prototype._views 		= null;


Facade.prototype.registerController = function(controllerClass, type)
{
	this._controllers[type] = controllerClass;
};

Facade.prototype.registerModel = function(instance, name)
{
	this._models[name] = instance;
};

Facade.prototype.registerView = function(instance, name)
{
	this._views[name] = instance;
};


Facade.prototype.getView = function(name)
{
	return this._views[name] || null;
};

Facade.prototype.getModel = function(name)
{
	return this._models[name] || null;
};

Facade.prototype.notify = function(type, data)
{
	var controllerClass = this._controllers[type] || null;
	
	if( controllerClass == null )
		return;
		
	new controllerClass(data);
};




