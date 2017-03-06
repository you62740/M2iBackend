function Personnage()
{
	function display()
	{
		console.log("toto");
	}

	
	this.hello = function()
	{
		this.hello.display = display;
	};
	
}

var toto = new Personnage();
//toto.hello();
//toto.hello.display();



console.log( toto instanceof Personnage );



