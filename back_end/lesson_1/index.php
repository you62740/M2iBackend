<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title></title>
	<link type="text/css" href="main.css" rel="stylesheet" />
</head>
<body>
	<div class="map">
		<?php
			$map = array(
				array(0,0,0,0,0,0),
				array(0,0,0,0,0,0),
				array(0,0,0,1,0,0),
				array(0,1,0,0,0,0),
				array(0,0,0,0,1,0),
				array(0,0,0,0,0,0)
			);

			foreach( $map as $row )
			{
				foreach( $row as $col )
				{
					if ($col == 0)
					{
						echo '<span class="black"></span>';
					}
					else
					{
						echo '<span class="green"></span>';
					}
			}
				
				
				echo '<br/>';
			}
		?>
	</div>
</body>
</html>








