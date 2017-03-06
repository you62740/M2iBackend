/*hérite d'item*/
function LifePotion(data){
	Item.apply(this,[data.nom, data.type, data.price, data.weight]);
	this.restoration = data.restoration;
}