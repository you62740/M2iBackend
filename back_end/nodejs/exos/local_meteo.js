process.on(	
			'message', 
			function (request)
			{
				if( request.type == "meteo")
				{
					request.result = "Il fait beau ici";
				}
				else
				{
					request.result = "Service inconnu";
				}
				
				process.send(request);
			}
);

