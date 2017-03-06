
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

function zut()
{
	alert("zut");
}

function main()
{	
	/*
	on fait hériter les deux classes Carre et Cercle de la classe Forme
	*/
	inherits(Forme, Carre);
	inherits(Forme, Cercle);
	
	
	DataLoader.getInstance().load("data.json", ShapeRenderer.getInstance().draw, zut);
}


window.addEventListener("load", main);
