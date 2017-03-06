<?php
	$dsn = 'mysql:dbname=pyrates;host=127.0.0.1';
	$user = 'root';
	$password = '';

	try 
	{
		$pdo = new PDO($dsn, $user, $password);
	} 
	catch (PDOException $e) 
	{
		echo $e->getMessage();
		exit();
	}