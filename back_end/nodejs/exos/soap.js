//npm install soap

var soap = require('soap');
var url = 'http://www.webservicex.net/globalweather.asmx?wsdl';
var args = {"CountryName": "FRANCE"};

soap.createClient
(
	url, 
	function(err, client) 
	{
		client.GetCitiesByCountry
		(
			args, 
			function(err, result) 
			{
				console.log(result);
			}
		);
		
	}
);

function dump(obj)
{
	var str = "";
	
	for( var prop in obj )
	{
		str += prop+",";
	}
	
	return str;
}