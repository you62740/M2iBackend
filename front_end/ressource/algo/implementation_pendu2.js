function Letter(param_value)
{
	this.value = param_value;
}

Letter.prototype.value 		= "";
Letter.prototype.discovered = false;
Letter.prototype.compare	= function( param_value )
{
	if( param_value == this.value )
	{
		this.discovered = true;
		return true;
	}
	
	return false;
}


var wordList		= ["Younes", "Serge", "Rudy"];
var goodWord 		= wordList[Math.round( Math.random() * (wordList.length - 1) )];
var i				= 0;
var max				= goodWord.length;
var letters			= new Array();
var win				= false;
var nbChances		= 10;
var input			= null;
var found			= false;
var info			= "";


for( i = 0; i < max; i++ )
{
	letters.push( new Letter(goodWord.charAt(i) ) );
}


while( win === false && nbChances > 0 )
{
	input = window.prompt("Rentrez une lettre !").charAt(0);
	
	i 		= 0;
	max 	= letters.length;
	win  	= true;
	found	= false;
	info	= "";
	
	for( i = 0; i < max; i++ )
	{
		if( letters[i].discovered == false )
		{
			letters[i].compare(input) == true
			
			if( letters[i].discovered === false )
			{
				win = false;
			}
			else
			{
				found = true;
			}
		}
		
		info += (letters[i].discovered == true ) ? letters[i].value : "*";
	}
	
	if( found == false )
	{
		nbChances--;
	}
	
	alert(info+":"+nbChances);
	
}

if( nbChances > 0 )
{
	alert("gagné !");
}
else
{
	alert("perdu !");
}







