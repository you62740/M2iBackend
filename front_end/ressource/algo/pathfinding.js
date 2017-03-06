


function Node(param_row, param_col, param_walkable)
{
	this.row 		= param_row;
	this.col 		= param_col;
	this.isWalkable = param_walkable;
}


Node.prototype.p 			= null;
Node.prototype.g 			= 0;
Node.prototype.h 			= 0;
Node.prototype.f 			= 0;
Node.prototype.col 			= 0;
Node.prototype.row 			= 0;
Node.prototype.isStart 		= false;
Node.prototype.isEnd 		= false;
Node.prototype.isWalkable 	= true;


function getGraphe(param_info)
{
	var nodes 	= new Array();
	var i 		= param_info.length;
	var j 		= 0;
	var cur		= null;	
	
	while( --i > -1 )
	{
		j = param_info[i].length;
		
		while( --j > -1 )
		{
			cur = new Node(i,j,param_info[i][j] == 0);
			
			if( param_info[i][j] == 8 )
			{
				cur.isWalkable = true;
				cur.isStart = true;
			}
			
			if( param_info[i][j] == 9 )
			{
				cur.isWalkable = true;
				cur.isEnd = true;
			}
			
			nodes.push( cur );
		}
	}
	
	return nodes;
}

function getNextNodeByF( param_openedList )
{
	var i 		= param_openedList.length;
	var index	= 0;
	var minF	= param_openedList[0].f;
	
	/* 
	on boucle sur l'ensemble des nodes contenus dans la liste ouverte
	les valeurs de base de minF et index, sont basées sur les valeurs 
	du premier élément de la liste.
	
	
	On va donc comparer tour à tour, les valeurs de la propriété f de chaque noeud.	
	 */
	
	while( --i > -1 )
	{
		// si le noeud à l'indice i possède un "f" plus petit
		if( param_openedList[i].f < minF )
		{
			// alors la valeur minimale de f analysée jusqu'ici est la valeur "f" du noeud en cours
			minF = param_openedList[i].f;
			
			// donc la position du noeud avec le plus petit f est i.
			index = i;
		}
	}
	
	// on retourne donc invariablement, l'élement possédant le plus petit F 
	return param_openedList[index];
	
}

function getEndNode( param_graphe )
{
	var i = param_graphe.length;
	
	while( --i > -1 )
	{
		if( param_graphe[i].isEnd == true )
		{
			return param_graphe[i];
		}
	}
	
	return null;
}

function getStartNode( param_graphe )
{
	var i = param_graphe.length;
	
	while( --i > -1 )
	{
		if( param_graphe[i].isStart == true )
		{
			return param_graphe[i];
		}
	}
	
	return null;
}

function getNodeByRowAndCol( param_graphe, param_row, param_col )
{
	var i = param_graphe.length;
	
	while( --i > -1 )
	{
		if( param_graphe[i].row == param_row && param_graphe[i].col == param_col )
		{
			return param_graphe[i];
		}
	}
	
	return null;
}

function start()
{
	var info = [
		[1, 1, 1, 1, 1, 1],
		[0, 0, 0, 0, 0, 0],
		[0, 1, 1, 1, 1, 0],
		[0, 1, 0, 0, 0, 0],
		[0, 1, 0, 1, 1, 1],
		[9, 1, 0, 0, 0, 8]
	];
	
	var graphe 		= getGraphe(info);
	var openedList 	= new Array();
	var closedList 	= new Array();
	var startNode	= getStartNode(graphe);
	var endNode		= getEndNode(graphe);
	var current		= null;
	var neighbours	= null;
	var max			= 0;
	var i			= 0;
	
	var weight		= 100;
	var g			= 0;
	var h			= 0;
	var f			= 0;
	var path		= new Array();
	

	
	openedList.push(startNode);
	
	
	while( openedList.length > 0 )
	{
		// récupère le noeud avec le plus petit f contenu dans la liste ouverte 
		current = getNextNodeByF( openedList );
		
		// supprime l'élement courant de la liste ouverte
		openedList.splice( openedList.indexOf(current) ,1);
		
		// ajoute l'élément à la liste fermée.
		closedList.push(current);
		
		// on crée notre tableau de noeuds adjacents.
		neighbours = new Array();
		
		// récupère le noeud à la gauche de current et le stocke dans le tableau de voisins
		neighbours.push( getNodeByRowAndCol(graphe, current.row, current.col - 1) );
		
		// récupère le noeud à la droite de current et le stocke dans le tableau de voisins
		neighbours.push( getNodeByRowAndCol(graphe, current.row, current.col + 1) );
		
		// récupère le noeud au dessus de current et le stocke dans le tableau de voisins
		neighbours.push( getNodeByRowAndCol(graphe, current.row - 1, current.col) );
		
		// récupère le noeud en dessous de current et le stocke dans le tableau de voisins
		neighbours.push( getNodeByRowAndCol(graphe, current.row + 1, current.col) );
		
		max = neighbours.length;
		
		// pour chacun de mes voisins...
		for( i = 0; i < max; i++ )
		{
			
			if( neighbours[i] == null 				|| 	// si le noeud n'existe pas
				neighbours[i].isWalkable == false 	|| 	// si le noeud est un obstacle
				closedList.indexOf(neighbours[i]) > -1 	// ou si le noeud est dans la liste fermée
			)
			{
				continue;
			}
			
			// si le noeud ne se trouve pas dans la liste ouverte
			if( openedList.indexOf( neighbours[i] ) == -1 )
			{
				openedList.push(neighbours[i]); // l'ajouter à la liste ouverte
				neighbours[i].p = current; // faire de current son parent
				
				// calcul de la distance du noeud en cours par rapport au noeud de départ
				g = ( Math.abs( neighbours[i].row - startNode.row ) * weight ) + 
					( Math.abs( neighbours[i].col - startNode.col ) * weight );
					
				// calcul de la distance du noeud en cours par rapport au noeud d'arrivée
				h = ( Math.abs( neighbours[i].row - endNode.row ) * weight ) + 
					( Math.abs( neighbours[i].col - endNode.col ) * weight );
				
				
				neighbours[i].g = g;
				neighbours[i].h = h;
									
				// calcul de f ( G + H )
				neighbours[i].f = g + h;	
			}
			else
			{
				// calcul de la distance du noeud en cours par rapport au noeud de départ
				g = ( Math.abs( neighbours[i].row - startNode.row ) * weight ) + 
					( Math.abs( neighbours[i].col - startNode.col ) * weight );
				
				// si g est inférieur au précédent g du noeud
				if( g < neighbours[i].g )
				{
					// calcul de la distance du noeud en cours par rapport au noeud d'arrivée
					h = ( Math.abs( neighbours[i].row - endNode.row ) * weight ) + 
						( Math.abs( neighbours[i].col - endNode.col ) * weight );
					
					
					neighbours[i].g = g;
					neighbours[i].h = h;
										
					// calcul de f ( G + H )
					neighbours[i].f = g + h;	
					
					neighbours[i].p = current;
				}
			}
			
		}
		
		// si le noeud d'arrivée se trouve dans la liste fermée, alors on casse la boucle.
		if( closedList.indexOf(endNode) > -1 )
		{
			break;
		}
		
	}
	
	current = endNode;
	
	while( current != null )
	{
		path.unshift(current);
		current = current.p;
	}
	
	console.log(path);
	
}


window.addEventListener("load", start);