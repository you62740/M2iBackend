function run()
{
	alert("coucou je suis le carré !");
}

function foo(event)
{
	console.log(event.target.value);
}

function test()
{
	console.log("toto");
}


function getNodeIndex(node) 
{
    var index = -1;
    var container = node.parentNode;
	var i = container.children.length;
	
	while( --i > -1 )
	{
		if( container.children[i] === node )
			return i;
	}
	
    return -1;
}

function clickHandler(event)
{
	var color = parseInt(Math.random() * 0xFFFFFF);
	var a = Math.random();
	var b = parseInt(Math.random() * 255);
	var g = parseInt(Math.random() * 255);
	var r = parseInt(Math.random() * 255);
	//console.log("target");
	//console.log(event.target);
	//console.log("current target");
	//console.log(event.currentTarget);
	//
	console.log("#"+color.toString(16));
	
	event.target.style.marginLeft = (getNodeIndex(event.target) * 10)+"px";
	//event.target.style.backgroundColor = "#"+color.toString(16);
	event.target.style.backgroundColor = "rgba("+r+","+g+","+b+","+a+")";
}

function main()
{
	window.removeEventListener("load", main);
	
	var carre 		= document.getElementById('carre');
	var toto 		= document.querySelector("input[type=range]");
	var container 	= document.getElementById("container");
	
	container.addEventListener("click", clickHandler );
	toto.addEventListener("change", foo);
}


//window.onload = main;
window.addEventListener("load", main);





