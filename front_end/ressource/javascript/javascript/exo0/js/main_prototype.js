function Weapon( param_nom, param_power)
{
	this.nom = param_nom;
	this.power = param_power;
}

Weapon.prototype.nom 	= null;
Weapon.prototype.power 	= 0;


function Warrior(param_name)
{
	this.nom = param_name;
	console.log("nouveau guerrier: "+ this.nom);
}

Warrior.prototype.nom 			= "Conan";
Warrior.prototype._pv 			= 100;
Warrior.prototype._degats 		= 5;
Warrior.prototype._weaponLeft	= null;
Warrior.prototype._weaponRight	= null;


Warrior.prototype.setWeaponLeft	= function(param_weapon)
{
	this._weaponLeft = param_weapon;
};

Warrior.prototype.setWeaponRight	= function(param_weapon)
{
	this._weaponRight = param_weapon;
};

Warrior.prototype.getWeaponLeft	= function()
{
	return this._weaponLeft;
};

Warrior.prototype.getWeaponRight	= function()
{
	return this._weaponRight;
};

Warrior.prototype.attack		= function(param_ennemy)
{
	var booster = 0;
	var degats = 0;
	
	if( this._weaponRight != null )
	{
		console.log(this.nom +" attaque "+param_ennemy.nom+" avec: "+this._weaponRight.nom);
		booster = Math.round( Math.random() * 10 );
		degats = this._weaponRight.power + booster;
		
		param_ennemy.getDammages(degats);
	}
	
	if( this._weaponLeft != null )
	{
		console.log(this.nom +" attaque "+param_ennemy.nom+" avec: "+this._weaponLeft.nom);
		booster = Math.round( Math.random() * 10 );
		degats = this._weaponLeft.power + booster;
		
		param_ennemy.getDammages(degats);
	}
	
	if( this._weaponLeft == null && this._weaponRight == null )
	{
		console.log(this.nom +" attaque "+param_ennemy.nom+" avec: ses poings");
		degats = this._degats;
		param_ennemy.getDammages(degats);
	}
};

Warrior.prototype.getDammages 	= function(param_degats)
{
	this._pv -= param_degats;
	
	if( this._pv < 0 )
	{
		this._pv = 0;
	}
};

Warrior.prototype.getPV			= function()
{
	return this._pv;
};

Warrior.prototype.isDead		= function()
{
	if( this._pv <= 0 )
	{
		return true;
	}
	else
	{
		return false;
	}
};



function MagicWand(param_nom, param_consoMana, param_power)
{
	this.nom 		= param_nom;
	this.consoMana 	= param_consoMana;
	this.power 		= param_power;
}

MagicWand.prototype.nom 		= null;
MagicWand.prototype.consoMana 	= 0;
MagicWand.prototype.power 		= 0;



function Wizzard(param_nom)
{
	this.nom = param_nom;
}

Wizzard.prototype.nom 			= "Merlin";
Wizzard.prototype.mana 			= 100;
Wizzard.prototype._pv 			= 100;
Wizzard.prototype._degats 		= 3;
Wizzard.prototype._wandstick 	= null; 

Wizzard.prototype.setMagicWand	= function(param_magicwand)
{
	this._wandstick = param_magicwand;
};

Wizzard.prototype.getMagicWand	= function()
{
	return this._wandstick;
};

Wizzard.prototype.attack		= function(param_ennemy)
{
	var booster = Math.round( Math.random() * 10 );
	
	if( this._wandstick != null && this.mana >= this._wandstick.consoMana)
	{
		console.log(this.nom +" attaque "+param_ennemy.nom+" avec: "+this._wandstick.nom);
		param_ennemy.getDammages(this._degats + booster);
		this.mana -= this._wandstick.consoMana;
	}
	else
	{
		console.log(this.nom +" attaque "+param_ennemy.nom+" avec ses poings ");
		param_ennemy.getDammages(this._wandstick.power + booster);
	}
};

Wizzard.prototype.getDammages 	= function(param_degats)
{
	this._pv -= param_degats;
	
	if( this._pv < 0 )
	{
		this._pv = 0;
	}
};

Wizzard.prototype.getPV			= function()
{
	return this._pv;
};

Wizzard.prototype.isDead		= function()
{
	if( this._pv <= 0 )
	{
		return true;
	}
	else
	{
		return false;
	}
};





var mere_theresa = new Wizzard("Mère Theresa");
var robocop = new Warrior("Robocop");


robocop.setWeaponRight( new Weapon("Pistolet à eau", 10) );
robocop.setWeaponLeft( new Weapon("Lance grenades", 15) );

mere_theresa.setMagicWand( new MagicWand("Crucifix",50,25) );


while( !mere_theresa.isDead() && !robocop.isDead() )
{
	console.log("*********************************************************");
	
	mere_theresa.attack(robocop);
	
	console.log("Point de vies de "+robocop.nom+": "+robocop.getPV());
	
	if( robocop.isDead() )
	{
		break;
	}
	
	robocop.attack(mere_theresa);
	
	console.log("Point de vies de "+mere_theresa.nom+": "+mere_theresa.getPV());
	
	console.log("*********************************************************");
}



