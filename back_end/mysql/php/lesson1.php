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
	echo 'yeah ! <br/>';
} 
catch (PDOException $e) 
{
	// sinon on affiche le message d'erreur qui va nous permettre de déterminer
	// pourquoi on a pas réussi à se connecter à la bdd.
    echo 'Connexion échouée : ' . $e-> getMessage();
	exit();
}

// on prépare une requête SQL
$sql = 'SELECT * FROM famous_pyrates';

// ....que l'on envoie directement au serveur MySQL à l'aide de notre objet PDO
// et de sa méthode query. Cette méthode, nous renvoie un objet de type 
// PDOStatement, que l'on va pouvoir manipuler.
$statement = $pdo->query($sql);


// si la requête n'est pas valide ou n'a pu être créée
if( $statement === false )
{
	// alors on affiche l'erreur
	echo 'la requête a échoué';
	var_dump($pdo->errorInfo());
}
else
{
	// sinon on finalise la requête en l'éxécutant à la main
	$statement->execute();
	
	// puis on récupère les données à l'aide de la méthode fetchAll
	// de l'objet de type PDOStatement
	$famous_pyrates_data = $statement->fetchAll();
	
	
	// On boucle ensuite sur l'ensemble des lignes
	// du jeu de données
	foreach($famous_pyrates_data as $currentRow )
	{
		// et on affiche le nom du pirate pour chacune de ces lignes.
		echo $currentRow['name'],'<br/>';
	}
	
	
}


