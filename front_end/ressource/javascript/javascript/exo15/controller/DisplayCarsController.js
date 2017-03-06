function DisplayCarsController(data)
{
	var model = Facade.getInstance().getModel(ApplicationModel.NAME);
	var view  = Facade.getInstance().getView(ApplicationView.NAME);
	
	
	view.render(model.username,model.getCars());
}