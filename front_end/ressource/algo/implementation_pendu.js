


/*
- Créer une valeur "goodWord"
- Créer une valeur "userWord"
- Créer une valeur "currentLetter"
- Créer une valeur "nbChances"
- Créer une valeur "found"
*/

var wordList		= ["Younes", "Serge", "Rudy"];

//- Tirer un mot au hasard parmi une liste de mot et le stocker
// dans la valeur "goodWord".
var goodWord 		= wordList[Math.round( Math.random() * (wordList.length - 1) )];


/*
Stocker dans la valeur "userWord" une chaîne de caractères de même longueur que "goodWord" mais dont chaque lettre est une "*".
*/
var userWord 		= "";
var max 			= goodWord.length;
var i 				= 0;


for( i = 0; i < max; i++ )
{
	userWord += "*";
}


var currentLetter 	= null;

//- Stocker dans "nbChances" une valeur arbitraire
var nbChances 		= 10;
var found 			= false;

/*
Tant que "nbChances" est supérieur à 0 et que la valeur 
"userWord" contient au moins un caractère "*"
*/
while( nbChances > 0 && userWord.indexOf("*") > -1 )
{
	/*
		- Demander à l'utilisateur de saisir une lettre et stocker la lettre saisie dans "currentLetter".
	*/
	
	currentLetter = window.prompt("Saisissez une lettre").charAt(0);
	
	//- stocker la valeur "false" dans "found".
	
	found = false;
	
	/*
	Pour chaque caractère présent dans "goodWord" 
	*/
	
	i 	= 0; 
	max = goodWord.length;
	
	for( i = 0; i < max; i++ )
	{
		//Si les deux lettres sont les mêmes, 
		if( currentLetter === goodWord.charAt(i) )
		{
			/*
			remplacer le caractère "*" contenu 
			dans "userWord" se trouvant à la même 
			position que la lettre en cours par la 
			valeur contenue dans "currentLetter".
			*/
			
			var first = userWord.substr(0, i);
			var second = userWord.substr( i + 1 );
			
			userWord = first + currentLetter + second;
			//Passer la valeur de "found" à true.
			
			found = true;
		}
	}
	
	// Si "found" est égal à false décrémenter de une unité la valeur de "nbChances"
	nbChances--;
	alert(userWord+":"+nbChances);
}

//Si "userWord" ne contient plus aucun caractère "*" alors le joueur a gagné

if( userWord.indexOf("*") == -1 )
{
	alert("gagné !");
}
else
{
	alert("perdu !");
}

