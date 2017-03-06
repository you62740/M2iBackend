var tab = new Array();

Function.prototype.smartBind = function(scope, destroy)
{	
	var obj = new Object();
	var copy = null;
	
	destroy = ( destroy === true );
	
	if( this.__bindings__ == undefined )
	{
		this.__bindings__ = new Object();
	}
	
	if( this.__bindings__[scope] == undefined )
	{
		this.__bindings__[scope] = this.bind(scope);
	}
	
	copy = this.__bindings__[scope];
	
	if( destroy == true )
	{
		delete this.__bindings__[scope];
	}
	
	return copy;
};





function stressA()
{
	console.log("stress");
	//var i = 100000;
	//while( --i > -1 )
	//{
		//tab.push(new Object());
	//}
}


var toto = new Object();
toto.stress = stressA;


function main()
{
	console.log(this);
	this.stress();
	
	window.removeEventListener("load", main);
	var i = 1000;
	
	while( --i > -1 )
	{
		tab.push(new Object());
	}
}


window.addEventListener("load", main.bind(toto));
