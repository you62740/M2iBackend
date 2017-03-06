

function main()
{
	var monObjetAjax = new XMLHttpRequest();
	monObjetAjax.onreadystatechange = function()
	{
		if( monObjetAjax.readyState == 4 && monObjetAjax.status == 200 )
		{
			// code pour récupérer les données du ws et faire le traitement
			var data = monObjetAjax.responseText;
			var obj = JSON.parse(data);
			
			run(obj);
		}
	};
	
	
	monObjetAjax.open("GET","data2.json", true);
	monObjetAjax.send(null);
}



function getAverage(data)
{
	var total = 0;
	var num = 0;
	var i = data.length;
	
	while( --i > -1 )
	{
		num++;
		total += data[i];
	}
	
	return total / num;
}

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
			html += "<th>Moy.</th>";
		html += "</tr>";
	
	for( i = 0; i < obj.length; i++ )
	{
		avg = getAverage(obj[i]['notes']);
		
		html += '<tr>';
			html += '<td>'+obj[i]['nom']+'</td>';
			html += '<td>'+obj[i]['prenom']+'</td>';
			html += '<td>'+avg+'</td>';
		html += '</tr>';
	}
	
	
	html += '</table>';
	
	container.innerHTML = html;
}


window.addEventListener("load", main);
