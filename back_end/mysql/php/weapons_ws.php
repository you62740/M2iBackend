<?php

// on modifie l'en-tête du fichier, pour préciser au navigateur
// que les données devront être interprétées comme étant issues d'un fichier.json
// même si on possède l'extension .php
header("Content-type: application/json");


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

/*

On définit un prix et un poids par défaut
puis on vérifie si l'on reçoit un paramètre dans l'url qui correspond à 
l'un ou à l'autre ou même les deux. 
*/

$weight = 1000;
$price = 1000;

if( isset($_GET['price']) && !empty($_GET['price']) )
{
	$price = (int)($_GET['price']);
}

if( isset($_GET['weight']) && !empty($_GET['weight']) )
{
	$weight = (int)($_GET['weight']);
}


// on prépare notre requête SQL et on l'envoie à MySQL, celui-ci 
// va donc préparer notre requête, et empêcher les injections SQL
$sql 			= "SELECT * FROM weapons WHERE price <= :user_price OR weight <= :user_weight";
$statement 		= $pdo->prepare($sql);


// puis, on relie les paramètres de notre requête préparée à nos valeurs 
// qui nous sont données par l'utilisateur
$statement->bindParam(":user_price", $price, PDO::PARAM_INT);
$statement->bindParam(":user_weight", $weight, PDO::PARAM_INT);

// et enfin on éxécute la requête préparée
$statement->execute();


// on récupère l'ensemble du jeu de données
$weapons_data 	= $statement->fetchAll();

// on le convertir au format .json à l'aide de la fonction json_encode
$json			= json_encode($weapons_data);

// et on affiche le tout
echo $json;