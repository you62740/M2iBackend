
var tab 	= [50,80,78,1000,10,2,4,5,6,8,9,7,3,456,8000];
var max 	= tab.length;
var n 		= 0;
var i 		= 0; 
var current = 0;
var next 	= 0;
var prev	= 0;

for( n = 0; n < max; n++ )
{
	current = tab[n];
	next 	= tab[n+1]
	
	if( next == undefined || current <= next )
	{
		continue;
	}
	else
	{
		tab[n] = next;
		tab[n+1] = current;
		i = n;
		
		while( i > 0 )
		{
			current = tab[i] 		
			prev 	= tab[i-1];
			
			if( current < prev )
			{
				tab[i] = prev;
				tab[i-1] = current;
			}
			
			i--;
		}
		
	}
}


console.log(tab);