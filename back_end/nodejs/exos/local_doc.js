process.on(	
			'message', 
			function (request)
			{
				if( request.type == "doc")
				{
					request.result = "La doc est complete";
				}
				else
				{
					request.result = "Service inconnu";
				}
				
				process.send(request);
			}
);

