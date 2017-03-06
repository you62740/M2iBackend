function StartApplicationCommand(){}

StartApplicationCommand._instance = null;
StartApplicationCommand.getInstance = function()
{
	StartApplicationCommand._instance = StartApplicationCommand._instance || new StartApplicationCommand();
	return StartApplicationCommand._instance;
};


StartApplicationCommand.prototype.execute = function(data)
{
	var stage 	= Utils.getStage();
	var canvas 	= document.getElementById("game");
	var ip		= data.ip;
	var nick	= data.nick;
	var color	= data.color;
	
	stage.addChild( Map.getInstance() ); 	// add a child to the stage
	Map.getInstance().init(canvas);
	
	GameModel.getInstance().init(ip,nick,color);
};