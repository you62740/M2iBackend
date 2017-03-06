<?php

// renvoie un nouvel objet vide

/*
$voiture = new stdClass();


$voiture->marque = "Citroën";


echo( $voiture-> marque );

var_dump($voiture);
*/



class Voiture
{
	public $price 		= 1; // tout le monde peut utiliser cette propriété
	
	protected $_marque 	= null; //  les classes filles pourront utiliser cette propriété mais pas les élements à l'extérieur de l'objet
	
	private $_conso 	= 1; // les classes filles ne pourront pas utiliser cette propriété
	
	
	// la fonction constructrice, peut prendre soit le nom __construct
	// soit le nom de la classe. Elle sera appelée, à chaque nouvelle
	// création d'objet.
	
	// dès qu'un paramètre possède une valeur par défaut, tout ceux qui le suivent
	// doivent également en avoir une.
	public function Voiture($param_price 	= 1, 
							$param_marque 	= null, 
							$param_conso 	= 1
	)
	{
		$this->price 	= $param_price;
		$this->_marque 	= $param_marque;
		//$this->_conso 	= $param_conso;
		
		$this->setConso($param_conso);
		
		echo("nouvel objet de type voiture ! <br/> <br/>");
	}
	
	// le mot clé final, rend une méthode non surchargeable
	public final function setConso($param_conso) // 1 - 40
	{
		// convertit la donnée en nombre flottant ( à virgule )
		$value = (float)($param_conso);
		
		if ( $value >= 1 && $value <= 40 )
		{
			$this->_conso = $param_conso;
		}
	}
	
	public final function getConso()
	{
		return $this->_conso;
	}
	
	protected function _startEngine()
	{
		echo 'allume le moteur <br/>';
	}
	
	protected function _startLights()
	{
		echo 'allume les phares <br/>';
	}
	
	protected function _stopEngine()
	{
		echo 'allume le moteur <br/>';
	}
	
	protected function _stopLights()
	{
		echo 'allume les phares <br/>';
	}
	
	
	public function start()
	{
		echo "*********** demarre la voiture ************* <br/>";
		$this->_startEngine();
		$this->_startLights();
		echo "******************************************** <br/>";
	}
	
	public function stop()
	{
		echo "*********** stoppe la voiture ************* <br/>";
		$this->_stopEngine();
		$this->_stopLights();
		echo "******************************************** <br/>";
	}
	
	
}


class Batmobile extends Voiture
{

	// propriété statique publique, qui appartient à la classe 
	// Batmobile ET NON PAS A UN OBJET DE TYPE BATMOBILE !!
	static private $_counter = 0;
	
	/* 	
		renvoie une nouvelle instance de Batmobile, dont la propriété 
		"id" sera unique en se basant sur la valeur de la propriété 
		privée statique de la classe Batmobile
		
		en implémentant une méthode statique, qui s'assure de l'unicité
		de chaque instance, on fait en sorte de respecter le design pattern 
		"factory".
		
		On accède aux propriétés et méthodes statiques à l'aide du mot clé "self"
	*/
	static public function create()
	{
		$bagnole = new Batmobile(self::$_counter);
		self::$_counter++;
		
		return $bagnole;
	}
	
	
	
	
	/****************************************************************************/
	/****************************************************************************/
	/****************************************************************************/
	/****************************************************************************/
	
	
	protected $_id = 0;
	
	public function Batmobile(
							$param_id,
							$param_price 	= 1, 
							$param_marque 	= null, 
							$param_conso 	= 1
	)
	{
		parent::Voiture($param_price, $param_marque, $param_conso);
		
		$this->_id = $param_id;
		echo '<h1>en fait je suis une batmobile ! '.$this->_id.'</h1><br/>';
	}
	
	
	protected function _startBatRockets()
	{
		echo 'allume les batrockets ! <br/>';
	}
	
	// surcharge de la fonction parente
	public function start()
	{
		/*
		parent::start();
		$this->_startBatRockets();
		*/
		
		echo "*********** demarre la batmobile ************* <br/>";
		$this->_startEngine();
		$this->_startLights();
		$this->_startBatRockets();
		echo "******************************************** <br/>";
	}
	
}


$google = Batmobile::create();
$google = Batmobile::create();
$google = Batmobile::create();
$google = Batmobile::create();
$google = Batmobile::create();
$google = Batmobile::create();
$google = Batmobile::create();

$google->start();
$google->stop();


/*

Coder une methode statique nommée "getInstance", qui nous renvoie toujours la même instance de Batmobile. Attention, l'instance doit être la seule et unique possible.
*/


//if( Batmobile::getInstance() == Batmobile::getInstance()  ) // true

//new Batmobile();



