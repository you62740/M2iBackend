<?php
if(isset($_POST['send_form']))
{	
	session_start();
	$_SESSION['name'] = $_POST['login'];
}
else
{
	header("Location: index.php");
	exit(0);
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
	<title>
		Mon super article
	</title>
	<meta charset="utf-8">
	<style>
		article{
			width: calc(100%/3);
		}
	</style>
</head>
<body>
	<?php include './include/header.php' ?>
	<section>
		<article>
			<h2>FrontMan && BackBoys</h2>
			<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur purus velit, fermentum eleifend sem sed, volutpat luctus justo. Phasellus congue finibus commodo. Vivamus ac justo eros. Ut et neque at ligula tincidunt bibendum. Ut id mauris sed elit ornare sagittis nec tincidunt purus. Praesent dignissim vestibulum quam, ut vehicula ligula aliquet in. Sed eleifend odio convallis, pretium libero non, convallis neque. Morbi vulputate nisl non odio pharetra eleifend. Curabitur viverra arcu quam, vel volutpat nunc lobortis vitae. Curabitur in laoreet eros. Aenean nisi arcu, aliquet nec pulvinar eget, ornare non velit. Etiam lobortis tempus dignissim. Etiam tempor semper vehicula.

Cras sit amet ipsum ex. Mauris dapibus, magna at efficitur luctus, leo diam pulvinar felis, in rhoncus odio neque at ligula. Donec sagittis scelerisque mauris ut tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam laoreet blandit est, in ultrices lorem dapibus sed. Curabitur elit nisi, imperdiet vitae aliquet nec, ullamcorper a magna.

Quisque rhoncus placerat dolor at suscipit. Donec tincidunt congue tempor. Aenean vel molestie odio, ac tempor elit. Mauris vehicula magna sapien, ut sollicitudin ligula tempus a. Praesent sollicitudin nibh nec dui tristique scelerisque. Quisque bibendum lectus odio, ut tempus nisl consectetur non. Aliquam porttitor risus vel enim ultrices vehicula. In aliquet urna nec mattis tincidunt. Etiam efficitur pulvinar metus, eu tempor lorem dignissim id. Aenean commodo erat sed tellus tincidunt, vitae fermentum ex congue. Nunc a tortor ac massa posuere rhoncus. Donec aliquam ipsum mauris. Phasellus nunc erat, semper ac tempus et, laoreet nec elit. Donec turpis dolor, cursus sed semper et, euismod ac purus. </p>
		</article>
	</section>
</body>
</html>