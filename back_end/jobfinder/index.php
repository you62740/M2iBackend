<?php

class Offer
{
	public $isCdd 	= false;
	public $isCdi 	= false;
	public $link 	= null;
	public $titre 	= null;
	public $mail 	= null;
	
	public function explore($param_base_url)
	{
		$data 	= file_get_contents($param_base_url.$this->link);
		$data	= substr( $data, strpos( $data, 'Postuler' ) );
		$data	= substr( $data, strpos( $data, 'E-mail' ) );
		$data	= substr( $data, strpos( $data, 'itemprop="email"' ) );
		$data	= substr( $data, strpos( $data, '>' ) + 1 );
		
		$data = substr( $data, 0, strpos($data, '</span>') );
		$data = str_replace(  '**at**', '@',$data );
		$data = str_replace( '_point_', '.', $data );
		
		$this->mail = $data;
	}
}

function getOfferObjectFromHTML( $param_html )
{
	$title_start	= strpos( $param_html, '<a' );
	$title_start	= strpos( $param_html, '>', $title_start ) + 1;
	$title_end		= strpos( $param_html, '</a>', $title_start );
	
	$href_start 	= strpos( $param_html, 'href="' ) + 6;
	$href_end 		= strpos( $param_html, '"', $href_start );
	
	$offer 			= new Offer();
	$offer->link 	= substr( $param_html, $href_start, $href_end - $href_start );
	$offer->isCdd 	= ( strpos( $param_html, 'CDD' ) > -1 );
	$offer->isCdi 	= ( strpos( $param_html, 'CDI' ) > -1 );
	$offer->titre 	= substr( $param_html, $title_start, $title_end - $title_start );
	
	return $offer;
}

function getOffersHTMLFromPage($param_page)
{
	$data = file_get_contents($param_page);
	$start = strpos( $data, '<table class="offre"' );
	$end = strpos( $data, '</table>', $start );
	$data = substr( $data, $start, $end - $start + 8 );
	
	
	$start 	= strpos( $data, '<tr' );
	$href_start = 0;
	$href_end = 0;
	$i = 0;
	$offers = array();
	
	
	// tant qu'il y a des balises <tr et </tr>
	while( $start > -1 )
	{
		$end 	= strpos( $data, '</tr>', $start);
		// on récupère le code html à l'intérieur de cette balise
		$offerHTML 	= substr( $data, $start, $end - $start + 5 );
		
		$offers[]=$offerHTML;
		// puis on supprime le code html de la balise dont on vient de s'occuper
		// histoire de passer à la suivante lors du prochain tour de boucle
		$data = substr( $data, $end - $start + 5 );
		
		// on redéfinit les positions dans la chaine de caractères 
		// de départ et de fin pour l'offre suivante s'il en existe une
		$start 	= strpos( $data, '<tr' );
	}
	
	return $offers;
}



$tab = array(
	'http://emploi.alsacreations.com/offres-emploi-region-Ile-de-France-12.html',
	'http://emploi.alsacreations.com/offres-emploi-region-Nord-Pas-de-Calais-17.html'
);


$offers = array();


foreach( $tab as $currentPage )
{
	$tmp = getOffersHTMLFromPage($currentPage);
	
	foreach( $tmp as $value )
	{
		$myoffer = getOfferObjectFromHTML( $value );
		$myoffer->explore("http://emploi.alsacreations.com/");
		$offers[]=$myoffer;
	}
}



$json = json_encode($offers);
file_put_contents('offers.json', $json);








