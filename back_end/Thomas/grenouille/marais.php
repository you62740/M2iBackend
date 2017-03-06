<?php
Class Swamp
{
	public $frogs = null;
	public $distance = null;
	public $id = null;
	static private $nb = 0;
	
	public function __construct($param_distance)
	{
		$this->frogs = Array() ;
		$this->distance = (int)($param_distance);
		$this->id = self::$nb;
		self::$nb ++;
	}
}