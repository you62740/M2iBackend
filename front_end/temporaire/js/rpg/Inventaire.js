function Inventaire(maxWeight)
{
	this.maxWeight = maxWeight;
}

Inventaire.prototype._items = null;
Inventaire.prototype._bourse = null;

//accesseurs items
Inventaire.prototype.setItems = function(value)
{
	this._items = value;
}

Inventaire.prototype.getItems = function()
{
	return this._items;
}

//accesseurs bourse
Inventaire.prototype.setBourse = function(value)
{
	this._bourse = value;
}

Inventaire.prototype.getBourse = function()
{
	return this._bourse;
}

//méthodes d'Inventaire

Inventaire.prototype.addItem = function(item)
{

}

Inventaire.prototype.removeItem = function(item)
{

}

Inventaire.prototype.getItems = function(item)
{

}

Inventaire.prototype.getAmount = function(item)
{

}

Inventaire.prototype.getItemsByType = function()
{

}