<?php

session_start();

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

if( 

	isset($_GET['post_id']) && 
	!empty($_GET['post_id']) &&
	isset( $_GET['user_key'] ) &&
	$_SESSION['my_key'] == $_GET['user_key']
)
{
	// on supprime le ou les posts qui portent l'id passé en param.
	$sql = "DELETE FROM tchat WHERE id=".(int)($_GET['post_id'])."";
	$statement = $pdo->query($sql);
}
// on sélectionne l'ensemble des données contenues dans la table tchat quand le pseudo vaut celui passé en paramètre


$sql = "SELECT * FROM tchat";
$statement = $pdo->query($sql);

$tchat_data = array();

if( $statement !== false )
{
	$tchat_data = $statement->fetchAll();
}


$_SESSION['my_key'] = rand(0, 1000);


?>



<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title></title>
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
	<br/>
	
	
	<form method="GET" action="<?php echo $_SERVER['PHP_SELF']; ?>">
		<input type="text" name="post_id"/>
		<input type="hidden" value="<?php echo $_SESSION['my_key'];?>" name="user_key"/>
		<input type="submit" value="Supprimer" />
		
	</form>
</body>
</html>