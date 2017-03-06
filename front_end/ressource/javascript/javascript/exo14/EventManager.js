function EventManager()
{
	this._tab = new Array();
}


EventManager.prototype._tab = null;

EventManager.prototype.ecouterEvenement = function(type, callback)
{
	var obj = new Object();
	obj.type = type;
	obj.callback = callback;
	
	this._tab.push(obj);
};

EventManager.prototype.envoyerEvenement = function(type, data)
{
	var i = this._tab.length;
	var current = null;
	
	while( --i > -1 )
	{
		current = this._tab[i];
		if( current.type == type )
		{
			current.callback(data);
		}
	}
};

EventManager.prototype.detruireEcouteur = function(type, callback)
{
	var tab = new Array();
	var i = this._tab.length;
	var current = null;
	
	while( --i > -1 )
	{
		current = this._tab[i];
		if( current.callback == callback && current.type == type )
			continue;
			
		tab.push(current);
	}
	
	this._tab = tab;
};

