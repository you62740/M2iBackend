<?php

 require_once 'm2irpg/rpg.php';
 require_once 'm2irpg/map/Personnage.php';
 require_once 'm2irpg/fight/Personnage.php';
 
 
 use m2irpg\fight as fight_ns;
 use m2irpg\fight\Personnage as FightPersonnage;
 
 //$perso = new fight_ns\Personnage();
 $perso = new FightPersonnage();
 $perso->helloWorld();