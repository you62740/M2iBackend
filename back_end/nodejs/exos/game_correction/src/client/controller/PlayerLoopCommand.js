function PlayerLoopCommand(){}

PlayerLoopCommand._instance = null;
PlayerLoopCommand.getInstance = function()
{
	PlayerLoopCommand._instance = PlayerLoopCommand._instance || new PlayerLoopCommand();
	return PlayerLoopCommand._instance;
};


PlayerLoopCommand.prototype.execute = function(data)
{
	var model 	= GameModel.getInstance();
	var stage	= Utils.getStage();
	var player 	= model.currentPlayer;
	var map		= Map.getInstance();
	var wx		= map.camera.x + stage.mouseX;
	var wy		= map.camera.y + stage.mouseY;
	
	model.doCollisions();
	
	
	
	//player.x += parseInt( ( stage.mouseX - player.x ) * 0.1 );
	//player.y += parseInt( ( stage.mouseY - player.y ) * 0.1 );
	player.x += parseInt( ( wx - player.x ) * 0.02 );
	player.y += parseInt( ( wy - player.y ) * 0.02 );
	
	if( player.x < 0 ) 
		player.x = 0;
		
	if( player.y < 0 ) 
		player.y = 0;
		
	if( player.x > MAP_WIDTH) 
		player.x = MAP_WIDTH;
		
	if( player.y > MAP_HEIGHT) 
		player.y = MAP_HEIGHT;

	GameModel.getInstance().sendPlayerState();
};