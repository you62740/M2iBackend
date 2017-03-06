

function getData(url, successHandler, errorHandler)
{
	var http = new XMLHttpRequest();
	var url = url;
	http.open("GET", url, true);
	
	http.onreadystatechange = function() 
	{		
		if(http.readyState == 4 ) 
		{
			if( http.status == 200 )
			{
				successHandler( JSON.parse(http.responseText) );
			}
			else
			{
				errorHandler();
			}
		}
	}
	
	http.send(null);
}

function main()
{	
	getData('data.json', drawForms, drawError );
}


function drawRectangle(context, x,y,width,height,color, rotation)
{
	var toRadians = Math.PI / 180;
	
	context.save();
	context.beginPath();
	
	context.translate(x,y);
	context.rotate(rotation*toRadians);
	context.fillStyle = color;
	context.fillRect(0,0,width, height);
	context.fill();
	
	context.closePath();
	context.restore();
}

function drawForms(data)
{
	var canvas = document.getElementById("app");
	var context = canvas.getContext("2d");
	var i = data.data.length;
	var current = null;
	
	while( --i > -1 )
	{
		current = data.data[i];
		drawRectangle(	context, 
						current.x, 
						current.y, 
						current.width, 
						current.height, 
						current.color,
						current.rot);
	}
}

function drawError()
{
	var canvas = document.getElementById("app");
	var context = canvas.getContext("2d");
	
	context.save();
	context.font = "20pt Arial";
	context.fillText("error",100,100);
	context.fill();
	context.restore();
}



window.addEventListener("load", main);
