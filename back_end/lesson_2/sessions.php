<?php


// créer une session par défaut, ou active une session déjà créée
// à chaque fois que vous voulez utiliser une session, vous êtes obligés 
// d'utiliser session_start();
session_start();


if( 
	isset($_POST['login']) && 
	isset( $_POST['passwd'] ) && 
	$_POST['login'] == 'johann' && 
	$_POST['passwd'] == 'tata_monique'
)
{
	$_SESSION['login'] = 'johann';
	$_SESSION['passwd'] = 'tata_monique';
	$_SESSION['connected'] = true;
}


if( isset($_POST['deconnexion']) )
{
	session_destroy();
	$_SESSION = array();
	// session_destroy() permet de tuer la session en cours
}








?>


<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title></title>
</head>
<body>
	
	<?php
		if ( 
			isset($_SESSION) 				&& 
			isset($_SESSION['connected']) 	&& 
			$_SESSION['connected'] == true 
		)
		{
	?>
			<h1>Vous êtes connecté</h1>
			<form method="POST">
				<input type="submit" value="deconnexion" name="deconnexion" />
			</form>
	<?php
		}
		else
		{
	?>
			<form method="POST">
				
				<table>
					
					<tr>
						<td><label>Login:</label></td>
						<td><input type="text" value="" name="login" /><br/></td>
					</tr>
					
					<tr>
						<td><label>Passwd:</label></td>
						<td><input type="text" value="" name="passwd" /><br/></td>
					</tr>
					<tr>
						<td></td>
						<td>
							<input type="submit" value="Se connecter" name="connexion_btn" />
						</td>
					</tr>
					
				</table>
			</form>
	<?php
		}
	?>
</body>
</html>