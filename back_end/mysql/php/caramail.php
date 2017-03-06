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
	echo 'Connexion échouée : ' . $e->getMessage();
	exit();
}


// on vérifie que les données ont bien été envoyées 
if( 
	isset( $_POST['pseudo'] ) && 
	!empty($_POST['pseudo']) &&
	isset( $_POST['message'] ) && 
	!empty($_POST['message']) 
)
{
	// on prépare notre requête qui nous servira à un insérer les données en base
	$statement = $pdo->prepare("INSERT INTO tchat (pseudo,message) VALUES(:pseudo,:message)");
	$statement->bindParam(':pseudo', $_POST['pseudo'], PDO::PARAM_STR);
	$statement->bindParam(':message', $_POST['message'], PDO::PARAM_STR);
	
	// puis on l'éxécute après lié les paramètres envoyés par l'utilisateur
	$statement->execute();
	
	
	// et on redirige vers la page en cours histoire d'éviter de re-soumettre le formulaire à 
	// chaque fois que l'on actualise la page
	header("Location: ".$_SERVER['PHP_SELF']);
}


// on sélectionne l'ensemble des données contenues dans la table tchat
$statement = $pdo->query("SELECT * FROM tchat ORDER BY id DESC LIMIT 20");
$tchat_data = $statement->fetchAll();

?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title></title>
	<link rel="stylesheet" media="screen" href="caramail.css" type="text/css" />
</head>
<body>
	<div class="messages">
		
		
		<?php
		
			// et on les affiche ..; 
			foreach($tchat_data as $current_data)
			{
				echo '<p>'.$current_data['pseudo'].':'.$current_data['message'].'</p>';
			}
		
		?>
		
	</div>
	<form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
		
		<label>Pseudo:</label>
		<input type="text" name="pseudo"/>
		<br/>
		
		<label>Message:</label>
		<input type="text" name="message"/>
		<br/>
		
		<input type="submit" value="OK" />
		
	</form>
</body>
</html>