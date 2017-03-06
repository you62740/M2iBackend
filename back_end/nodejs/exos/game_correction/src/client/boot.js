

function run()
{
	document.getElementById("loginForm").style.display = "none";
	document.getElementById("connectBtn").removeEventListener("click", run);
	
	var data	= new Object();
	data.ip 	= document.getElementById("server_ip").value;
	data.nick 	= document.getElementById("nick").value;
	data.color 	= document.getElementById("color").value;
	
	
	Tomahawk.run(); // runs the engine
	Application.getInstance().init(data);
}

window.onload = function()
{
	document.getElementById("connectBtn").addEventListener("click", run);
};


