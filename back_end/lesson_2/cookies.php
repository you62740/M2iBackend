<?php

if( isset($_GET['create']) && $_GET['create'] == "ok" )
{
	setcookie("xmas", "santa claus", time() + (10));
}


var_dump($_COOKIE);