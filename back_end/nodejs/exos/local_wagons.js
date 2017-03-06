process.on(	
			'message', 
			function (request)
			{
				if( request.type == "wagons")
				{
					request.result = "Les wagons sont beaux";
				}
				else
				{
					request.result = "Service inconnu";
				}
				
				process.send(request);
			}
);

