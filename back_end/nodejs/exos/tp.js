function errorHandler(){}

function DataList(){}

DataList.prototype._queries 	= null;
DataList.prototype._callback 	= null;
DataList.prototype._data 		= null;

DataList.prototype.load 		= function(queries, p_callback)
{
	this._data 		= new Array();
	this._queries 	= queries;
	this._callback 	= p_callback;
	this._loadQuery();
};

DataList.prototype._loadQuery 	= function(error, results, fields)
{

	if( results != undefined)
		this._data.push(results);
	
	if( this._queries.length > 0 )
	{
		var statement = client.query( this._queries.shift(), this._loadQuery.bind(this));
	}
	else
	{
		this._callback(this._data);
	}
	
};


function displayWagons( response, data )
{
	response.setHeader("Content-Type","text/html");
	response.render('wagons.ejs', {wagons: data[0]});
	response.end();
}

function displayContrat(response,  data)
{
	response.setHeader("Content-Type","text/html");
	response.render('contrat.ejs', {clients: data[0], wagons: data[1], products: data[2], contrats: data[3]});
	response.end();
}

function displayClients( response, data )
{
	response.setHeader("Content-Type","text/html");
	response.render('clients.ejs', {clients: data[0]});
	response.end();
}

function displayProducts( response, data )
{
	response.setHeader("Content-Type","text/html");
	response.render('product_list.ejs', {products: data[0]});
	response.end();
}


function ProductsController(req, res)
{
	var list = new DataList();
	list.load(
		['SELECT * FROM products'],
		displayProducts.bind(this, res)
	);
}

function ClientsController(req, res)
{
	var list = new DataList();
	list.load(
		['SELECT * FROM clients'],
		displayClients.bind(this, res)
	);
}

function WagonsController(req, res)
{
	
	var list = new DataList();
	list.load(
		['SELECT * FROM wagons'],
		displayWagons.bind(this, res)
	);
	
}

function ContratController(req, res)
{
	var list = new DataList();
	list.load(
		[
			'SELECT * FROM clients',
			'SELECT * FROM wagons',
			'SELECT * FROM products',
			'SELECT * FROM contrats'
		],
		displayContrat.bind(this, res)
	);
}

function AddContratController(req, res)
{
	
	console.log(req.body);
	
	var list = new DataList();
	var sql = 'INSERT INTO contrats VALUES(NULL, '+ parseInt(req.body.client_id);
	sql += ','+parseInt(req.body.product_id);
	sql += ','+parseInt(req.body.wagon_id)+')';
	
	console.log(sql);
	
	list.load( [sql], 	function()
						{
							res.redirect('/contrat');
						} 
	);
}

function HomeController(req, res)
{
	res.setHeader("Content-Type","text/plain");
	res.write("HOME");
	res.end();
}

function ErrorController(req, res)
{
	res.setHeader("Content-Type","text/plain");
	res.send(404,"404 Not Found !");
}




var bodyParser 	= require('body-parser');
var postParser 	= bodyParser.urlencoded({ extended: false });
var filesystem 	= require('fs');
var express 	= require('express');
var app 		= express();
var mysql 		= require('mysql');
var client 		= mysql.createConnection(
						{
							  host     : "localhost",
							  user     : "root",
							  password : "root",
							  database : "formation"
						}
					);

app.use('/img', express.static('img'));
app.use('/css', express.static('css'));

app.get('/', HomeController);
app.get('/produits', ProductsController);
app.get('/clients', ClientsController);
app.get('/wagons', WagonsController);
app.get('/contrat', ContratController);
app.post('/addcontrat', postParser, AddContratController);
app.use(ErrorController);
app.listen(3000);



