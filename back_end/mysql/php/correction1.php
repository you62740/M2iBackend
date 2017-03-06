<?php

// on initialise les variables qui vont nous permettre de nous connecter
// à la bdd.
$dsn = 'mysql:dbname=pyrates;host=127.0.0.1';
$user = 'root';
$password = '';

// puis on tente la connexion avec les paramètres fournis
try 
{
	// si on réussit, on obtient un objet de type PDO, qui va nous permettre
	// de manipuler la bdd
	$pdo = new PDO($dsn, $user, $password);
} 
catch (PDOException $e) 
{
	// sinon on affiche le message d'erreur qui va nous permettre de déterminer
	// pourquoi on a pas réussi à se connecter à la bdd.
	echo 'Connexion échouée : ' . $e-> getMessage();
	exit();
}

if( 
	isset($_POST['weapon_name']) 	&& !empty($_POST['weapon_name']) &&
	isset($_POST['weapon_price']) 	&& !empty($_POST['weapon_price']) &&
	isset($_POST['weapon_weight']) 	&& !empty($_POST['weapon_weight']) &&
	isset($_POST['weapon_power']) 	&& !empty($_POST['weapon_power']) &&
	isset($_POST['weapon_type']) 	&& !empty($_POST['weapon_type'])
)
{
	// ici, je suis sur d'avoir toutes les données avec lesquelles je souhaite travailler
	
	$sql = "INSERT INTO weapons (name,type,price,weight,power) ";
	$sql .= "VALUES('".$_POST['weapon_name'].
			"','".$_POST['weapon_type'].
			"',".$_POST['weapon_price'].
			",".$_POST['weapon_weight'].
			",".$_POST['weapon_power'].
			") ";
			
	// on éxécute la requête SQL
	$statement 		= $pdo->query($sql);
	
}


$sql 			= "SELECT * FROM weapons";
$statement 		= $pdo->query($sql);
$weapons_data 	= $statement->fetchAll();

?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title></title>
</head>
<body>
	
	
	
	<form method="POST" action="correction1.php">
		
		<label>Nom: </label>
		<input type="text" name="weapon_name"/>
		<br/>
		
		<label>Type: </label>
		<input type="text" name="weapon_type"/>
		<br/>
		
		<label>Puissance: </label>
		<input type="text" name="weapon_power"/>
		<br/>
		
		<label>Poids: </label>
		<input type="text" name="weapon_weight"/>
		<br/>
		
		<label>Prix: </label>
		<input type="text" name="weapon_price"/>
		<br/>
		
		<input type="submit" value="OK" />
		
	</form>
	
	<div>
	<?php
	
		foreach($weapons_data as $current_weapon )
		{
			echo $current_weapon['name'],'<br/>';
		}
	
	?>
	</div>
	
</body>
</html>