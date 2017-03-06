// ES5
"use strict";

function readyStateHandler(param_event)
{
	var requete = param_event.target;
	
	//la requete est terminée et les données sont prêtes à être exploitées
	if( requete.readyState == 4 && requete.status == 200 )
	{
		// on récupère les données sous forme de texte
		var donnees = requete.responseText;
		var obj = JSON.parse(donnees);
		
		console.log(obj);
	}
}

var requete = new XMLHttpRequest();

// à chaque fois que l'on précise un écouteur d'évenement
// la fonction de callback recevra toujours un paramètre envoyé
// par l'objet qui éxécute le callback, cet objet correspond
// à l'évenement capturé.
requete.addEventListener("readystatechange", readyStateHandler);
requete.open("GET", "js/data.php", true);
requete.send();
