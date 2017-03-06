
function Voiture(param_noise)
{
	this._noise = param_noise;
}

Voiture.prototype._noise = null;

Voiture.prototype.setNoise = function(value)
{
	this._noise = value;
};

Voiture.prototype.getNoise = function()
{
	return this._noise;
};

Voiture.prototype.makeNoise = function()
{
	alert(this._noise);
};