function Personnage(obj)
{
	Actor.apply(this,[obj]);
	this.nom 			= obj.nom;
	this.metier 		= obj.metier;
	this._pv 			= obj.pv;
	this._defMagic 		= obj.defMagic;
	this._defPhy 		= obj.defPhy;
	this._degats 		= obj.degats;
}

Personnage.prototype.metier 	= null;
Personnage.prototype.nom 		= null;
Personnage.prototype._pv 		= 100;
Personnage.prototype._defMagic 	= null;
Personnage.prototype._defPhy 	= null;
Personnage.prototype._degats 	= null;

//Accesseurs

Personnage.prototype.setPv = function(value){
	this._pv = value;
}

Personnage.prototype.getPv = function(){
	return this._pv;
}

Personnage.prototype.setDefMagic = function(value){
	this._defMagic = value;
}

Personnage.prototype.getDefMagic = function(){
	return this._defMagic;
}

Personnage.prototype.setDefPhy = function(value){
	this._defPhy = value;
}

Personnage.prototype.getDefPhy = function(){
	return this._defPhy;
}

//méthodes de Personnage

Personnage.prototype.parler = function(){
	alert("Je parle");
};

Personnage.prototype.getDamages = function(x){
	this._pv -= x;
};

Personnage.prototype.isDead = function(){
	return this._pv <= 0 ? true : false;
};



