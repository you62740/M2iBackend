const JSON_URL = "./data/data.json";

function getCanvas()
{
	return document.getElementById("personnages");
}

function getContext()
{
	return getCanvas().getContext("2d");
}

function start(param_event)
{
	var ma_requete = $.ajax(JSON_URL, "GET");
	ma_requete.done(init);
	ma_requete.fail(error);
}

function error(data)
{
	alert('erreur');
}


function drawCurrentState(anim, states, step, img, context, interval)
{
	var currentState = null;
	var x = 0 ;
	var y = 0 ;
	
	if( step >= anim.length )
		step = 0 ;
	
	currentState = anim[step] ;
	x = states[currentState].x ;
	y = states[currentState].y ;
	
	context.clearRect(0, 0, 32, 32) ;
	context.drawImage(img, x, y, 32, 32, 0, 0, 32, 32) ;
	
	setTimeout(
				drawCurrentState.bind(this, anim, states, step + 1, img, context, interval), 
				interval 
	); 
}

function animation (context, img, data, move)
{
	var anim = null;
	
	var noMove = data.state;
	context.drawImage(img, data.states[noMove].x, data.states[noMove].y, 32, 32, 0, 0, 32, 32);
	
	switch(move)
	{
		case "bottom":
			anim = data.animations.walk_bottom;
			break;
		case "left":
			anim = data.animations.walk_left;
			break;
		case "right":
			anim = data.animations.walk_right;
			break;
		case "up":
			anim = data.animations.walk_up;
			break;
	}
	
	drawCurrentState(anim, data.states, 0, img, context, 50);
}

/* Point d'entrée de l'application */
function init(data)
{
	var perso = data.characters[0];
	var img = new Image();
	var context = getContext();
	
	img.src = perso.img; // Définit le chemin vers sa source
	
	img.onload = function()
	{
		animation(context, img, perso, "bottom");
	}	
}

window.onload = start;