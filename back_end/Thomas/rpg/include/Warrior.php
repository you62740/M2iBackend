<?php 
Class Warrior extends Personnages
{
	private $_weaponLeft = null;
	private $_weaponRight = null;
	public function __construct($param_name, $param_pv, $param_labor, $param_power)
	{
		parent::__construct($param_name, $param_pv, $param_labor, $param_power);
	}
	public function setWeaponLeft($param_weapon)
	{
		$this->_weaponLeft = $param_weapon;
		$this->_weaponLeft->power = 5;
	}
	public function setWeaponRight($param_weapon)
	{
		$this->_weaponRight = $param_weapon;
		$this->_weaponRight->power = 5;
	}
	public function attack($param_ennemy)
	{
		if($this->_weaponLeft != null)
		{
			echo '<li class="collection-item">'.$this->name ."attaque". $param_ennemy->name. "avec". $this->_weaponLeft->nom.'</li>';
			$param_ennemy->getDamages($this->_weaponLeft->power);		
		}
		if($this->_weaponRight != null)
		{
			echo '<li class="collection-item">'.$this->name ."attaque". $param_ennemy->name ." avec ". $this->_weaponRight->nom.'</li>';
			$param_ennemy->getDamages($this->_weaponRight->power);
		}
		else{
			echo '<li class="collection-item">'.$this->name." attaque ". $param_ennemy->name ." avec ses poings </li>";
			$param_ennemy->getDamages($this->_power);
		}
	}
}