function Carre(obj)
{
	Forme.apply(this, [obj] );
}

Carre.prototype.render = function(context)
{
	context.save();
	context.translate(this.x, this.y);
	context.beginPath();
	context.fillStyle = this.color;
	context.fillRect(0,0,this.width, this.height);
	context.fill();
	context.closePath();
	context.restore();
};