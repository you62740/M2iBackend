function Grenouille(){}

function Marecage(param_distance)
{
	this.distance 		= param_distance
	this.grenouilles 	= new Array();
}

Marecage.prototype.grenouilles = null;
Marecage.prototype.distance = 0;



var grenouillere = [	
					new Grenouille(), 
					new Grenouille(),
					new Grenouille(),
					new Grenouille(),
					new Grenouille(),
					new Grenouille(),
					new Grenouille()
				];
				
var marecages = [
			new Marecage(10),
			new Marecage(2),
			new Marecage(20)
];

var max = grenouillere.length;
var i 	= 0;
var j	= 0;
var o	= 0;
var z 	= max;
var d	= 0;

var currentGrenouille = null;
var currentMarecage = null;


while( grenouillere.length > 0 )
{
	o = 0;
	z = max;
	j = marecages.length;
	d = 10000;
	
	currentGrenouille = grenouillere.shift();
	
	
	while( --j > -1 )
	{
		currentMarecage = marecages[j];
		
		if( currentMarecage.grenouilles.length <= z && currentMarecage.distance <= d )
		{
			z = currentMarecage.grenouilles.length;
			d = currentMarecage.distance;
			o = j;
		}
	}
	
	
	
	marecages[o].grenouilles.push(currentGrenouille);
}

console.log(marecages);

