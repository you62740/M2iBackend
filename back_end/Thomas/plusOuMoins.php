<?php 
	$min = 0;
	$max = 500;
	$nombreMystere = null;
	$message = '';	
	$count = 0;

	if(isset($_POST['choix']))
	{
		$choix = $_POST['choix'] ;
		$nombreMystere = $_POST['nombreMystere'];
		$count = $_POST['count'];
		
		if($choix == $nombreMystere)
		{
			$message = "Bravo";
		}
		
		else if($choix > $nombreMystere)
		{
			$message = "Le nombre mystere est plus petit";
		}

		else if($choix < $nombreMystere)
		{
			$message = "Le nombre mystere est plus grand";
		}
		
		$count ++;
	}
	else
	{
		$nombreMystere = rand($min, $max);
	}
?>

<!DOCTYPE html>
<html lang="fr">
	<head>
		<title>	Plus Ou Moins </title>
	</head>
	<body>
		<h1> Le nombre Mystère <em>entre <?= $min ?> et <?= $max ?> <em></h1>
		<h2> <?= $message ?> </h2>
		<h3> <?= $count ?> essais </h3>
		<form method="post">	
			<input type='hidden' name='nombreMystere' value='<?= $nombreMystere ?>'>
			<input type='hidden' name="count" value='<?= $count ?>'>
			<input type="number" name="choix">
			<input type="submit">
		</form>
	</body>
</html>