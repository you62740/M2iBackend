/*polyfills*/

Function.prototype.smartBind = function(scope)
{	
	var obj = new Object();
	
	if( this.__bindings__ == undefined )
	{
		this.__bindings__ = new Object();
	}
	
	if( this.__bindings__[scope] == undefined )
	{
		this.__bindings__[scope] = this.bind(scope);
	}
	
	return this.__bindings__[scope];
};




/**/
const START_APP 	= "start_app";
const DISPLAY_CARS 	= "display_cars";
const ADD_CAR 		= "add_car";
const REMOVE_CAR 	= "remove_car";



function inherits(parentClass, childClass)
{
	var instance1 = new parentClass();
	var instance2 = new childClass();
	var obj = new Object();
	
	for( var prop in instance1 )
	{
		obj[prop] = instance1[prop];
	}
	
	for( var prop in instance2 )
	{
		obj[prop] = instance2[prop];
	}
	
	childClass.prototype = obj;
}

function main()
{	
	//inherits();
	
	Facade.getInstance().registerController(StartApplicationController	, START_APP);
	Facade.getInstance().registerController(DisplayCarsController		, DISPLAY_CARS);
	Facade.getInstance().registerController(AddCarController			, ADD_CAR);
	Facade.getInstance().registerController(RemoveCarController			, REMOVE_CAR);
	
	Facade.getInstance().notify(START_APP, {"toto":"titi"} );
}


window.addEventListener("load", main);
