function main()
{
	$("body").html("<p></p><p></p><p></p><p></p>");
	$("p").html("coucou");
	$("p").css(
				{
					"margin-left":"0px",
					"width":"100%",
					"font-weight":"bold"
				}
	);
	
	$("p").attr("class","toto");
	$(".toto").animate(
		{"marginLeft":"150px"}, 4000
	);
	
	$("p").on( "click", clickHandler );
	//$("p").off("click", clickHandler );
}

function clickHandler()
{
	$(this).css({"background-color":"green"});
}


window.addEventListener("load", main);