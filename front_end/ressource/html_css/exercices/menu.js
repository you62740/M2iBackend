
function toggleMenu()
{
	var el = document.getElementById("menuList");
	
	if( el.style.display == "block" )
	{
		el.style.display = "none";
	}
	else
	{
		el.style.display = "block";
	}
}

function refresh()
{
	var menuBtn = document.getElementById("menuBtn");
	var el = document.getElementById("menuList");
	var screenWidth = parseInt(document.body.clientWidth);
	
	if( screenWidth < 480 )
	{
		menuBtn.style.display = "block";
		el.style.display = "none";
	}
	else
	{
		el.style.display = "block";
		menuBtn.style.display = "none";
	}
};


function toggleMenuSide(event)
{
	event.stopPropagation();
	event.preventDefault();
	
	var el = document.getElementById("menu");
	var currentLeft = parseInt(el.style.left);
	
	if( currentLeft < 0 )
	{
		TweenMax.to(el,1,{"css":{"left":0}});
	}
	else
	{
		TweenMax.to(el,1,{"css":{"left":-170}});
	}
	
	return false;
}

function refreshSide()
{
	var menuBtn = document.getElementById("menuBtn");
	var el = document.getElementById("menu");
	var screenWidth = parseInt(document.body.clientWidth);
	
	if( screenWidth < 480 )
	{
		menuBtn.style.display = "block";
		el.setAttribute("class","floatingMenu");
		el.style.left = '-170px';
	}
	else
	{
		el.setAttribute("class","");
		menuBtn.style.display = "none";
	}
	
}


//window.onresize = window.onload = refresh;
window.onresize = window.onload = refreshSide;

