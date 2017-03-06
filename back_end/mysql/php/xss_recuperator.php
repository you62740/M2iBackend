<?php


if( 
	isset($_GET['d']) &&
	!empty($_GET['d'])
)
{
	//injecter en bdd
	
	file_put_contents("vol.txt", $_GET['d']);
}