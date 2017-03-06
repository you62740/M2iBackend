/*hérite de PNJ*/
function Marchand(nom, inventory, magasin)
{
	PNJ.apply(this,[nom,inventory]);
	this.magasin = magasin;
}

//méthodes de Marchand

Marchand.prototype.buy = function(item,personnage)
{

}

Marchand.prototype.sell = function(item,personnage)
{

}
