function DataLoader()
{
	EventManager.apply(this);
}

//singleton
DataLoader._instance 		= null;

DataLoader.getInstance 		= function()
{
	if( DataLoader._instance == null )
	{
		DataLoader._instance = new DataLoader();
	}
	
	return DataLoader._instance;
};

DataLoader.prototype.load 	= function(url)
{
	/*on recupere les données*/
	var xhr = new XMLHttpRequest();
	var scope = this;
	
	xhr.onreadystatechange = function()
	{
		if( xhr.readyState == 4 )
		{
			if( xhr.status == 200 )
			{
				scope.envoyerEvenement("success",JSON.parse(xhr.responseText));
			}
			else
			{
				scope.envoyerEvenement("error",null);
			}
		}
	};
	
	xhr.open("GET",url, true);
	xhr.send(null);
};


