

function main()
{
	var element = document.getElementById("container");
	element.addEventListener("dragover", dropHandler);
	element.addEventListener("drop", dropHandler); 
	// on écoute les événements drop et dragover qui sont envoyés par l'élement html dont l'id est container
}

// fonction éxécutée lorsque l'utilisateur drag & drop le fichier au dessus de la zone 
function dropHandler(event)
{
	// on annule le comportement par défaut du navigateur 
	event.preventDefault();
	
	// si le type de l'évenement n'est pas drop OU le nombre de fichiers droppés est égal à 0
	// alors on termine la fonction en cours avec le mot clef "return".
	if( event.type != "drop" || event.dataTransfer.files.length == 0)
		return;
		
	// on récupère le premier fichier contenu dans le liste de fichiers
	var file = event.dataTransfer.files[0];
	
	// on crée un objet de type FileReader
	var reader = new FileReader();
	
	// on lui spécifie que lorsque le fichier sera lu, on doit éxécuter la fonction loadHandler
	reader.addEventListener("load", loadHandler);
	
	// puis on lui demande de lire le fichier en tant que "fichier texte"
	reader.readAsText(file);
}

// fonction éxécutée lorsque le fichier drag & dropé est lu..
function loadHandler(event)
{
	// on stocke notre objet reader dans une variable
	var reader = event.target;
	
	// on lui enlève son écouteur d'évenement
	reader.removeEventListener("load", loadHandler);
	
	// puis on appelle la fonction "run"
	run(
		// ... à laquelle on envoit le contenu du fichier, parsé par la méthode JON.parse
		// ce qui est censée créer un objet Javascript valide.
		JSON.parse(reader.result)
	);
}


// fonction qui calcule une moyenne des notes d'un élève
function getAverage(id,data)
{
	var total = 0;
	var num = 0;
	var i = data.length;
	
	while( --i > -1 )
	{
		if( data[i]['id'] != id )
			continue;
			
		num++;
		total += data[i]['note'];
	}
	
	return total / num;
}

// fonction qui construit du html à l'aide des données contenues dans les fichiers
function run(obj)
{
	var container 	= document.getElementById("container");
	var max 		= obj.length;
	var i 			= 0;
	var html 		= '';
	var avg			= 0;
	
	html += '<h1>Notes</h1>';
	html += '<table>';
	
		html += "<tr>";
			html += "<th>Nom</th>";
			html += "<th>Prenom</th>";
			html += "<th>Matière</th>";
			html += "<th>Note</th>";
			html += "<th>Moy.</th>";
		html += "</tr>";
	
	for( i = 0; i < obj.length; i++ )
	{
		avg = getAverage(obj[i]['id'], obj);
		
		html += '<tr>';
			html += '<td>'+obj[i]['nom']+'</td>';
			html += '<td>'+obj[i]['prenom']+'</td>';
			html += '<td>'+obj[i]['matiere']+'</td>';
			html += '<td>'+obj[i]['note']+'</td>';
			html += '<td>'+avg+'</td>';
		html += '</tr>';
	}
	
	
	html += '</table>';
	
	container.innerHTML = html;
}


window.addEventListener("load", main);
