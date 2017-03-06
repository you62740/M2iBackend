function main()
{
	
	$('body')	.html('<p>hello world</p><p>fuck da world</p>')
				.css({'background-color':'green','font-family':'Verdana'});
				
				
	$('p:nth-child(2n - 1)').css({'color':'red'});
	
	$('p').on(	
				'click', 
				function()
				{
					$(this).fadeOut();
				} 
	);
}

window.addEventListener("load", main);