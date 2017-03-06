<?php



$tab	= array(10,20,30,40,80);
$i 		= 0;
$max 	= count($tab);

for( $i = 0; $i < $max; $i++ )
{
	echo( $tab[$i]."<br/>" );
}


$tab	= array(
	"rudy" 		=> "beau",
	"thomas" 	=> "sympa"
);

foreach( $tab as $key=>$value )
{
	echo( $key.":".$value."<br/>" );
}

$tab	= array(10, 20, 30, 40, 80);

foreach( $tab as $key=>$value )
{
	echo( $key.":".$value."<br/>" );
}



$nom = "johann";
$$nom = 10;

// $$nom = $ -> ?  ? = $nom . $nom ? -> "johann"
// $$nom = $"johann" = $johann;

echo( $johann );

/*

exercice: 


Créer un tableau contenant les noms des participants à la formation, puis créer autant de variables portant le nom de ces personnes à l'aide d'une boucle foreach et de la notation "variable dynamique" ( $$ ).
*/



$tab = array("nicolas", "richard", "mohammed", "johann");

foreach( $tab as $value )
{
	$$value = $value;
}

echo( $richard );





