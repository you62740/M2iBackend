


function AddStudentController( req, res )
{
	if( req.body.student != undefined )
	{
		addStudent( req, req.body.student );
	}
	
	res.redirect('/students');
}

function RemoveStudentController( req, res )
{
	if( req.body.student != undefined )
	{
		removeStudent( req, req.body.student )
	}
	
	res.redirect('/students');
}

function StudentsController( req, res )
{
	res.setHeader("Content-Type","text/html");
	res.render("students.ejs", {students: getStudents(req) });
}

function ErrorController(req, res)
{
	res.setHeader("Content-Type","text/plain");
	res.send(404,"404 Not Found !");
}


/*fonctions utilitaires*/

function removeStudent( req, studentName )
{
	if( req.session.students == undefined )
	{
		req.session.students = new Array();
	}
	
	var index = req.session.students.indexOf(studentName);
	
	if( index > -1 )
	{
		req.session.students.splice( index, 1 ); 
	}
}

function addStudent( req, studentName )
{
	if( req.session.students == undefined )
	{
		req.session.students = new Array();
	}
	
	req.session.students.push(studentName);
}

function getStudents(req)
{
	if( req.session.students == undefined )
	{
		req.session.students = new Array();
	}
	
	return req.session.students;
}



/*config*/

// module qui nous permet de gérer des sessions
var session 			= require('cookie-session');
// ici on va chercher le module qui nous permet d'analyser les requêtes POST
var bodyParser 			= require('body-parser'); 
// le module qui va décoder les données de type POST
var urlencodedParser 	= bodyParser.urlencoded({ extended: false });
var express 			= require('express');
var app 				= express();

// on initialise notre session avec une clé secrète
// qui normalement est différente pour chaque instance du serveur
app.use(session({secret:'myprivateshop'}));

// répertoires contenant des fichiers on dynamiques
app.use('/img', express.static('img'));
app.use('/css', express.static('css'));

// route de type GET classiques
app.get('/students'				, StudentsController							);

// on définit nos routes qui gèrent des paramètres de type POST
// sans oublier de passer aux fonctions de callback, l'objet 
// qui va nous permettre d'aller chercher lesdits paramètres.
app.post('/students/add'		, urlencodedParser, AddStudentController	);
app.post('/students/remove'	, urlencodedParser, RemoveStudentController	);

//route par défaut
app.use(ErrorController);

app.listen(3000);



