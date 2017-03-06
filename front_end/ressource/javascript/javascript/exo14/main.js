
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
	/*on fait hériter les deux classes Carre et Cercle de la classe Forme*/
	inherits(Forme, Carre);
	inherits(Forme, Cercle);
	inherits(EventManager, Personnage);
	inherits(EventManager ,DataLoader);
	
	
	//Personnage.getInstance("E.R").name = "emmanuel";
	//Personnage.getInstance("E.R").age = 32;
	//
	//Personnage.getInstance("E.R").ecouterEvenement("coucou", coucouHandler);
	//Personnage.getInstance("E.R").detruireEcouteur("coucou", coucouHandler);
	//Personnage.getInstance("E.R").envoyerEvenement("coucou", {"toto":"titi"} );
	

	DataLoader.getInstance().ecouterEvenement("success",ShapeRenderer.getInstance().draw);
	DataLoader.getInstance().ecouterEvenement("error",zut);
	DataLoader.getInstance().load("data.json");
}


window.addEventListener("load", main);
