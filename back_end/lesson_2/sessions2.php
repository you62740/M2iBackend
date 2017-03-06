<?php

session_start();

/*
session_destroy();
$_SESSION = array();
exit('destruction de la session');
*/



if( !isset( $_SESSION['counter'] ) )
{
	$_SESSION['counter'] = 0;
	echo 'initialisation du compteur...';
}
else
{
	
	$_SESSION['counter']++;
	
	if( $_SESSION['counter'] > 10 )
	{
		session_destroy();
		$_SESSION = array();
	}
	
	if ( isset($_SESSION['counter']) )
	{
		echo 'la session est encore active';
	}
}