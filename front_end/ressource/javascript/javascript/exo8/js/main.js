
function drawVecto(context)
{
	context.save(); // sauvegarde le contexte de dessin avant de dessiner mes formes géométriques
	// c1
	
	context.beginPath();
	context.fillStyle = "#ff0000";
	context.fillRect(0,0,100,100);
	context.fill();
	context.closePath();
	
	context.beginPath();
	context.strokeStyle = "green";
	context.lineWidth = 5;
	context.moveTo(60,180);
	context.lineTo(450,90);
	context.stroke();
	context.closePath();
	
	context.restore(); // restaure le contexte c1
}

function drawIronMan(context)
{
	var img = document.getElementById("iron");
	var toRadians = Math.PI / 180;
	
	context.save(); // sauvegarde le contexte de dessin à un instant t
	
	context.translate(125, 25);
	context.rotate( 37 * toRadians );
	context.scale(3,3);
	
	context.drawImage(	img, 
						200, 
						0, 
						200, 
						100, 
						
						0, 
						0, 
						50, 
						50  );
	
	//context.drawImage(img, srcx, srcy, srcw, srch, dstx, dsty, dstw, dsth  );
	
	context.restore(); // dépiler et restaurer le dernier contexte sauvegardé
}

function main()
{	
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	
	//drawVecto(context);
	drawIronMan(context);
}


window.addEventListener("load", main);
