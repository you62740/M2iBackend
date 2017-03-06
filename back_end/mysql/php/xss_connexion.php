<?php


session_start();

// on initialise les variables qui vont nous permettre de nous connecter
// à la bdd.
$dsn = 'mysql:dbname=pyrates;host=127.0.0.1';
$user = 'root';
$password = '';

$mon_pseudo = "";
$mon_passwd = "";


if( isset($_COOKIE['user_pseudo']) && !empty($_COOKIE['user_pseudo']) )
	$mon_pseudo = $_COOKIE['user_pseudo'];

if( isset($_COOKIE['user_password']) && !empty($_COOKIE['user_password']) )
	$mon_passwd = $_COOKIE['user_password'];

// puis on tente la connexion avec les paramètres fournis
try 
{
	// si on réussit, on obtient un objet de type PDO, qui va nous permettre
	// de manipuler la bdd
	$pdo = new PDO($dsn, $user, $password);
} 
catch (PDOException $e) 
{
	// sinon on affiche le message d'erreur qui va nous permettre de déterminer
	// pourquoi on a pas réussi à se connecter à la bdd.
	echo 'Connexion échouée : ' . $e->getMessage();
	exit();
}

// NEVER TRUST USER INPUT

if( 
	isset($_POST['pseudo']) &&
	!empty($_POST['pseudo']) &&
	isset($_POST['passwd']) &&
	!empty($_POST['passwd']) 
)
{
	$statement = $pdo->prepare("SELECT * FROM users WHERE pseudo=:pseudo AND passwd=:passwd LIMIT 1");
	$statement->bindParam(":pseudo", $_POST['pseudo'], PDO::PARAM_STR);
	$statement->bindParam(":passwd", $_POST['passwd'], PDO::PARAM_STR);
	
	$statement->execute();
	
	$data = $statement->fetchAll();
	
	
	if ( count($data) > 0)
	{
		$user_data  = $data[0];
		
		setcookie("user_password",$user_data['passwd']);
		setcookie("user_pseudo", $user_data['pseudo']);
		$_SESSION['connected'] = true;
		
		header("Location: xss.php");
		exit();
	}
}

?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title></title>
</head>
<body>
	<form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
		
		<label>Pseudo:</label>
		<input type="text" name="pseudo" value="<?php echo $mon_pseudo; ?>" />
		<br/>
		
		<label>Password:</label>
		<input type="text" name="passwd" value="<?php echo $mon_passwd; ?>"/>
		<br/>
		
		<input type="submit" value="OK" />
		
	</form>
</body>
</html>