function StartApplicationController(data)
{
	var model = new ApplicationModel("nicolas jurado");
	var view  = new ApplicationView();
	
	Facade.getInstance().registerModel( model, ApplicationModel.NAME );
	Facade.getInstance().registerView( view, ApplicationView.NAME );
	
	
	Facade.getInstance().notify( DISPLAY_CARS, null );
	
	
	
	Facade.getInstance().notify( 
									ADD_CAR, 
									{	
										name:"ferrari", 
										img:"assets/img/ferrari.jpg", 
										price: 500000, 
										desc:"voiture des kékés"
									} 
								);
	
	
	Facade.getInstance().notify( 
									ADD_CAR, 
									{	
										name:"subaru", 
										img:"assets/img/ferrari.jpg", 
										price: 100000, 
										desc:"voiture des japonais"
									} 
								);
	
	
	Facade.getInstance().notify( 
									ADD_CAR, 
									{	
										name:"peugeot", 
										img:"assets/img/ferrari.jpg", 
										price: 2, 
										desc:"voiture des frenchies"
									} 
								);
	
}