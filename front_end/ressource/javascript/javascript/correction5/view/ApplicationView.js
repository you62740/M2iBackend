function ApplicationView()
{
	var container = document.getElementById("cars");
	var button = document.getElementById("add");
	container.addEventListener("click", this.clickHandler.smartBind( this ) );
	button.addEventListener("click", this.addCarHandler.smartBind(this) );
}

 ApplicationView.NAME = "appView";
 
ApplicationView.prototype.addCarHandler = function(event)
{
	var nom 		= document.getElementById("nom");
	var price 		= document.getElementById("price");
	var desc 		= document.getElementById("desc");
	var img_path 	= document.getElementById("img_path");
	
	Facade.getInstance().notify( 
								ADD_CAR, 
								{	
									name: nom.value, 
									img: img_path.value, 
									price: price.value, 
									desc: desc.value
								} 
							);
};
 
ApplicationView.prototype.clickHandler = function(event)
{
	Facade.getInstance().notify(REMOVE_CAR, {car_id: parseInt(event.target.id)});
};

ApplicationView.prototype.render = function(username, cars)
{
	var container = document.getElementById("cars");
	var html = '<h1>Liste de voitures du joueur: '+username.toUpperCase()+'</h1>';
	var max = cars.length;
	var i = 0;
	
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

