<?php 

	include 'marais.php' ;
	include 'grenouille.php' ;
	include 'main.php' ;
?>
<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="UTF-8">
		<title>Crazy Frog</title>
		<link rel="stylesheet" href="style.css" >
	</head>
	<body>
		<form method='post'>
			<input type='number' name='QteFrog'>
			<input type='submit'>	
		</form>
		<div class="container">
		<?php
			if($show){
				foreach( $swamps as $s )
				{
					if( count($s->frogs) > 0 )
					{
						$indice = 0 ;
						$nbCol = 0 ;
						echo '<table><caption>' ;
						echo 'Marais '. $s->id .' ( <em>'. $s->distance .'Km | '.count($s->frogs) .'</em> ) ' ;
						echo '</caption>' ;
						echo '<tr>' ;
						
						foreach( $s->frogs as $f )
						{
							echo '<td>' ;
							echo '<img src="'. $f->img .'"/>' ;
							echo '</td>' ;
							$nbCol ++;
							if($nbCol == 4)
							{
								$nbCol = 0;
								echo'</tr><tr>' ;
							}
						}
						
						echo '</tr>' ;
						echo '</table>' ;
					}
				}
			}
		?>
		</div>
	</body>
</html>