// Heritage 

const JSON_URL = "data/data.json";
const moveSpeed = 1;
const timeSpeed = 5;

const CASE_WIDTH = 48;
const CASE_HEIGHT = 48;

var control = null;
var farm 	= null;
var perso 	= null;
var mapArrow = null;
var mapContainer = null;

function faireHeriter(parentClass, childClass)
{
	var obj = new Object();
	var prop = null;
	
	for( prop in parentClass.prototype ){
		obj[prop] = parentClass.prototype[prop];
	}
	
	for( prop in childClass.prototype ){
		obj[prop] = childClass.prototype[prop];
	}
	
	childClass.prototype = obj;
}

function getCharacterInfoByType( param_type, param_data )
{
	var i 		= 0;
	var max 	= param_data.length;
	var current = null;
	
	for( i = 0; i < max; i++ )
	{
		current = param_data[i];
		
		if( current.type == param_type )
		{
			return current;
		}
	}
	
	return null;
}

function mouseDown(event)
{
	event.preventDefault();
	
	switch(event.target.id)
		{
			case "img_gauche":
				control.moveLeft();
				break;
			case "img_haut":
				control.moveTop();
				break;
			case "img_droite":
				control.moveRight();
				break;
			case "img_bas":
				control.moveBottom();
				break;
		}
}

function mouseOutHandler(event)
{
	// switch(event.target.id) eZam : Why ?
	// {
		// case "img_gauche":
			// control.stop();
			// break;		
		// case "img_haut":
			// control.stop();
			// break;		
		// case "img_droite":
			// control.stop();
			// break;		
		// case "img_bas":
			// control.stop();
			// break;
	// }
	control.stop();
}

function mouseUp(event)
{
	control.stop();
}

function gameFail()
{
	alert("map fail !");
}

function gameReady(data)
{
	mapArrow = document.getElementById("arrowContainer");
	mapContainer = document.getElementById("map");
    
	farm 	= new Map(20, 15, mapContainer);
	farm.generate(data.map);
	
	perso = new Personnage( getCharacterInfoByType("_warrior_", data.characters) );
	perso.width = CASE_WIDTH;
	perso.height = CASE_HEIGHT;
	
	farm.addPersonnage( perso );
	control = new Controller (moveSpeed, timeSpeed,0, farm, perso);
	
	perso.x = 1 * CASE_WIDTH;
	perso.y = 1 * CASE_HEIGHT;
	perso.draw();
	
	mapArrow.addEventListener("mousedown", mouseDown);
	mapArrow.addEventListener("mouseup", mouseUp);
	mapArrow.addEventListener("mouseout", mouseOutHandler);
}

function start(param_event)
{	
	faireHeriter(Actor, PNJ);
	faireHeriter(Actor, Personnage);
	faireHeriter(Personnage, Warrior);
	faireHeriter(Personnage, Wizard);
	faireHeriter(Item, MagicWand);
	faireHeriter(Item, Weapon);
	
	$.ajax(
	{
		type: 		"GET",
		dataType: 	"json",
	  	url: 		"data/data.json"
	}
	).done( gameReady )
	.fail( gameFail );
}

window.addEventListener("load", start);
