
function faireHeriter(parentClass,childClass)
{
	var obj = new Object();
	var prop = null;
	
	for( prop in parentClass.prototype )
	{
		obj[prop] = parentClass.prototype[prop];
	}
	
	for( prop in childClass.prototype )
	{
		obj[prop] = childClass.prototype[prop];
	}
	
	childClass.prototype = obj;
}


function main()
{	
	faireHeriter(Vehicule, Voiture);
	faireHeriter(Voiture, Ferrari);
	
	var ferrari = new Ferrari("vraouuuuummm");
	ferrari.makeNoise();
}


window.addEventListener("load", main);
