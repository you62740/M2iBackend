<?php

if( 
	isset($_GET['nb_ordinateur']) &&
	isset($_GET['nb_utilisateur']) &&
	isset($_GET['game_submit']) 
)
{
	$nb_ordinateur 	= (int)($_GET['nb_ordinateur']);
	$nb_utilisateur = (int)($_GET['nb_utilisateur']);
	
	if( $nb_ordinateur < $nb_utilisateur )
	{
		echo 'plus petit';
	}
	else if( $nb_ordinateur > $nb_utilisateur )
	{
		echo 'plus grand';
	}
	else
	{	
		echo 'gagné, vous pouvez directement rejouer';
		$nb_ordinateur = rand(0, 100);
	}
}
else
{
	$nb_ordinateur = rand(0, 100);
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
		
		<input 	type="hidden" 
				value="<?php echo $nb_ordinateur; ?>" 
				name="nb_ordinateur"/>
				
		<input type="submit" name="game_submit" value="OK"/>
	</form>
</body>
</html>