<?php

	//header( 'Content-Type: application/javascript' );
	
	function packJs( $p_srcDir, $ignores = null )
	{
		$data = "";
		$jsFiles = scanRecursively( $p_srcDir, $ignores ); 
		$bigJs = "";
		$k = 0;
		
		foreach( $jsFiles as $jsFile )
		{
			$data  = file_get_contents( $jsFile );
			//$bigJs .= "\n\n//***********************************************************************";
			//$bigJs .= "\n\n//**************************".$jsFile."**************************";
			//$bigJs .= "\n\n//***********************************************************************";
			$bigJs .= "\n\n".$data."\n\n";
			$k++;
		}
		
		echo "\npacked ".$k." files \n";
		
		return $bigJs;
	}	
	
	function writeExternals( $p_srcDir, $ignores = null )
	{
		$data = "";
		$jsFiles = scanRecursively( $p_srcDir, $ignores ); 
		$bigJs = "";
		$className = "";
		
		foreach( $jsFiles as $jsFile )
		{
			$index = strrpos( $jsFile, "/" );
			$className = substr( $jsFile, $index + 1 );
			$className = str_replace( ".js", "", $className );
			$bigJs .= "\n window['".$className."'] = ".$className.";";
		}
		
		return $bigJs;
	}

	function scanRecursively( $p_dir, $ignores = null )
	{
		
		$list = scandir( $p_dir );
		$fileList = array();
		$isFile = false;
		
		foreach( $list as $file )
		{
			
			if ( $file == ".." || $file == '.' )
				continue;
				
			if ( $ignores != null && in_array($file, $ignores) )
				continue;
				
			$isFile = is_file( $p_dir.$file );
			
			if ( $isFile )
			{
				$fileList[] = $p_dir.$file;
			}
			else
			{
				$fileList = array_merge( $fileList, scanRecursively( $p_dir.$file."/", $ignores ) );
			}
			
		}
		
		return $fileList;
	}
	
	function make($filename, $sourceDirectory,  $targetDirectory, $ignores )
	{
		// generate
		$data = "";
		$currentDir = realPath( dirname(__FILE__) );
		
		
		// utils
		
		echo $jsDir = $currentDir.$sourceDirectory;
		$data = packJs( $jsDir, $ignores );
		
		
		// write
		$directories = array($targetDirectory);
								
		foreach( $directories as $currentDir )
		{
			if ( file_exists($jsDir.$currentDir.$filename))
			{
				unlink($jsDir.$currentDir.$filename);
			}
			
			file_put_contents($jsDir.$currentDir.$filename, $data);
		}
	}
	
	$currentDir = realPath( dirname(__FILE__) );
	make('client.js', '/../src/', '/../', array("server") );
	make('server.js', '/../src/', '/../', array("client") );
	
	
	
	
?>