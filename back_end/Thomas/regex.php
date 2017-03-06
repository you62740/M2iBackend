<?php
	$chaineDeCaractere = "Spleeeeeeeeeendide" ;
	$regex = "#sple+ndide#i" ;
	
	echo preg_match($regex, $chaineDeCaractere) ? 'VRAI' : 'FAUX' ;
?>