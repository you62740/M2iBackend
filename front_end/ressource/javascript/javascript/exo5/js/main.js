
function readHandler(event)
{
	var reader = event.target;
	console.log(reader.result);
}

function fileHandler(event)
{
	var mon_input = event.target;
	var i = mon_input.files.length;
	var myFile = null;
	var reader = null;
	
	console.log(mon_input.files);
	
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


window.addEventListener("load", main);
