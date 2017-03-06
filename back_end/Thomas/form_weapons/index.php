<?php require_once 'database.php' ?>
<!DOCTYPE html>
<html lang="fr">
	<head>
		<title> Formulaire </title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta charset="utf-8">
		<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
		<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>	
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
	</head>
	<body>
		<header>
			<h1 class="text-center">DATA Weapons</h1>
		</header>
		
		<section class="col-md-6 col-lg-6">
			<h2 class="text-center">Formulaires</h2>
			<form action="post.php" method="POST">
				<table class="table table-striped">
					<thead>
						<td>Name</td>
						<td>Price</td>
						<td>Weight</td>
						<td>Power</td>
					</thead>
					<tbody>
						<td><input type="text" class="form-control" name="name"/></td>
						<td><input type="number" class="form-control" name="price"/></td>
						<td><input type="number" class="form-control" name="weight"/></td>
						<td><input type="number" class="form-control" name="power"/></td>
					</tbody>
					<tfoot>
						<td>
							<input type="submit" class="btn btn-default" value="Ajouter"/>
						</td>
					</tfoot>
				</table>
			</form>
		</section>
		
		<section class="col-md-6 col-lg-6"> 
			<h2 class="text-center">Data Base</h2>
			<form method="post" action="remove.php">
				<table class="table table-striped">
				<caption> </caption>
					<thead>
						<td>Select</td>
						<td>ID</td>
						<td>Name</td>
						<td>Price</td>
						<td>Weight</td>
						<td>Power</td>
					</thead>
					<tbody>
						<?php
							$sql = 'SELECT * FROM pyrates_weapons';
						
							$statement = $pdo->query($sql);

							if( $statement === false )
							{
								var_dump($pdo->errorInfo());
							}
							else
							{
								$statement->execute();
								$data = $statement->fetchAll();
								
								foreach($data as $currentRow )
								{
									echo '<tr>';
										echo '<td><input type="checkbox" class="form-check-input" value="'. $currentRow['id'] .'" name="'. $currentRow['id'] .'" /></td>';
										echo '<td>'. $currentRow['id'] .'</td>';
										echo '<td>'. $currentRow['name'] .'</td>';
										echo '<td>'. $currentRow['price'] .'</td>';
										echo '<td>'. $currentRow['weight'] .'</td>';
										echo '<td>'. $currentRow['power'] .'</td>';
									echo '</tr>';
								}	
							}
						?>
						<tfoot>
							<td>
								<input class="btn btn-default" type="submit" value="Effacer" />
							</td>
						</tfoot>
					</tbody>
				</table>
			</form>
		</section>
	</body>
</html>