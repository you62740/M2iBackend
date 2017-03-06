<?php

//format GET = paramètres dans l'url
// format POST = paramètres passés dans le corps de la requête http, 
// invisible côté client

$nom = "";
$prenom = "";

if( isset($_POST["nom"]) && isset($_POST["prenom"]) )
{
	$nom = $_POST["nom"];
	$prenom = $_POST["prenom"];
	
	echo $_POST["valeur_cachee"];
}


?>


<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title></title>
</head>
<body>
	
	<form method="POST" action="./parameters.php">
		
		
		<input type="hidden" value="100" name="valeur_cachee" />
		
		<label>Nom:</label>
		<input type="text" name="nom" placeholder="<?php echo $nom; ?> " />
		<br/>
		
		<label>Prenom:</label>
		<input type="text" name="prenom" placeholder="<?php echo $prenom; ?> " />
		<br/>
		
		<input type="submit" value="OK" />
		
	</form>

</body>
</html>



