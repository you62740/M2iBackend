//common
const GAME_PORT				= 3000;
const MAP_WIDTH				= 1500;
const MAP_HEIGHT			= 1500;
const MIN_MASS 				= 1;
const MAX_MASS 				= 2000;
const MAX_RADIUS 			= 150;
const MIN_RADIUS 			= 10;
const MAX_DEZOOM 			= 100;


// server
const DEFAULT_PLAYER_MASS 	= 30;
const INACTIVITY_TIME		= 10000; // in ms
const EAT_FACTOR			= 1.2;
const SERVER_IDLE_TIME		= 8; // in ms
const SERVER_STATS_TIME		= 10000 // in ms
const NUM_FOOD_START		= 300;


// front notifications
const GAME_READY 			= "game_ready";
const SEND_DATA 			= "send_data";
const PLAYER_LOOP 			= "player_loop";
const START_APPLICATION 	= "start_application";
const GET_SERVER_DATA 		= "get_server_data";



// communication events
const NET_GAME_OVER 		= "net_game_over"; 
const NET_SET_PLAYER_DATA 	= "net_set_player_data"; 
const NET_COLLIDE_FOOD 		= "net_collide_food"; 
const NET_COLLIDE_PLAYER 	= "net_collide_player"; 
const NET_REFRESH_WORLD 	= "net_refresh_world"; 
const NET_CREATE_PLAYER		= "net_create_player";
const NET_ASK_PLAYER		= "net_ask_player";


