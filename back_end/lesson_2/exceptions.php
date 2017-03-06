<?php


class Mousquetaire
{
	private $_name;
	
	public function setName($param_name)
	{
		switch( $param_name )
		{
			case "Atos"			:
			case "Portos"		:
			case "Aramis"		:
			case "d'Artagnan"	:
				$this->_name = $param_name;
				break;
				
			default: 
				//$this->_name = "Portos";
				throw( new Exception("Ce mousquetaire n'existe pas.") );
				break;
		}
	}
	
	public function getName()
	{
		return $this->_name;
	}
}

$toto = new Mousquetaire();

// essayer 
try
{
	$toto->setName("tartampion");
}
catch( Exception $param_exception )
{
	// getMessage est une méthode commune à tout les objets de type "Exception"
	// on peut initialiser ce message en l'envoyant au constructeur de "Exception", 
	// à la création de chaque objet de type Exception donc.
	
	echo $param_exception->getMessage();
	echo '<br/> on donne un nom par défaut à notre mousquetaire. <br/>';
	$toto->setName("Aramis");
}

echo '**** nom de mon mousquetaire: ',$toto->getName();


