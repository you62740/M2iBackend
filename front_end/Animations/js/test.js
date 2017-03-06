/*
* Retourne une référence à l'objet canvas crée à l'aide de la balise 
* placée dans le code html
*/
function getCanvas()
{
	return document.getElementById("personnages");
}

function getContext()
{
	return getCanvas().getContext("2d");
}

/* Point d'entrée de l'application */
function init()
{
	var context = getContext();
	var toRadians = Math.PI / 180;
	var startAngle = 0 * toRadians;
	var endAngle = 360 * toRadians;
	var texture = document.getElementById('perso1');	
	
	context.beginPath();
	context.strokeStyle = "#FF0000";
	context.lineWidth = 5;
	context.moveTo( 50, 50 );
	context.lineTo( 150, 200 );
	context.stroke();

	context.beginPath();
	context.fillStyle = "blue";
	context.fillRect( 20, 20, 100, 100 );
	context.fill();

	context.globalAlpha = 0.5;
	context.beginPath();
	context.fillStyle = "green";
	context.moveTo(100,100);
	context.arc(100, 100, 50, startAngle, endAngle, false);
	context.lineTo(100,100);
	context.fill();

	context.globalAlpha = 1;
	context.translate( 47, 72 );
	context.scale( 2, 2 );
	context.rotate( 37 * toRadians );
	context.beginPath();
	context.fillStyle = "red";
	context.fillRect( 0, 0, 100, 100 );
	context.fill();
	
	// context.shadowColor = "#FF0000";
    // context.shadowBlur = 2;
    // context.shadowOffsetX = 20;
    // context.shadowOffsetY = 20;
	
	context.save(); // sauvegarde 1
	context.drawImage(texture,0,0,200,200);
	context.restore();
}



/* 
* Quand toutes les données sont chargées ( DOM, Images, Sons, Vidéos etc ... )
* On démarre l'application par la fonction init
*/
window.onload = init;