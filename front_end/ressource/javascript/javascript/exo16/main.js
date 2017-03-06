function Personnage()
{
	
	var _age = 0;
	var scope = this;
	
	
	function _range(value)
	{
		console.log(scope);
		
		if( value > 1000 )
		{
			return 1000;
		}
		else if( value < 0 )
		{
			return 0;
		}
		else
		{
			return value;
		}
	}
	
	
	this.setAge = function(value)
	{
		_age = _range(parseInt(value));
	};
	
	this.getAge = function()
	{
		return _age;
	};
	
}

function main()
{
	var toto = new Personnage();
	toto.setAge(8000);
}


window.addEventListener("load", main);
