<?php

header("Content-type: text/plain; charset=utf-8");


$allowedTables = array("customers", "employees", "products");
$customError = new stdClass();

if(	!isset($_REQUEST["table"]) || empty($_REQUEST["table"]) || !in_array($_REQUEST["table"], $allowedTables) )
{
	$customError->error = 'not allowed table';
	exit(json_encode($customError, JSON_UNESCAPED_UNICODE));
}
	
	

$filename = $_REQUEST["table"].'.json';

// table does'nt exists return error
if( file_exists($filename) === false )
{
	$customError->error = "table '".$_REQUEST["table"]."' does'nt exists";
	exit(json_encode($customError, JSON_UNESCAPED_UNICODE));
}

if( isset( $_REQUEST["data"] ) && !empty($_REQUEST["data"]) )
{
	$obj = json_decode(file_get_contents($filename));
	$obj->data = json_decode($_REQUEST["data"]);
	file_put_contents($filename, json_encode($obj, JSON_UNESCAPED_UNICODE) );
}


exit(file_get_contents($filename));
