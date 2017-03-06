// ES5
"use strict";

var students = [
	{
		"firstname":"Christophe",
		"lastname":"Rochut",
		"description":"Superman",
		"haircolor":"Brun",
		"avatar":"https://upload.wikimedia.org/wikipedia/en/e/eb/SupermanRoss.png"
	},
	{
		"firstname":"Frédéric",
		"lastname":"Leclercq",
		"description":"Bad King",
		"haircolor":"Sel et poivre",
		"avatar":"https://upload.wikimedia.org/wikipedia/en/3/3a/Sauron.jpg"
	}
];


function isValidHairColor(param_color)
{
	switch( param_color )
	{
		case "Brun"			:	return true;	break;
		case "Brune"		:	return true;	break;
		case "Blonde"		:	return true;	break;
		case "Blond"		:	return true;	break;
		case "Roux"			:	return true;	break;
		case "Rousse"		:	return true;	break;
		case "Châtain"		:	return true;	break;
		case "Poivre et sel":	return true;	break;
		case "Sel et poivre":	return true;	break;
		
		
		default: 
			return false;
			break;
	}
}

function getStudentByName( param_name, param_students )
{
	var max = param_students.length;
	var i 	= 0;
	
	for( i = 0; i < max; i++ )
	{
		if( param_students[i].firstname == param_name )
			return param_students[i];
	}
	
	return null;
}

var myStudent = getStudentByName('Christophe', students);

//console.log(isValidHairColor("violet"));

//console.log( Math.random() );
//console.log( Math.ceil(10.9) );
//console.log( Math.floor(10.9) );
//console.log( Math.round(10.499999999999999) );
//console.log( Math.round(10.5) );

//
//var myNumber = "10";
//console.log( parseInt(myNumber) );
//console.log( parseFloat(myNumber) );
//
// NaN
//var myNumber = "A10";
//console.log( parseInt(myNumber) );
//console.log( parseFloat(myNumber) );
//


var ferrari 		= new Object();
ferrari.price 		= 100000;
ferrari.setPrice 	= function(param_price)
{
	this.price = param_price;
};

//console.log(ferrari.color); // retourne undefined

ferrari.setPrice(100);
console.log(ferrari.price);
//
//window.methodAlias = ferrari.setPrice;
window.methodAlias = ferrari.setPrice.bind(ferrari);
window.methodAlias(50);
//
console.log(ferrari.price);










