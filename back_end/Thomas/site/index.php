<!DOCTYPE html>
<html lang="fr">
<head>
	<title>
		Page de connexion
	</title>
	<meta charset="utf-8">
</head>
<body>
<?php include 'include/header.php' ?>
	<form method="POST" action="article.php">
		<label> Login </label>
		<input type="text" name="login" />
		<label> Password </label>
		<input type="password" name="passwd" />
		<input type="submit" name="send_form" value="connexion" />
	</form>
</body>
</html>