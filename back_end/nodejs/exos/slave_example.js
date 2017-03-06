// on fait appel à notre objet 'process' disponible
// dans l'espace global. Cet objet a été crée par 
// le processus principal aka 'le maître'.


// on écoute tout les évenements de type 'message'
// que notre processus principal nous envoie.
process.on(	
			'message', 
			
			// et on éxécute la fonction suivante à chaque fois 
			// que l'évenement se produit
			function (request)
			{
				// on récupère les données du maître
				var response_id = request.response_id;
				
				// puis notre esclave génère une réponse
				var result = "reponse de l'esclave";
				
				// et enfin on l'envoie au maître 
				process.send(
					{
						response_id: response_id, 
						result: result
					}
				);
			}
);

