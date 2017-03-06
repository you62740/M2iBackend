
var socket 	= null;

function send()
{
	var message = document.getElementById("my_message").value;
	var login = document.getElementById("my_login").value;
	
	socket.emit("send_message", {pseudo: login, msg: message});
}

function refreshHandler(data)
{
	var users_html 	= document.getElementById("users");
	var container 	= document.getElementById("container");
	var html 		= "";
	var i 			= 0;
	var max 		= data.messages.length;
	
	for( i = 0; i < max; i++ )
	{
		html += "<p>"+data.messages[i].pseudo+': '+data.messages[i].msg+"</p>";
	}
	
	container.innerHTML = html;
	
	html = "<ul>";
	
	
	
	
	max = data.users.length;
	
	for( i = 0; i < max; i++ )
	{
		html += "<li>"+data.users[i]+"</li>";
	}
	
	html += "</ul>";
	
	users_html.innerHTML = html;
}

window.onload = function()
{
	// socket = io.connect('127.0.0.1:3000');
	socket = io.connect('172.30.2.107:3000');
	socket.on('refresh_data', refreshHandler );
};