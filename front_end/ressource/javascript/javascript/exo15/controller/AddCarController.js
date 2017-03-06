function AddCarController(data)
{
	var model 	= Facade.getInstance().getModel(ApplicationModel.NAME);
	var vo 		= new CarVO();
	
	vo.name 	= data.name;
	vo.img 		= data.img;
	vo.price 	= data.price;
	vo.desc 	= data.desc;
	
	model.addCar(vo);
	
	Facade.getInstance().notify( DISPLAY_CARS, null );
}