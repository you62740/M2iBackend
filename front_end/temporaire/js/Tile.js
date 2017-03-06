function Tile(row, col, img, walkable)
{
	this.row = row;
	this.col = col;
	this.img = img;
	this.walkable = walkable;
	
	this._elem = document.createElement("div");
	this.draw();
}

Tile.prototype.img 		= null;
Tile.prototype.row 		= 0;
Tile.prototype.col 		= 0;
Tile.prototype._elem 	= null;
Tile.prototype.walkable = false;

Tile.prototype.getHTMLNode = function()
{
	return this._elem;
};

Tile.prototype.draw = function()
{
	var node = this.getHTMLNode();

	node.setAttribute("class", "tile" );
	node.setAttribute("id", "r-" + this.row + "-c-" + this.col );
	node.style.backgroundImage 	= 'url("'+ this.img +'")';
	node.style.left 			= this.col * CASE_WIDTH + "px";
	node.style.top 				= this.row * CASE_HEIGHT + "px";
	node.style.zIndex 			= 10;
};

