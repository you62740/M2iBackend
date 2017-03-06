
/*hérite de voiture*/
function Ferrari(param_noise)
{
	Voiture.apply(this,[param_noise]);
}

Ferrari.prototype.makeNoise = function()
{
	// super appel de la méthode parente
	Voiture.prototype.makeNoise.apply(this); 
	console.log("méthode surchargée");
};

