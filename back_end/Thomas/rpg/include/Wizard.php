<?php 
Class Wizard extends Personnages
{
	private $_mana = null;
	private $_wandstick = null;
	
	public function __construct($param_name, $param_pv, $param_labor, $param_power,$param_mana, $param_wandstick)
	{
		parent::__construct($param_name, $param_pv, $param_labor, $param_power);
		
		$this->_mana = $param_mana;
		$this->_wandstick = $param_wandstick;
	}
	
	public function getMana()
	{
		return $this->_mana;
	}
	
	public function setWandstick($param_weapon)
	{
		$this->_wandstick = $param_weapon;
		$this->_wandstick->power = 5;
	}
	
	public function getWandstick()
	{
		return $this->_wandstick;
	}
	
	public function attack($cible)
	{
		
		$booster = round( rand(1,10) );
	
		if( $this->_wandstick != null && $this->_mana > 0){
			echo '<li class="collection-item">'. $this->name .' attaque avec '. $this->_wandstick .'</li>';
			$cible->getDamages($this->_power + $booster);
			$this->_mana -= 2;
		}
		else{
			echo '<li class="collection-item">'. $this->name .' attaque avec ses poings </li>';
			$cible->getDamages($this._power);
		}
		$cible->getDamages($this->_power);
	}
}