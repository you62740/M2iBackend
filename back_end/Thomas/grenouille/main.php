<?php
	$show = False;
	
	if(isset($_POST['QteFrog']) && $_POST['QteFrog'] > 0)
	{
		$show = True;
		
		$frogs = Array();
		
		for($i = 0 ; $i < $_POST['QteFrog']; $i++)
		{
			array_push($frogs, new Frog());
		}
		
		$swamps = 
		[
			new Swamp(20),
			new Swamp(30),
			new Swamp(50)
		];
		
		$max = count($frogs);
		$QteFrogs = $max;
		
		while( count($frogs) > 0 )		
		{
			$indiceSwamps = 0;
			$QteFrogs = $max;
			$QteSwamps = count($swamps);
			$distanceMax = 10000;
			
			$currentFrog = array_shift($frogs);

			while( --$QteSwamps > -1 )
			{
				$currentSwamp = $swamps[$QteSwamps];
				
				if( count($currentSwamp->frogs) <= $QteFrogs && $currentSwamp->distance <= $distanceMax )
				{
					$QteFrogs = count($currentSwamp->frogs);
					$distanceMax = $currentSwamp->distance;
					$indiceSwamps = $QteSwamps;
				}
			}
					
			array_push($swamps[$indiceSwamps]->frogs, $currentFrog);
		}
	}