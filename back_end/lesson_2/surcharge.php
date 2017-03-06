<?php


class Personnage
{
	public $x 		= 0;
	public $y 		= 0;
	public $name 	= null;
	
	public function sayHello()
	{
		echo $this->name,'<br/>';
		
	}
}

class Tarzan extends Personnage
{
	// on surcharge la méthode parente
	public function sayHello()
	{
		echo 'Moi ';
		parent::sayHello(); // 
		echo 'Toi Jane <br/>';
	}
}


$tarzan = new Tarzan();
$tarzan->name = "Tarzan";

$tarzan->sayHello();