function main()
{
	var video = document.getElementById("uncharted");
	var btn = document.getElementById("btn");
	btn.addEventListener("click", snapshot);
	
	video.loop = true;
	video.muted = true;
	video.autoplay = false;
	video.poster = "poney.jpg";
}

function snapshot()
{
	btn.removeEventListener("click", snapshot);
	
	var canvas 	= document.getElementById("projector");
	var context = canvas.getContext("2d");
	var video 	= document.getElementById("uncharted");
	
	canvas.width 	= video.width;
	canvas.height 	= video.height;
	
	context.clearRect(0,0,canvas.width, canvas.height);
	context.save();
	context.drawImage(video,0,0,video.width, video.height);
	context.restore();
	
	var num_timeout = setTimeout( snapshot, 5 );
	//clearTimeout(num_timeout);
}




window.addEventListener("load", main);