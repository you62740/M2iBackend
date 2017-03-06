<?php
	
function sanitizeInput($user_input)
{
	$data = $user_input;
	
	/*
	$data = str_replace("<script>", "fuck_da_script",$data);
	$data = str_replace("</script>", "/fuck_da_script", $data);
	*/
	
	// il y a la solution des expressions régulières
	// en chopper une sur internet
	
	// ou la solution de ne remplacer que les chaines de caractères
	// coupables
	
	$data = str_replace(
		
		array(	"<script>",
				"</script>",
				"<img ",
				"<video",
				"</video>"
		),
		"XSS: ".$_SERVER['REMOTE_ADDR'],
		$data
	);
	
	$data = htmlspecialchars($data);
	
	return $data;
}
	
$sanitize = sanitizeInput('<script>alert("aie !");</script>');
echo $sanitize;