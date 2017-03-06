function ApplicationView()
{
	var container = document.getElementById("cars");
	var nadine = document.getElementById("nadine");
	container.addEventListener("click", this.clickHandler.smartBind( this ), true );
	nadine.addEventListener("click", this.nadineHandler.smartBind( this ), true );
}

 ApplicationView.NAME = "appView";
 
ApplicationView.prototype.clickHandler = function(event)
{
	Facade.getInstance().notify(REMOVE_CAR, {car_id: event.target.id});
};
 
ApplicationView.prototype.nadineHandler = function(event)
{
	Facade.getInstance().notify(ADD_NADINE, null);
};

ApplicationView.prototype.render = function(username, cars)
{
	var container 	= document.getElementById("cars");
	var html 		= '<h1>Liste de voitures du joueur: '+username.toUpperCase()+'</h1>';
	var max 		= cars.length;
	var i 			= 0;
	
	for( i = 0; i < max; i++ )
	{
		html += '<div class="car">';
		html += '<p>' + cars[i].name + '</p>';
		html += '<img src="' + cars[i].img + '" />';
		html += '<p>' + cars[i].desc + '</p>';
		html += '<p>' + cars[i].price + '</p>';
		html += '<button id="'+cars[i].id+'">X</button>';
		html += '</div>';
	}
	
	container.innerHTML = html;
	
};