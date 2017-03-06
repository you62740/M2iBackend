//function start()
//{
	//alert("start 1");
//}
//
//
//window.app = function()
//{
	//alert("start 2");
//};
//
//var start = function()
//{
	//alert("start 2");
//};
//
//var toto;
//
//console.log(toto); // = undefined
//console.log(null === undefined);



function inherits( p_ancestor_class, p_child_class )
{
	var obj 	= new Object();
	var prop 	= null;
	
	// on doit créer une copie parfaite du prototype de la classe parente
	// on doit boucler à travers les propriétés du prototype de l'ancêtre, le prototype étant un objet classique
	// ce que l'on veut c'est hériter des comportements définis dans le prototype du parent
	
	for( prop in p_ancestor_class.prototype )
	{
		obj[prop] = p_ancestor_class.prototype[prop];
	}
	
	// arrivé à ce stade, nous avons une copie conforme du prototype de la classe parente
	// il nous reste à l'enrichir avec les méthodes et propriétés du prototype de l'enfant
	
	for( prop in p_child_class.prototype )
	{
		console.log(prop);
		obj[prop] = p_child_class.prototype[prop];
	}
	
	p_child_class.prototype = obj;
}


function Personnage(p_name, p_strength, p_mana, p_life)
{
	this.name 		= p_name 		|| "Donkey Kong";
	this.strength 	= p_strength 	|| 200;
	this.mana 		= p_mana 		|| 200;
	this.life 		= p_life 		|| 100;
}

Personnage.prototype.name 		= "Donkey Kong";
Personnage.prototype.strength 	= 200;
Personnage.prototype.mana 		= 200;
Personnage.prototype.life 		= 100;


Personnage.prototype.attack		= function(p_target)
{
	p_target.life -= parseInt(this.strength / 10);
	
	this._myPrivateMethod();
};


Personnage.prototype._myPrivateMethod = function()
{
	console.log("invoke a private method");
};






function Voiture(p_marque, p_price, p_color)
{
	this.marque = p_marque || "Mercedes";
	this.price 	= p_price || 20000;
	this.color 	= p_color || "grey";
}

Voiture.prototype.marque 		= "Mercedes";
Voiture.prototype.price 		= 20000;
Voiture.prototype.color 		= "grey";
Voiture.prototype._compteur		= 0;
Voiture.prototype._started		= false;

Voiture.prototype.startEngine 	= function()
{
	this._started = true;
};

Voiture.prototype.stopEngine 	= function()
{
	this._started = false;
};

Voiture.prototype.ride		 	= function(p_km)
{
	if( this._started == false )
		return;
		
	this._compteur += p_km;
};

Voiture.prototype.getCompteur 	= function()
{
	return this._compteur;
};






function Kart()
{
	Voiture.apply(this, ["mario bros motors", 10000, "red"] );
}


Kart._instance					= null;
Kart.getInstance				= function()
{
	Kart._instance = Kart._instance || new Kart();
	return Kart._instance;
};


Kart.prototype.ride				= function(p_km)
{
	console.log("youhouuuu !!");
	
	Voiture.prototype.ride.apply(this, [p_km]);
};


inherits( Voiture, Kart );




function start()
{
	var mario 		= new Personnage("mario");
	var wario 		= new Personnage("wario");
	
	Kart.getInstance().startEngine();
	Kart.getInstance().ride(100);
	Kart.getInstance().stopEngine();
	console.log(Kart.getInstance().getCompteur());
	
	Kart.getInstance().ride(100);
	console.log(Kart.getInstance().getCompteur());
	
	//mario.attack(wario);
	//console.log(wario.life);
	
	//mario.attack(wario);
	//console.log(wario.life);
	
	
	
	//mario._myPrivateMethod(); // interdit !!!!! on ne respecte pas la convention de nommage
	
	window.removeEventListener("load", start);
}

window.addEventListener("load", start);

