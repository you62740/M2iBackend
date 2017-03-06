<?php 	
	require_once 'database.php';
	
	if(isset($_POST) && !empty($_POST))
	{
		foreach($_POST as $id)
		{
			$sql = "DELETE FROM pyrates_weapons WHERE id =". $id ." ";
			
			$statement = $pdo->query($sql);

			if( $statement === false )
			{
				var_dump($pdo->errorInfo());
				exit();
			}
		}
		header("Location: index.php");
	}
?>
