function Voiture()
{
	var btn = document.getElementById("strtBtn");
	btn.addEventListener("click", this.start.bind(this) );
}

Voiture.prototype.bruit = "vroum";

Voiture.prototype.start = function(event)
{
	console.log(this.bruit);
};




function main()
{
	var cacahuete = new Voiture();
}

window.addEventListener("load", main);