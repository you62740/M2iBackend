<?php


// créer une session par défaut, ou active une session déjà créée
// à chaque fois que vous voulez utiliser une session, vous êtes obligés 
// d'utiliser session_start();
session_start();


$users = array(

	"johann"	=>"tata_monique",
	"nicolas"	=>"monique_tata",
	"fred"		=>"tata_monique"
);

// si les variables login et password ont été soumises dans le formulaire
if( isset($_POST['login']) && 
	isset( $_POST['passwd'] ) 
)
{
	// on stocke le password envoyé par l'utilisateur dans une variable
	$password = $_POST['passwd'];
	
	// on stocke le login envoyé par l'utilisateur dans une autre variable
	$login = $_POST['login'];
	
	// si la clé existe dans le tableau users
	if ( array_key_exists($login, $users )
	{
		// on va chercher le mot de passe attendu dans le tableau des utilisateurs
		$goodPassword = $users[$login];
		
		// on compare le mot de passe envoyé à celui qui est attendu
		if ( $goodPassword == $password )
		{
			// si les deux password correspondent alors l'utilisateur s'est connecté avec succès.
			$_SESSION['login'] = $_POST['login'];
			$_SESSION['connected'] = true;
		}
	}
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
			<h1>Vous êtes connecté <?php echo $_SESSION['login']; ?></h1>
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