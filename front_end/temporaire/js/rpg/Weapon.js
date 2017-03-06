/*hérite d'item*/
function Weapon(data)
{
	Item.apply(this, [data]);
	this.power = data.power;
}
	
	