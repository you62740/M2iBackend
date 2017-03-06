

function dropHandler(e)
{
	e.preventDefault();	
	console.log(e);
	//console.log(e.dataTransfer);
	//var elemID = e.dataTransfer.getData("cacahuete");
	//var drop = e.target;
	//var carre = document.getElementById(elemID);
	
	//drop.appendChild(carre);
}

//function dragStartHandler(e)
//{
	//e.dataTransfer.effectAllowed = "move";
	//e.dataTransfer.setData("cacahuete",e.target.id);
//}

function overHandler(e)
{
	e.preventDefault();
}

function main()
{	
	//var carre = document.getElementById("carre");
	var drop = document.getElementById("drop");
	
	//carre.addEventListener("dragstart",dragStartHandler);
	drop.addEventListener("dragover",overHandler);
	drop.addEventListener("drop",dropHandler);
}


window.addEventListener("load", main);
