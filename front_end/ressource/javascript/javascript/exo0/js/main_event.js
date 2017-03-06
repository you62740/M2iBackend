function rudyHandler(param_event)
{
	console.log("reçu un évenement de type:", param_event.type);
	var madiv = param_event.target;
	madiv.style.backgroundColor = "green";
}

function clickHandler(param_event)
{
	
	if( param_event.target === param_event.currentTarget )
		return;
		
	console.log(param_event);
	console.log("envoie un évenement de type rudy");
	var madiv = param_event.target;
	// type, { bubbles: true|false, cancelable: true|false }
	var rudyEvent = new Event("rudy", {bubbles:true, cancelable:true} );
	madiv.dispatchEvent(rudyEvent);
	
}

function start(param_event)
{
	//document.getElementById("container");
	var container = document.querySelector("#container");
	container.addEventListener("click", clickHandler, true);
	container.addEventListener("rudy", rudyHandler, true );
	
}

window.addEventListener("load", start);

// par rapport à notre définition: A = la fonction start, B = l'objet window