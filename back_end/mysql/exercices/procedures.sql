USE pyrates;

DELIMITER | 

CREATE PROCEDURE add_pyrate( IN p_name VARCHAR(30), IN p_surname VARCHAR(50), IN p_nickname VARCHAR(50), IN p_sex CHAR(1), IN p_ship_name VARCHAR(50),IN p_unique_ship CHAR(1))

BEGIN

	INSERT INTO famous_pyrates (name, surname, nickname, sex) VALUES ( p_name, p_surname, p_nickname, p_sex );

	INSERT INTO ships( name, is_unique_ship, owner_id ) VALUES ( p_ship_name, p_unique_ship, LAST_INSERT_ID() );

END
| 

CREATE PROCEDURE remove_pyrate( IN p_id TINYINT)

BEGIN

	DELETE FROM ships WHERE owner_id = p_id;
	DELETE FROM famous_pyrates WHERE id = p_id;

END
| 

CREATE PROCEDURE remove_pyrate_by_name( IN p_name VARCHAR(30))

BEGIN

	DECLARE pid TINYINT DEFAULT 0;

	SELECT id FROM famous_pyrates WHERE name = "Sparrow" LIMIT 1 INTO pid;
	
	DELETE FROM ships WHERE owner_id = pid;
	DELETE FROM famous_pyrates WHERE id = pid;

END

|




CREATE PROCEDURE addShips(IN p_quantity TINYINT)
BEGIN
	DECLARE done INT DEFAULT 0;
	DECLARE ship_quantity TINYINT DEFAULT 0;
	DECLARE ship_id TINYINT DEFAULT 0;
	DECLARE cur1 CURSOR FOR SELECT quantity, id FROM ships;
	DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET done = 1;
	
	OPEN cur1;
	
	REPEAT
		FETCH cur1 INTO ship_quantity, ship_id;
	
		IF done = 0 THEN
	
			UPDATE ships SET quantity = ship_quantity + p_quantity WHERE id = ship_id;
		
		END IF;
		
		
	UNTIL done END REPEAT;
		
	CLOSE cur1;
END


| 

DELIMITER ;



CALL add_pyrate("Sparrow", "Jack", "Jacky", "M", "Black Pearl", "1");
CALL remove_pyrate_by_name("Sparrow");
CALL addShips(100);


DELIMITER |

CREATE TRIGGER trigger_remove BEFORE DELETE ON famous_pyrates FOR EACH ROW 

BEGIN 
	DELETE FROM ships WHERE owner_id = id;
END
|

DELIMITER |

CREATE TRIGGER add_ship_auto AFTER INSERT ON famous_pyrates FOR EACH ROW 

BEGIN 
	INSERT INTO ships (name) VALUES( CONCAT("bateau_de_", NEW.name) );
END
|


CALL add_pyrate("Sparrow", "Jack", "Jacky", "M", "Black Pearl", "1");

