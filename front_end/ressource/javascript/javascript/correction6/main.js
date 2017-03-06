function Personnage(	
						p_name,
						p_job,
						p_picture,
						p_luckiness,
						p_hp,
						p_mana,
						p_strength
)
{
	this.name 		= p_name 		|| "no_name";
	this.job 		= p_job 		|| "no_job";
	this.picture 	= p_picture 	|| "no_picture";
	this.luckiness 	= p_luckiness	|| 0;
	this.strength 	= p_strength 	|| 0;
	this.mana 		= p_mana 		|| 0;
	this.hp 		= p_hp 			|| 0;
}



Personnage.prototype.strength 	= 0;
Personnage.prototype.luckiness 	= 0;
Personnage.prototype.hp 		= 0;
Personnage.prototype.mana 		= 0;

Personnage.prototype.name 		= "no_name";
Personnage.prototype.job 		= "no_job";
Personnage.prototype.picture	= "no_picture";


Personnage.prototype.display	= function(p_container)
{
	var html = "";
	
	html+= "<table>";
	html+= 		"<tr>";
	html+= 			'<td>'
	html+=				'<video width="640" height="480" controls autoplay id="'+this.name+'">';
	html+=					'<source src="'+this.picture+'" type="video/mp4"/>';
	html+=				'</video>';
	html+=			'</td>';
	html+= 			"<td>";
	html+= 				"<p>Nom: "+this.name+"</p>";
	html+= 				"<p>Job: "+this.job+"</p>";
	html+= 			"</td>";
	html+= 		"</tr>";
	html+= 		"<tr>";
	html+= 			"<td>Force: "+this.strength+"</td>";
	html+= 			"<td>Chance: "+this.luckiness+"</td>";
	html+= 		"</tr>";
	html+= 		"<tr>";
	html+= 			"<td>Magie: "+this.mana+"</td>";
	html+= 			"<td>HP: "+this.hp+"</td>";
	html+= 		"</tr>";
	html+= "</table>";
	
	p_container.innerHTML = html;
};







function start()
{
	var cloud = new Personnage(	"Cloud Strife", 
								"Soldat", 
								"http://localhost/clients/formations/content/javascript/exo7/uncharted.mp4",
								255,
								9999,
								999,
								255
							);
							
	cloud.display(document.getElementById("container"));
}

window.addEventListener("load", start );


