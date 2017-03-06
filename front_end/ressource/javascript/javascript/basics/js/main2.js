function main()
{
	
	var html = "";
	
	html += "<table>";
	html += 	"<tr>";
	html += 		"<td><img src=\"http://tinyurl.com/zeejmb9\"/></td>";
	html += 		"<td><p>Morano</p><p>Nadine</p></td>";
	html += 	"</tr>";
	html += 	"<tr>";
	html += 		'<td colspan="2">Est l\'épouse d\'Ordralfabétix, avec qui elle vend et prépare des poissons.</td>';
	html += 	"</tr>";
	html += "</table>";
	
	$("body").html(html);
	$("table").css(
		{
			"border-collapse": "collapse",
			"border": "1px solid #333333"
		}
	);
	$("table td").css(
		{
			"border": "1px solid #333333",
			"width": "100px",
			"padding": "15px"
		}
	);
	$("table img").css({"width": "100px"});
}

function clickHandler()
{
	$(this).css({"background-color":"green"});
}


window.addEventListener("load", main);