

function dataLoadedHandler(event)
{
	var http = event.target;
	
	if( http.readyState == 4 && http.status == 200 )
	{
		http.removeEventListener("load", dataLoadedHandler );
		startGame(JSON.parse(http.responseText));
	}
}

function loadData()
{
	var http = new XMLHttpRequest();
	
	window.removeEventListener("load", loadData);
	
	http.addEventListener("load", dataLoadedHandler );
	http.open("GET", "data/data.json", true);
	http.send();
}

function render()
{
	var canvas	= document.getElementById("rockman_canvas");
	var context	= canvas.getContext("2d");
	
	context.clearRect(0,0,canvas.width, canvas.height);
	Map.getInstance().draw(canvas,context);
	
	setTimeout(render, parseInt(1000 / 60) );
}

function startGame(p_obj)
{
	var bg 				= document.getElementById("bg");
	var tiles_texture 	= document.getElementById("tiles");
	var hero 			= new Rockman( document.getElementById("rockman"), p_obj.rockman_states );
	var i				= 0;
	var max				= p_obj.map_data.length;
	var tile			= null;
	
	Map.getInstance().background = bg;
	
	for( i = 0; i < max; i++ )
	{
		tile = new Tile(tiles_texture, p_obj.map_tiles[p_obj.map_data[i].tile]);
		tile.x = p_obj.map_data[i].x;
		tile.y = p_obj.map_data[i].y;
		
		Map.getInstance().tiles.push(tile);
	}
	
	Map.getInstance().heroes.push(hero);
	
	render();
}

window.addEventListener("load", loadData);

