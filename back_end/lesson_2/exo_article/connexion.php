<?php

$users = array(
	"richard" => "123richard",
	"melissa"=>"romualdo_naked"
);


session_start();


if( isset($_POST['login']) 							&&
	isset($_POST['passwd']) 						&&
	array_key_exists($_POST['login'], $users) 		&&
	$users[ $_POST['login'] ] == $_POST['passwd']
)
{
	$_SESSION['connected'] = true;
	header("Location: ./article.php");
	exit();
}




?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title></title>
</head>
<body>
	<form method="POST" action="">
		<label>Login:</label>
		<input type="text" name="login" value="" />
		<br/>
		
		<label>Password:</label>
		<input type="password" name="passwd" value="" />
		<br/>
		
		<input type="submit" value="Connexion" />
	</form>
</body>
</html>