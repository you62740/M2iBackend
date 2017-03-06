function RemoveCarController(data)
{
	var model = Facade.getInstance().getModel(ApplicationModel.NAME);
	var vo 	  = model.getCarVOById(data.car_id);
	
	if( vo != null )
	{
		console.log(vo);
		model.removeCar(vo);
	}
	
	Facade.getInstance().notify( DISPLAY_CARS, null );
}