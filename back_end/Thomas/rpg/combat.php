<?php
function combat($player1, $player2)
{
	while( !$player1->isDead() && !$player2->isDead() )
	{
		$player1->attack($player2);
		
		echo '<li class="collection-item">'. $player1->name .' - '. $player1->getPv() .' PV | '. $player2->name .' - '. $player2->getPv(). ' PV</li>';
		if($player2->isDead())
		{
			break;
		}
		
		$player2->attack($player1);
	}
	echo '<li class="collection-item">'. $player1->name .' - '. $player1->getPv() .' PV | '. $player2->name .' - '. $player2->getPv(). ' PV</li>';
};