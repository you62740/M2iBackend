

function readHandler(event)
{
		
	var reader 	= event.target;
	var data 	= reader.result;
	var obj 	= JSON.parse(data);
	
	run(obj);
}

function fileHandler(event)
{
	var mon_input 	= event.target;
	var i 			= mon_input.files.length;
	var myFile 		= null;
	var reader 		= null;
	
	while( --i > -1 )
	{
		reader = new FileReader();
		reader.addEventListener("load", readHandler );
		
		myFile = event.target.files[i];
		reader.readAsText(myFile);
	}
}

function main()
{
	var element = document.getElementById("myFiles");
	element.addEventListener("change", fileHandler );
}

function run(obj)
{
	var container = document.getElementById("container");
	
	var champs = obj["champs"];
	var data = obj["data"];
	var html = '';
	var prop = null;
	
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
	
	container.innerHTML = container.innerHTML + html;
}


window.addEventListener("load", main);
