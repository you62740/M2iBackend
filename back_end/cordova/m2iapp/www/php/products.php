<?php

// on initialise les variables qui vont nous permettre de nous connecter
// à la bdd.
$dsn = 'mysql:dbname=m2i;host=127.0.0.1';
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

$sql = "SELECT * FROM products";
// on sélectionne l'ensemble des données contenues dans la table tchat quand le pseudo vaut celui passé en paramètre
$statement = $pdo->query($sql);

$tchat_data = array();

if( $statement !== false )
{
	$tchat_data = $statement->fetchAll(PDO::FETCH_OBJ);
}

file_put_contents( 'products.json', json_encode( $tchat_data  ) );
