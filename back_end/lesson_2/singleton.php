<?php

/*
Ici, notre problématique est de maintenir une instance unique de la classe TajMahal, 
car par définition, il n'existe qu'un seul TajMahal dans notre application 
( et dans le monde réel aussi ). 

Pour cela, on se propose de créer une propriété statique qui va se charger de contenir
la seule et unique instance de la classe TajMahal.

La méthode statique "getInstance" nous sert quand à elle, à gérer et assurer proprement
l'unicité de cette instance. 

*/
class TajMahal
{

	//static	
	static private $_instance = null; // destinée à contenir l'unique instance de TajMahal
	
	// se charge de créer ( si besoin est ) l'unique instance de TajMahal
	// retourne systématiquement la même instance de TajMahal ( la seule et l'unique )
	static public function getInstance()
	{
		if ( self::$_instance === null )
		{
			$toto = new TajMahal();
			self::$_instance = $toto;
		}
		
		return self::$_instance;
	}
	
	
	// object
	public function TajMahal()
	{
		// si self::$_instance ne vaut pas null alors on a déjà crée 
		// un objet de type TajMahal avant.
		// On ne devrait donc pas avoir affaire à une fonction constructrice
		// de nouveau.
		
		if ( self::$_instance != null )
		{
			throw( new Exception("Singleton error: prière d'utiliser la méthode statique: 'getInstance'") );
		}
		else
		{
			self::$_instance = $this;
		}
	}
}



$mon_tajmahal1 = new TajMahal();

/*
$mon_tajmahal2 = TajMahal::getInstance();




if( $mon_tajmahal1 === $mon_tajmahal2 )
{
	echo 'le formateur sait ce qu\'il fait';
}
else
{
	echo 'le formateur est un escroc';
}
*/



