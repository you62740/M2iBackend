function GetServerDataCommand(){}

GetServerDataCommand._instance = null;
GetServerDataCommand.getInstance = function()
{
	GetServerDataCommand._instance = GetServerDataCommand._instance || new GetServerDataCommand();
	return GetServerDataCommand._instance;
};


GetServerDataCommand.prototype.execute = function(data)
{
	GameModel.getInstance().players = data.players;
	GameModel.getInstance().food = data.food;
	
	var player = GameModel.getInstance().currentPlayer;
	var i = data.players.length;
	
	while( --i > -1 )
	{
		if( data.players[i].id == player.id )
		{
			EntityVO.setClientState( player, data.players[i] );
			EntityVO.setState( player, data.players[i] );
		}
	}
};