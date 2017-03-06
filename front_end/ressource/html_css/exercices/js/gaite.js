var open = false;
	
function coucou()
{
	console.log("coucou");
	var menu = document.getElementById("sidebar_menu");
	var site = document.getElementById("website_content");
	
	console.log(site, menu);
	
	if ( open == false )
	{
		menu.setAttribute("class", "opened");
		site.setAttribute("class", "opened");
		open = false;
	}
	else
	{
		menu.setAttribute("class", "closed");
		site.setAttribute("class", "closed");
		open = false;
	}
}