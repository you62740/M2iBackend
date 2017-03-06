    
function onReady() 
{
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "./php/products.json", true);
	xhr.addEventListener( 'readystatechange', onStateChange );
	xhr.send();
}

function onStateChange(event)
{
	var xhr = event.target;
	
	if( xhr.status == 200 && xhr.readyState == 4 )
	{
		onData( JSON.parse(xhr.responseText) );
	}
}

function onData(data)
{
	var container 	= document.getElementById("container");
	var html 		= "";
	var i 			= 0;
	var max 		= data.length;
	
	for( i = 0; i < max; i++ )
	{
		html += "<div><p>"+data[i].nom+" <img width='200' src='"+data[i].img+"' /></p></div>";
	}
	
	container.innerHTML = html;
}

document.addEventListener('deviceready', onReady, false);