<?php

require_once 'config.php';

//pullitzer
//luthor

function redirectToMySelf()
{
	header("Location: ".$_SERVER['PHP_SELF']);
	exit();
}

function getNews($param_pdo)
{
	$sql = 'SELECT * FROM news';
	$statement = $param_pdo->query($sql);
	return $statement->fetchAll();
}

function isLogged()
{
	
	if ( 	
			isset($_SESSION['connected']) && 
			$_SESSION['connected'] == true 
	)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function login($param_pdo, $param_user, $param_passwd)
{
	$sql = 'SELECT * FROM reporters WHERE login=:login AND passwd=MD5(:passwd)';
	$statement = $param_pdo->prepare($sql);
	$statement->bindParam(':login', $param_user, PDO::PARAM_STR);
	$statement->bindParam(':passwd', $param_passwd, PDO::PARAM_STR);
	$statement->execute();
	
	$data = $statement->fetchAll();
	
	if ( count($data) < 1 )
	{
		return false;
	}
	else
	{
		return true;
	}
}


// si on reçoit des données du formulaire de connexion...
if( 
	isset($_POST['login']) &&
	!empty($_POST['login']) &&
	isset($_POST['passwd']) &&
	!empty($_POST['passwd'])
)
{
	// on va tenter de se connecter avec les identifiants
	// envoyés en paramètre
	$login_success = login($pdo, $_POST['login'], $_POST['passwd'] );
	$_SESSION['connected'] = $login_success;
	redirectToMySelf();
}

// si on reçoit des données du formulaire de création de contenu...
if( 
	isLogged() == true 			&&
	isset($_POST['title']) 		&&
	!empty($_POST['title']) 	&&
	isset($_POST['content']) 	&&
	!empty($_POST['content']) 	&&
	isset($_POST['theme']) 		&&
	!empty($_POST['theme'])
)
{
	// on va insérer les données en bdd
	$sql = "INSERT INTO news (title,theme,content,date) VALUES(:title, :theme, :content, NOW() )";
	$statement = $pdo->prepare($sql);
	$statement->bindParam(':title', $_POST['title'], PDO::PARAM_STR);
	$statement->bindParam(':theme', $_POST['theme'], PDO::PARAM_STR);
	$statement->bindParam(':content', $_POST['content'], PDO::PARAM_STR);
	$statement->execute();
	
	redirectToMySelf();
}


if( isLogged() == true 					&&
	isset( $_POST['delete_news_id'] ) 	&&
	!empty($_POST['delete_news_id'])
)
{
	$sql = 'DELETE FROM news WHERE id=:id';
	$statement = $pdo->prepare($sql);
	$statement->bindParam(':id', $_POST['delete_news_id'], PDO::PARAM_INT);
	$statement->execute();
	
	redirectToMySelf();
}

if( isLogged() == true 					&&
	isset( $_POST['update_title'] ) 	&&
	!empty($_POST['update_title'])		&&
	isset( $_POST['update_theme'] ) 	&&
	!empty($_POST['update_theme'])		&&
	isset( $_POST['update_content'] ) 	&&
	!empty($_POST['update_content'])	&&
	isset( $_POST['update_news_id'] ) 	&&
	!empty($_POST['update_news_id'])
)
{
	$sql = 'UPDATE news SET title=:title, theme=:theme, content=:content WHERE id = :id';
	$statement = $pdo->prepare($sql);
	$statement->bindParam(':id', $_POST['update_news_id'], PDO::PARAM_INT);
	$statement->bindParam(':title', $_POST['update_title'], PDO::PARAM_STR);
	$statement->bindParam(':theme', $_POST['update_theme'], PDO::PARAM_STR);
	$statement->bindParam(':content', $_POST['update_content'], PDO::PARAM_STR);
	$statement->execute();
	
	redirectToMySelf();
}

$all_news = getNews($pdo);

?>


<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title></title>
</head>
<body>
	<h1>Administration</h1>
	<?php
		if( isLogged() == false )
		{
	?>
	<form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
		
		<label>Login</label>
		<input type="text" name="login" />
		<br/>
		
		<label>Mot de passe</label>
		<input type="text" name="passwd" />
		<br/>
		
		<input type="submit" value="Se connecter"/>
	</form>
	<?php
		}
		else
		{
	?>
		
	<h2>Création</h2>
	<form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
		
		<label>Titre:</label><input type="text" name="title"/><br/>
		<label>Theme:</label><input type="text" name="theme"/><br/>
		
		<label>Contenu:</label>
		<textarea name="content">
		</textarea>
		<br/>
		
		<input type="submit" value="Créer"/>
		
	</form>
	
	<h2>Suppression</h2>
	<form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
		
		<select name="delete_news_id">
			<?php
			
				foreach( $all_news as $current_new )
				{
					echo '<option value="'.$current_new['id'].'" >'.$current_new['title'].'</option>';
				}
			?>
		</select>
		<input type="submit" value="Supprimer"/>
		
	</form>
	
	<h2>Modification</h2>
	<form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
		
		<label>Article à modifier</label>
		<select name="update_news_id">
			<?php
			
				foreach( $all_news as $current_new )
				{
					echo '<option value="'.$current_new['id'].'" >'.$current_new['title'].'</option>';
				}
			?>
		</select>
		<br/>
		
		<label>Titre:</label><input type="text" name="update_title"/><br/>
		<label>Theme:</label><input type="text" name="update_theme"/><br/>
		
		<label>Contenu:</label>
		<textarea name="update_content">
		</textarea>
		<br/>
		
		<input type="submit" value="Modifier"/>
		
	</form>
	
	<?php
		}
	?>
	
</body>
</html>