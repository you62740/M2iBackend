
window.indexedDb =  window.indexedDB || 
					window.mozIndexedDB || 
					window.webkitIndexedDB || 
					window.msIndexedDB;

function positionHandler(position)
{
	console.log(position);
	console.log(position.coords);
	console.log(position.coords.latitude);
	console.log(position.coords.longitude);
}

function testLocalStorage() 
{
    if (localStorage['cacahuete'] == null) 
	{
		console.log("pas encore de curly");
        localStorage['cacahuete'] = 'curly';
    }
	
	console.log(localStorage['cacahuete']);
}

function testIndexedDB()
{
	var request = indexedDB.open("mydatabase", 1);
	var db = null;
	
	request.onsuccess = function(event) 
	{
		var db = event.target.result;
		var trans = db.transaction(["users"], "readwrite");
		var store = trans.objectStore("users");
		/*
		var request = store.put({
			//"login": "cacahuete",
			//"password": "curly",
			//"id": "2"
		//});
		*/
		var request = store.openCursor();
		
		request.onsuccess = function(e) 
		{
			if( e.target.result != undefined )
			{
				console.log(e.target.result);
				e.target.result.continue();
			}
		};
				
		request.onerror= function(err) 
		{
			console.log(err);
		};
	};
	
}

function main()
{	
	
	testLocalStorage();
	//testIndexedDB();
	navigator.geolocation.getCurrentPosition(positionHandler);
}


window.addEventListener("load", main);
