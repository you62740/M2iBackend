/*hérite de personnage + ses propriétés*/
function Wizard(data)
{
	Personnage.apply(this, [data]);
	this._mana = data.mana;
}

Wizard.prototype._mana = null;
Wizard.prototype._wandstick = null;

//accesseurs wandstick
Wizard.prototype.setWandstick = function(wandstick){
	this._wandstick = wandstick;
}

Wizard.prototype.getWandstick = function(){
	return this._wandstick;
}

Personnage.prototype.getMana = function(){
	return this._mana;
}

Wizard.prototype.attack	= function(param_ennemy){
	var booster = Math.round( Math.random() * 10 );
	
	if( this._wandstick != null && this._mana >= this._wandstick.consoMana){
		console.log(this.nom, "attaque", param_ennemy.nom, "avec", this._wandstick.nom);
		param_ennemy.getDamages(this._wandstick.power + booster);
		this._mana -= this._wandstick.consoMana;
	}
	else{
		console.log(this.nom, "attaque", param_ennemy.nom, "avec ses poings ");
		param_ennemy.getDamages(this._degats);
	}
};


