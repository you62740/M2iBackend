<?php
Class Personnages
{
	public $name = null;
	public $labor = null;
	
	protected $_power = null;
	protected $_pv = null;
	
	public function __construct($param_name, $param_pv, $param_labor, $param_power)
	{
		$this->name = $param_name ;
		$this->labor = $param_labor ; 
		$this->_pv = $param_pv ;
		$this->_power = $param_power ;
	}
	
	public function setPV($value)
	{
		if($this->_pv - $value < 0)
		{
			$this->_pv = 0 ;
		}
		
		else
		{
			$this->_pv = $value ;
		}
	}
	
	public function getPV()
	{
		return $this->_pv ;
	}
	
	public function getPower()
	{
		return $this->_power ;
	}
	
	public function isDead()
	{
		return ($this->_pv <= 0) ? True : False ;
	}
	
	public function getDamages($value)
	{
		if($this->_pv - $value < 0)
		{
			$this->_pv = 0 ;
		}
		
		else
		{
			$this->_pv -= $value ;
		}
	}
}