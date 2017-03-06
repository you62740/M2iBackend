<?php
	require_once './make/compiler.php';
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Game</title>
		<!--<script src="/socket.io/socket.io.js"></script>-->
		<script src="../node_modules/socket.io/node_modules/socket.io-client/socket.io.js"></script>
		<script src="./lib/tomahawk_engine.js"></script>
		<script src="./client.js"></script>
		<link rel="stylesheet" type="text/css" href="css/main.css" />
    </head>
    <body>
        <h1>Jeu en temps réel avec socket.io</h1>
		
		<div id="loginForm">
			<input type="text" value="127.0.0.1" placeholder="127.0.0.1" id="server_ip" />
			<input type="text" value="toto" placeholder="nickname" id="nick" /><br/>
			<input type="color" value="#156156" id="color" /><br/>
			<button id="connectBtn">OK</button>
		</div>
		
		<span id="infos"></span>
		
		<canvas width="640" height="480" id="game"></canvas>
    </body>
</html>