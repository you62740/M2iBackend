function DataLoader()
{
	if( DataLoader._instance != null )
	{
		throw(new Error("singleton error, please use getInstance method instead !"));
		return;
	}
	
	DataLoader._instance = this;
}

//singleton
DataLoader._instance 		= null;

DataLoader.getInstance 		= function()
{
	if( DataLoader._instance == null )
	{
		new DataLoader();
	}
	
	return DataLoader._instance;
};

DataLoader.prototype.load 	= function(url, successHandler, errorHandler)
{
	/*on recupere les données*/
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
		if( xhr.readyState == 4 )
		{
			if( xhr.status == 200 )
			{
				successHandler(JSON.parse(xhr.responseText));
			}
			else
			{
				errorHandler();
			}
		}
	};
	
	xhr.open("GET",url, true);
	xhr.send(null);
};