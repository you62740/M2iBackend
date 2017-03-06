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


$pseudo = "";
// on vérifie que les données ont bien été envoyées 
if( 
	isset( $_GET['pseudo'] ) && 
	!empty($_GET['pseudo']) 
)
{
	$pseudo = $_GET['pseudo'];
}


$sql = "SELECT * FROM tchat WHERE pseudo='".$pseudo."'";
// on sélectionne l'ensemble des données contenues dans la table tchat quand le pseudo vaut celui passé en paramètre


if( isset($_GET['help']) && (int)($_GET['help']) == 1 )
	echo $sql;

$statement = $pdo->query($sql);

$tchat_data = array();

if( $statement !== false )
{
	$tchat_data = $statement->fetchAll();
}

?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title></title>
</head>
<body>
	
	<h1>Inject me if you can, level 1:</h1>
	<p>
		
		Objectif: afficher les messages de tout les utilisateurs en une seule fois.<br/>
		Note, si vous voulez un indice, rajoutez un paramètre "help" dans l'url et donnez lui la valeur "1" <br/><br/>
		ATTENTION: la table tchat doit être contenue dans la base données "pyrates".
	</p>
	<form method="GET" action="<?php echo $_SERVER['PHP_SELF']; ?>">
		
		<label>pseudo:</label>
		<input type="text" name="pseudo"/>
		<br/>
		
		<input type="submit" value="OK" />
		
	</form>
	
	<div class="messages">
		
		
		<?php
		
			// et on les affiche ..; 
			foreach($tchat_data as $current_data)
			{
				echo '<p>'.$current_data['pseudo'].':'.$current_data['message'].'</p>';
			}
		
		?>
		
	</div>
	
</body>
</html>