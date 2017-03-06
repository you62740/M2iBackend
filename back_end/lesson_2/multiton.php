<?php

/*
 * 
	de la même manière que vous pouvez obtenir une seule et unique instance d'une même classe en faisant appel à la méthode statique getInstance, lors de l'exercice précédent, vous devez pouvoir créer une seule et unique  instance par clé. 
 * 
 * 
 * 
 * 
	Exemple: 
	
	Personnage::getInstance("Merlin") me renverra toujours la même instance de Personnage (le même objet de type personnage) MAIS Personnage::getInstance("Arthur") me renverra un objet différent de Personnage::getInstance("Merlin").
 * 
 * */
 
 
 class Personnage
 {
 
	private static $_instances = array();
	
	
	public static function getInstance( $param_key )
	{
		if ( !array_key_exists($param_key, self::$_instances) )
		{
			self::$_instances[$param_key] = new Personnage();
		}
		
		return self::$_instances[$param_key];
	}
	
	
	public function Personnage(){}

	
	public $name = null;
	
 }
 
Personnage::getInstance("Merlin")->name = "Merlin";



if( Personnage::getInstance("Merlin") === Personnage::getInstance("Merlin") )
{
	echo Personnage::getInstance("Merlin")->name;
}
 
 
 
 