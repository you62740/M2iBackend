function Application(){}


Application._instance = null;
Application.getInstance = function()
{
	Application._instance = Application._instance || new Application();
	return Application._instance;
};


Application.prototype.init = function(data)
{
	var canvas = document.getElementById("game");
	var stage = Utils.getStage();
	stage.init(canvas);
	stage.debug = true;

	this.notify(START_APPLICATION, data);
};

Application.prototype.startMainLoop = function()
{
	var stage = Utils.getStage();
	stage.addEventListener(tomahawk_ns.Event.ENTER_FRAME, this, this._doMainLoop ); 
};

Application.prototype._doMainLoop = function()
{
	this.notify( PLAYER_LOOP, null );
};


Application.prototype.notify = function(notification, data)
{
	switch( notification )
	{
		case GAME_READY			: this.startMainLoop();									; break;			
		case PLAYER_LOOP		: PlayerLoopCommand.getInstance().execute(data)			; break;
		case START_APPLICATION	: StartApplicationCommand.getInstance().execute(data)	; break;
		case GET_SERVER_DATA	: GetServerDataCommand.getInstance().execute(data)		; break;
		case SEND_DATA			: SendDataCommand.getInstance().execute(data)			; break;
	}
};