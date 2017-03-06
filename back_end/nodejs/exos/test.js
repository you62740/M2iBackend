var http 		= require('http'); 
var url 		= require('url');
var querystring = require('querystring');
var server 		= null;
var cookie		= require('cookie');


function setConnected(value)
{
	var val = (value==true) ? '1' : '0';
	var str = cookie.serialize('connected', val, 0);
	return str;
}

function isConnected(request)
{
	var cookies = cookie.parse(request.headers.cookie || "");
	return cookies.connected == 1;
}

function getControllerClass(pathname)
{
	switch( pathname )
	{
		case "/me"		:	return MeController; break;
		case "/login"	: 	return LoginController; break;
		
		default			: return LoginController;
	}
}

function LoginController(request, response)
{
	var obj = url.parse(request.url);
	var params = querystring.parse(obj.query);
	var query = url.parse(request.url).query;
	
	if( params.login == "admin" && params.password == "admin" )
	{
		response.writeHead(302, {	
									'Set-Cookie': setConnected(true),
									'Location': '/me'
								});
		response.end();
	}
	else
	{
		
		response.writeHead(200, {
									'Set-Cookie': setConnected(false),
									'Content-Type': 'text/html'
								}); 
		response.write('<!doctype html><html lang="en">');
		response.write('<head><meta charset="utf-8"><title></title></head>');
		response.write('<body>');
		response.write('<form method="GET" action="/login">');
		response.write('<label>Login</label><input type="text" name="login" value=""/>');
		response.write('<label>Password</label><input type="text" name="password" value=""/>');
		response.write('<input type="submit" name="submit" />');
		response.write('</form>');
		response.write('</body></html>');
		response.end();
	}
	
	
}

function MeController(request,response)
{
	if( isConnected(request) == false )
	{
		response.writeHead(302, {'Location': '/login'});
		response.end();
	}
	else
	{	
		response.writeHead(200, {'Content-Type': 'text/html'}); 
		response.write('<!doctype html><html lang="en">');
		response.write('<head><meta charset="utf-8"><title></title></head>');
		response.write('<body>');
		response.write('<h1>Mon compte</h1>');
		response.write('<p>Bienvenue Roger Dupuis, vous avez 50 ans !</p>');
		response.write('</body></html>');
		response.end();
	}
}

function requestHandler(request, response) 
{ 
	console.log("coucou");
	var page = url.parse(request.url).pathname;
	var controllerClass = getControllerClass(page);
	var myController = new controllerClass(request,response);
}


server = http.createServer(requestHandler);
server.listen(3000);  






