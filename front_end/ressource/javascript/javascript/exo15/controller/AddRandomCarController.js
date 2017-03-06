function AddRandomCarController()
{
	var model 	= Facade.getInstance().getModel(ApplicationModel.NAME);
	
	var vo 		= new CarVO();
	var rand	= parseInt(Math.random() * 1000);
	
	vo.name 	= "car_"+rand;
	vo.img 		= "http://a403.idata.over-blog.com/500x351/1/06/90/59/HOMMES-POLITIQUES/NADINE-MORANO-GUIGNOL.jpg";
	vo.price 	= rand;
	vo.desc 	= "nadine_"+rand;
	
	model.addCar(vo);
	
	Facade.getInstance().notify( DISPLAY_CARS, null );
}