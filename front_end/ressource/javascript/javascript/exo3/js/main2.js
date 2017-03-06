


function main()
{
	var container2 = document.getElementById("container2");
	container2.addEventListener('mouseover', mouseEventHandler2, true );
	container2.addEventListener('mouseout', mouseEventHandler2, true );
	
	window.removeEventListener("load", main);
}

function mouseEventHandler2(event)
{
	if( event.target === event.currentTarget )
		return;
		
	if( event.type == 'mouseover')
	{
		event.target.setAttribute("class", "rotation");
	}
	else if( event.type == 'mouseout' )
	{
		event.target.setAttribute("class", "");
	}
}


window.addEventListener("load", main);
