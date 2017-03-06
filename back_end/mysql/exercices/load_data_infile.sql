USE pyrates;

TRUNCATE famous_pyrates;

LOAD DATA INFILE "C:/wamp/www/clients/formations/content/mysql/exercices/pyrates.csv"
INTO TABLE famous_pyrates 
						FIELDS 
							TERMINATED BY ',' 
						
						
						LINES 
							TERMINATED BY ';' 
							STARTING BY '#' 
						
						
						(name,surname,nickname);