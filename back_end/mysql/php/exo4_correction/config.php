<?php

/*
	on crée des constantes à l'aide de la fonction define 
*/
define('DB_NAME','daily_planet');
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWD', '');

session_start();


// on initialise les variables qui vont nous permettre de nous connecter
// à la bdd.
$dsn = 'mysql:dbname='.DB_NAME.';host='.DB_HOST;

// puis on tente la connexion avec les paramètres fournis
try 
{
	// si on réussit, on obtient un objet de type PDO, qui va nous permettre
	// de manipuler la bdd
	// ici $pdo est une variable globale
	$pdo = new PDO($dsn, DB_USER, DB_PASSWD);
} 
catch (PDOException $e) 
{
	// sinon on affiche le message d'erreur qui va nous permettre de déterminer
	// pourquoi on a pas réussi à se connecter à la bdd.
	echo 'Connexion échouée : ' . $e->getMessage();
	exit();
}





