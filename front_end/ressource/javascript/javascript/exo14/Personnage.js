

function Personnage()
{
	EventManager.apply(this);
}

Personnage._instances = new Object();

Personnage.getInstance = function(key)
{
	if( Personnage._instances[key] == undefined )
	{
		Personnage._instances[key] = new Personnage();
	}
	
	return Personnage._instances[key];
};

Personnage.prototype.name = null;
Personnage.prototype.age = 18;