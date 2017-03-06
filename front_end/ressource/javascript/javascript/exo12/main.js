
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

function run(obj)
{
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	var table = obj["data"];
	var i = table.length;
	var current = null;
	
	while( --i > -1 )
	{
		current = table[i];
		
		if( current["type"] == "cercle" )
		{
			var instance = new Cercle(current);
			instance.render(context);
		}
		else
		{
			var instance = new Carre(current);
			instance.render(context);
		}
	}
}

function zut()
{
	alert("zut");
}

function main()
{	
	/*on fait hériter les deux classes Carre et Cercle de la classe Forme*/
	inherits(Forme, Carre);
	inherits(Forme, Cercle);
	
	DataLoader.getInstance().load("data.json", run, zut);
}


window.addEventListener("load", main);
