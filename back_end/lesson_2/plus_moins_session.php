<?php

// on démarre une session
session_start();

// si notre valeur aléatoire n'existe pas, alors on la crée.
if( !isset($_SESSION['nb_ordinateur']) )
{
	$_SESSION['nb_ordinateur'] = rand(0, 100);
}

// si notre utilisateur a rempli le formulaire et cliqué sur le bouton OK
if( 
	isset($_GET['nb_utilisateur']) &&
	isset($_GET['game_submit']) 
)
{
	// on stocke notre valeur aléatoire dans une variable
	$nb_ordinateur 	= $_SESSION['nb_ordinateur'];
	
	// on stocke la valeur de l'utilisateur dans une variable
	$nb_utilisateur = (int)($_GET['nb_utilisateur']);
	
	// on compare la valeur donnée par l'utilisateur avec la valeur aléatoire
	// générée par l'ordi
	if( $nb_ordinateur < $nb_utilisateur )
	{
		// le nombre à trouver est plus petit
		echo 'plus petit';
	}
	else if( $nb_ordinateur > $nb_utilisateur )
	{
		// le nombre à trouver est plus grand
		echo 'plus grand';
	}
	else
	{	
		// si on gagne, on relance le jeu en créant une nouvelle valeur aléatoire
		// à trouver.
		echo 'gagné, vous pouvez directement rejouer';
		$_SESSION['nb_ordinateur'] = rand(0, 100);
	}
}

?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title></title>
</head>
<body>
	<form method="GET" action="plus_ou_moins.php">
		<label>Nombre 0-100:</label>
		<input type="text" value="" name="nb_utilisateur"/>
		<input type="submit" name="game_submit" value="OK"/>
	</form>
</body>
</html>