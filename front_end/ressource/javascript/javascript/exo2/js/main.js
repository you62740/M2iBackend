
function btnHandler(event)
{
	text.value = "le bouton a été cliqué";
}

function clickHandler(event)
{
	//console.log(event.currentTarget); // celui sur lequel on a placé l'écouteur
	//console.log(event.target); // le vrai objet|element html à l'origine de l'évenement, peut être soit le currentTarget ou un de ses descendants si on a défini le useCapture=true
	//var element = event.target;
	//console.log(element);
	
	var evt = new Event('toto');
	evt.bubbles = true;
	evt.cancelable = true;
	window.dispatchEvent(evt);
}

function totoHandler(event)
{
	console.log(event.type);
	window.removeEventListener('toto', totoHandler, true );
}

function main()
{
	var carre = document.getElementById('carre');
	var btn = document.getElementById('btn');
	var text = document.getElementById('google');

	btn.addEventListener('click', btnHandler );
	carre.addEventListener('click', clickHandler, true );
	
	
	
	window.addEventListener('toto', totoHandler, true );
	
	//dispatchEvent
	//removeEventListener
	// toto
}

//window.onload = main;
window.addEventListener("load",main);








