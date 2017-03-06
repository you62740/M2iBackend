function Cercle(obj)
{
	Forme.apply(this, [obj] );
}

Cercle.prototype.render = function(context)
{
	// admettons que le context.fillStyle = "cacahuete";
	context.save(); // je sauvegarde mon contexte à l'instant t1
	
	context.translate(this.x, this.y);
	context.beginPath();
	context.fillStyle = this.color; // je modifie mon fillStyle*
	context.arc( 0, 0, this.width / 2, 0, 2 * Math.PI );
	context.fill();
	context.closePath();
	
	context.restore(); // restaure le contexte à l'instant t1 mon fillStyle vaut de nouveau cacahuete
};