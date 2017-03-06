<?php 	
	require_once 'database.php';
	
	if(isset($_POST))
	{
		$name = $_POST['name'];
		$price = $_POST['price'];
		$weight = $_POST['weight'];
		$power = $_POST['power'];
		
		$sql = " INSERT INTO pyrates_weapons (name, price, weight, power) VALUES ('". $name . "','" . $price . "','". $weight . "','" . $power . "') ";

		$statement = $pdo->query($sql);

		if( $statement === false )
		{
			var_dump($pdo->errorInfo());
		}
		
		else
		{
			header("Location: index.php");
		}
	}
?>
