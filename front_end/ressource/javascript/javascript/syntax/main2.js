
// renvoyer une copie unique de la fonction pour chaque clé différente envoyée en paramètre
// par exemple: prenons une fonction nommée "test"
// si je demande une copie de la fonction test à l'aide de smartBind
// en utilisan la clé "10" deux fois de suite, j'obtiens une seule et même copie de ma fonction test
// qui partageront une même clé. 

// le pattern utilisé est donc un multiton

Function.prototype.smartBind = function(p_key)
{
	if( Function.__keys__ == undefined )
		Function.__keys__ = new Object();
		
	if( Function.__keys__[p_key] == undefined )
		Function.__keys__[p_key] = this.bind(p_key);
		
	return Function.__keys__[p_key];
};





function Personnage(){}

Personnage.prototype.name = "no_name";

Personnage.prototype.save = function(p_callback)
{
	// appel un webservice distant et rappelle la fonction passée en paramètre lorsque la requete est terminée
	
	var http = new XMLHttpRequest();
	http.addEventListener("readystatechange", p_callback );
	http.open("GET", "ws.php", true );
	http.send();
};


function PersonnageFactory()
{
	this._tab = new Array();
}

PersonnageFactory.prototype._tab = null;
PersonnageFactory.prototype.create = function(p_name)
{
	console.log(this);
	var perso = new Personnage();
	perso.name = p_name;
	perso.save( this.persoSavedHandler.bind(this) );
};

PersonnageFactory.prototype.persoSavedHandler = function(event)
{
	console.log(this);
};

function start()
{
	//var factory = new PersonnageFactory();
	//factory.create("mario");
	window.removeEventListener("load", start.smartBind(this));
}

window.addEventListener("load", start.smartBind(this));

