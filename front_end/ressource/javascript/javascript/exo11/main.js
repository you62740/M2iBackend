
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

function main()
{	
	/*on fait hériter les deux classes Carre et Cercle de la classe Forme*/
	inherits(Forme, Carre);
	inherits(Forme, Cercle);
	
	/*on recupere les données*/
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
		if( xhr.readyState == 4 && xhr.status == 200 )
		{
			var obj = JSON.parse(xhr.responseText);
			run(obj);
		}
	};
	
	
	xhr.open("GET","data.json", true);
	xhr.send(null);
}


window.addEventListener("load", main);
