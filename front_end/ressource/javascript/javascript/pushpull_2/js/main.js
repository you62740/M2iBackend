


function pushViewData(url,view,data, callback)
{
	var http = new XMLHttpRequest();
	var url = url;
	var data = "table="+view+"&data="+JSON.stringify(data);
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onreadystatechange = function() 
	{		
		if(http.readyState == 4 && http.status == 200) 
		{
			callback( http.responseText );
		}
	};
	
	http.send(data);
}

function getViewData(url,view, callback)
{
	var http = new XMLHttpRequest();
	var url = url;
	var data = "table="+view;
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
	http.onreadystatechange = function() 
	{		
		if(http.readyState == 4 && http.status == 200) 
		{
			callback( JSON.parse(http.responseText) );
		}
	}
	http.send(data);
}

function openView(event)
{
	var id = event.currentTarget.getAttribute("id");
	var table_name = "";
	
	switch( id )
	{
		case "clients": table_name = "customers"; break;
		case "products": table_name = "products"; break;
		case "employees": table_name = "employees"; break;
	}
	
	currentView = table_name;
	getViewData('ws/data.php', table_name, getDataHandler);
}

function getDataHandler(data)
{
	var container = document.getElementById("content");
	var htmlContent = "";
	var max = 0;
	var max2 = 0;
	var i = 0;
	var j = 0;
	var str = null;
	
	if( data["error"] != undefined )
	{
		container.innerHTML = data["error"];
	}
	else
	{
		
		htmlContent = "<table>";
		
		/*columns*/
		htmlContent += "<tr><th>"+data["columns"].join("</th><th>")+"</th><th>Action(s)</th></tr>";
		/*columns*/
		
		/*data*/
		
		if( data["data"] != undefined )
		{
			max = data["data"].length;
			for( i = 0; i < max; i++ )
			{
				
				max2 = data["data"][i].length;
				htmlContent += "<tr>";
				
				for( j  = 0; j < max2; j++ )
				{
					htmlContent += '<td><input type="text" value="'+data["data"][i][j]+'"/></td>';
				}
				
				htmlContent += '<td><input type="checkbox"/></td>';
				htmlContent += "</tr>";
			}
		}
		/*data*/
		
		htmlContent += "</table>";
		
		container.innerHTML = htmlContent;
	}
}

function sendDataHandler(event)
{
	var i = 0;
	var j = 0;
	var max = 0;
	var max2 = 0;
	var data = new Array();
	var row = null;
	var tr = null;
	var td = null;
	var input = null;
	var HTMRows = document.querySelectorAll("#content tr");
	
	if( HTMRows == null )
		return;
		
	max = HTMRows.length;
	
	for( i = 1; i < max; i++ )
	{
		row = new Array();
		tr = HTMRows[i];
		max2 = tr.children.length - 1;
		
		for( j = 0; j < max2; j++ )
		{
			td = tr.children[j];
			input = td.children[0];
			row.push(input.value);
		}
		
		data.push(row);
	}
	
	pushViewData('ws/data.php', currentView, data, pushHandler );
}

function pushHandler(data)
{
	alert("OK");
}

function addRowHandler(event)
{
	var table = document.querySelector("#content table");
	
	if( table == null )
		return;
	
	var row = document.querySelector("#content table tr");
	var newHTMLRow = document.createElement("tr");
	var numCols = row.children.length;
	var newHTMLInput = null;
	var newHTMLTd = null;
	var i = 0;
	
	for( i = 0; i < numCols; i++ )
	{
		newHTMLTd = document.createElement("td");
		newHTMLInput = document.createElement("input");
		
		if( i == numCols - 1 )
		{
			newHTMLInput.setAttribute("type","checkbox");
		}
		else
		{
			newHTMLInput.setAttribute("type","text");
		}
		newHTMLTd.appendChild(newHTMLInput);
		newHTMLRow.appendChild(newHTMLTd);
	}
	
	
	table.appendChild(newHTMLRow);
}

function delRowHandler(event)
{
	var table = document.querySelector("#content table");
	
	if( table == null )
		return;
	
	var checkboxes = document.querySelectorAll("#content table tr input[type=\"checkbox\"]");
	var currentCheckbox = null;
	var currentRow = null;
	var max = checkboxes.length;
	var i = 0;
	
	for( i = 0; i < max; i++ )
	{
		currentCheckbox = checkboxes[i];
		
		if(currentCheckbox.checked == true )
		{
			currentRow = currentCheckbox.parentNode.parentNode;
			currentRow.parentNode.removeChild(currentRow);
		}
	}
	
}

function main()
{	
	var button = null;
	var tab = ["clients","employees","products"];
	var i = tab.length;
	while( --i > -1 )
	{
		document.getElementById(tab[i]).addEventListener('click', openView);
	}
	
	button = document.getElementById("send");
	button.addEventListener('click', sendDataHandler);
	
	button = document.getElementById("addRowBtn");
	button.addEventListener('click', addRowHandler);
	
	button = document.getElementById("delRowBtn");
	button.addEventListener('click', delRowHandler);
}

var currentView = null;
window.addEventListener("load", main);
