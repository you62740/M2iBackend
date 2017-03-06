
var express = require('express');
var fs 		= require('fs');
var app 	= express();


function AboutController(req, res)
{
	var nom = "";
	var prenom = "";
	
	if( req.params.prenom )
		prenom = req.params.prenom;
		
	if( req.params.nom )
		nom = req.params.nom;
		
	res.setHeader("Content-Type","text/html");
	res.render('about.ejs', {name: nom, surname: prenom });
}

function HomeController(req, res)
{
	res.setHeader("Content-Type","text/html");
	res.render('home.ejs', {});
}

function ContactController(req, res)
{
	res.setHeader("Content-Type","text/html");
	res.render('contact.ejs', {});
}

function ProductController(req, res)
{
	//on va chercher la liste des produits dans un fichier .json
	var allProducts =  fs.readFileSync('data/products.json', 'utf-8').toString();
	// puis on convertit la chaîne de caractères
	// en objet que l'on peut manipuler
	var products = JSON.parse(allProducts);
	
	// on crée une variable qui va nous permettre de recevoir le produit
	// sélectionné s'il y en a un 
	var currentProduct = null;
	var i = 0;
	
	// si on a reçu un paramètre contenant une reference produit
	if( req.params.reference )
	{
		// alors on boucle sur l'ensemble des produits pour vérifier
		// s'il y en a un qui correspond à la référence
		i = products.length;
		while( --i > -1 )
		{
			if( products[i].reference == req.params.reference )
			{
				currentProduct = products[i];
			}
		}
		
		// puis on envoit les données au template
		// product_detail.ejs
		res.setHeader("Content-Type","text/html");
		res.render('product_detail.ejs', {product: currentProduct, hasForm: false});
	}
	else
	{
		// si aucune reference n'est passée		
		res.setHeader("Content-Type","text/html");
		// alors on envoit l'ensemble des produits 
		// à notre template qui liste l'ensemble des produits
		res.render('products.ejs', {products: products});
	}
}

function ErrorController(req, res)
{
	res.setHeader("Content-Type","text/plain");
	res.send(404,"404 Not Found !");
}



// ici on détermine l'ensemble des répertoires 
// qui contiennent des fichiers non dynamiques
// images , css, script, video etc etc ...
app.use('/img', express.static('img'));
app.use('/css', express.static('css'));

// puis on configure les routes qui nous redirigent vers 
// tel ou tel fonction de callback ( que l'on peut considérer comme étant
// des controllers )
app.get('/', HomeController);
app.get('/home', HomeController);
app.get('/contact', ContactController);
app.get('/products', ProductController);
app.get('/products/:reference', ProductController);
app.get('/about/:nom/:prenom', AboutController);

// puis on configure la route par défaut 
// dans le cas ou aucune route n'est trouvée
app.use(ErrorController);

// on démarre le serveur et on écoute le port 3000
app.listen(3000);



