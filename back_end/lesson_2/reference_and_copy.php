<?php
/*

En PHP, les références sont un moyen d'accéder au contenu d'une même 
variable en utilisant plusieurs noms. 

Ce ne sont pas des pointeurs en mémoire, mais globalement, 
on les utilise comme tels, cad que l'on peut modifier les valeurs contenues
à un endroit en mémoire en employant un "nom" ( une variable ), puis 
utiliser un autre "nom" (une autre variable) pour manipuler la même donnée. 

Dans l'exemple ci-dessous, le tableau $tab est passé par référence à la fonction
addRandomInTab, ce qui nous permet de manipuler le tableau et de lui ajouter
des nombres aléatoires. 

*/

function addRandomInTab( &$param_tab )
{
	$i = 0;
	$max = 10;
	
	for ( $i = 0; $i < $max; $i++ )
	{
		array_push( $param_tab, rand(0, 1000) );
	}
}


$tab1 = array();

addRandomInTab($tab1);

$tab2 =& $tab1;


var_dump($tab2);
