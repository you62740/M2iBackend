


function main()
{
	var container = document.getElementById("container");
	container.addEventListener('mouseover', mouseEventHandler, true );
	container.addEventListener('mouseout', mouseEventHandler, true );
	container.addEventListener('mousedown', mouseEventHandler, true );
	container.addEventListener('mouseup', mouseEventHandler, true );
	
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

function mouseEventHandler(event)
{
	if( event.target === event.currentTarget )
		return;
		
		
	if( event.type == 'mouseover')
	{
		event.target.setAttribute("class", "mouseover");
	}
	else if( event.type == 'mouseout' )
	{
		event.target.setAttribute("class", "myBtn");
	}
	else if( event.type == 'mousedown' )
	{
		event.target.setAttribute("class", "mousedown");
	}
	else if( event.type == 'mouseup' )
	{
		event.target.setAttribute("class", "mouseup");
	}
	
}


window.addEventListener("load", main);
