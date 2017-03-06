

function readyStateHandler(event)
{
	var monObjetAjax = event.target;
	
	if( monObjetAjax.readyState == 4 && monObjetAjax.status == 200 )
	{
		// code pour récupérer les données du ws et faire le traitement
		var data = monObjetAjax.responseText;
		var obj = JSON.parse(data);
		
		run(obj);
	}
}

function main()
{
	var monObjetAjax = new XMLHttpRequest();
	monObjetAjax.addEventListener("readystatechange", readyStateHandler);
	monObjetAjax.open("GET","data.json", true);
	monObjetAjax.send();
}

function run(obj)
{
	var container 	= document.getElementById("container");
	var champs 		= obj["champs"];
	var data 		= obj["data"];
	var html 		= '';
	var prop 		= null;
	
	html += '<h1>'+obj["titre"]+'</h1>';
	html += '<table>';
	html += '<tr>';
	
	
	for( var i = 0; i < champs.length; i++ )
	{
		html += "<th>"+champs[i]+"</th>";
	}
	
	html += '</tr>';
	
	for( i = 0; i < data.length; i++ )
	{
		html += '<tr>';
		
		for( prop in data[i] )
		{
			html += '<td>'+data[i][prop]+'</td>';
		}
		
		html += '</tr>';
	}
	
	
	html += '</table>';
	
	container.innerHTML = html;
}


window.addEventListener("load", main);
