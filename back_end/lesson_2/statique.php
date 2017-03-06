<?php


/*
Tout l'interêt des méthodes et propriétés statiques est de donner accès
à des fonctionnalités et des propriétés en rapport avec les objets du type 
correspondant. 

Dans l'exemple suivant, la problématique est de créer un jeton possédant un 
identifiant unique à chaque fois. La propriété statique $_counter nous sert
à maintenir une valeur qui s'incrémente à chaque nouvelle instance de Token.

Cette valeur ayant un rapport direct avec les objets de type Token, on peut
la stocker directement sur la classe.
*/

class Token
{
	//static	
	static private $_counter = 0;
	
	
	
	// object
	private $_id = 0;
	
	public function Token()
	{
		$this->_id = self::$_counter;
		self::$_counter++;
	}
	
	public function getId()
	{
		return $this->_id;
	}
	
}


// créer autant de jetons que le nombre passé en paramètre
function creerJetons($param_num_jetons)
{
	$tab 		= array();
	$i 			= 0;
	
	for ( $i = 0; $i < $param_num_jetons; $i++ )
	{
		$jeton = new Token();
		
		//$tab[]= $jeton;
		
		//int array_push ( array &$array , mixed $value1 [, mixed $... ] )
		array_push( $tab, $jeton );
	}
	
	return $tab;
}




$jetons = creerJetons(10 );

foreach( $jetons as $mon_jeton )
{
	echo $mon_jeton->getId(), ',';
}


$jetons = creerJetons(10);


foreach( $jetons as $mon_jeton )
{
	echo $mon_jeton->getId(), ',';
}

