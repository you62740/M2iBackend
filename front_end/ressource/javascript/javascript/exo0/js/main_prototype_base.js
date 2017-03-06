function Vehicule(){}

Vehicule.prototype.price = 0;
Vehicule.prototype.name = "no_name";




function Voiture(){}


Voiture.prototype.start = function()
{
	console.log("vroum");
};

/* 

	1 - javascript va détecter quelle est la fonction utilisée
    2 - javascript va chercher le prototype de cet objet/function
	3 - javascript va créer un objet vide
	4 - javascript va créer des copies de toutes les propriétés du prototype
   et les coller sur notre objet vide
	5 - javascript va retourner l'objet ainsi crée.
	
	Nota Bene: dans notre exemple ci-dessous, cet objet crée
	à partir du prototype de Voiture sera renvoyé dans la variable
	"ma_voiture".
  */
  
 
var ma_voiture = new Voiture();

//ma_voiture.start();

/*
	on fait l'héritage "à la main"
*/

var mon_objet = new Object();
var prop = null;

for( prop in Vehicule.prototype )
{
	// on copie la valeur de la propriété Vehicule.prototype[prop]
	// Nota bene: dans notre exemple, on crée au premier tour de boucle
	// une propriété "price" sur l'objet mon_objet, puis on lui attribue
	// la valeur stockée sur Vehicule.prototype.price à l'aide de Vehicule.prototype[prop]
	
	// en gros on réalise une copie parfaite du prototype de la fonction Vehicule
	mon_objet[prop] = Vehicule.prototype[prop];
}

// on ajoute maintenant les comportements de la "classe" enfant
for( prop in Voiture.prototype )
{
	// on copie la valeur de la propriété Voiture.prototype[prop]
	// Nota bene: dans notre exemple, on crée au premier tour de boucle
	// une propriété "price" sur l'objet mon_objet, puis on lui attribue
	// la valeur stockée sur Voiture.prototype.price à l'aide de Voiture.prototype[prop]
	
	// en gros on réalise une copie parfaite du prototype de la fonction Voiture
	mon_objet[prop] = Voiture.prototype[prop];
}

Voiture.prototype = mon_objet;


var ma_voiture2 = new Voiture();

console.log(ma_voiture2);






