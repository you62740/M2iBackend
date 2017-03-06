
function finishedHandler(event)
{
	alert("finished");
	window.removeEventListener('finished', finishedHandler, true );
}

function clickHandler(event)
{
	var step1Btn 		= document.getElementById("step1");
	var step2Btn 		= document.getElementById("step2");
	var currentBtn 		= event.target;
	var evt				= null;
	
	currentBtn.azerty 	= true;
	currentBtn.disabled	= "disabled";
	
	if( step1Btn.azerty == true && step2Btn.azerty == true )
	{
		evt 			= new Event("finished");
		evt.bubbles 	= true;
		evt.cancelable 	= true;
		
		window.dispatchEvent(evt);
	}
}

function main()
{
	var step1Btn = document.getElementById("step1");
	var step2Btn = document.getElementById("step2");

	step1Btn.addEventListener('click', clickHandler );
	step2Btn.addEventListener('click', clickHandler );
}

window.addEventListener('finished', finishedHandler, true );
window.addEventListener("load",main);








