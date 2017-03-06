<?php

require_once 'config.php';

// cette fonction retourne l'ensemble des thèmes pour tout les articles
function getThemes($param_db)
{
	$sql = 'SELECT theme FROM news';
	$statement = $param_db->query($sql);
	return $statement->fetchAll();
}

// cette fonction retourne l'ensemble des articles rédigés correspondant
// à un thème précis

function getNewsByTheme($param_db, $param_theme)
{
	$sql = "SELECT * FROM news WHERE theme = :theme";
	$statement = $param_db->prepare($sql);
	$statement->bindParam(':theme', $param_theme, PDO::PARAM_STR);
	$statement->execute();
	
	return $statement->fetchAll();
}

// thème par défaut
$theme = 'politique';


// on vérifie si l'utilisateur a bien envoyé un thème à l'aide du formulaire
if( isset($_POST['theme']) && !empty($_POST['theme']) )
{
	$theme = $_POST['theme'];
}


// on récupère l'ensemble des articles correspondants au thème en cours
$news = getNewsByTheme($pdo, $theme);

// on récupère la liste des thèmes pour notre liste déroulante
$theme_liste = getThemes($pdo);

?>


<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title></title>
</head>
<body>
	
	<form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
		<select name="theme">
			<?php
			
				// ici on crée un menu déroulant qui nous permet
				// de sélectionner le thème des articles que l'on souhaite
				// visualiser
				foreach( $theme_liste as $current_theme )
				{
					echo '<option value="'.$current_theme['theme'].'">'.$current_theme['theme'].'</option>';
				}
			?>
		</select>
		<input type="submit" value="Filtrer"/>
	</form>

		
	<?php
	
	echo '<h1>Catégorie: '.$theme.'</h1>';
	
	foreach( $news as $article )
	{
		echo '<h2>'.$article['title'].'</h2>';
		echo '<div>'.$article['content'].'</div>';
	}
	
	?>
	
</body>
</html>