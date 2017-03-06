USE pyrates;

DELIMITER |
CREATE PROCEDURE add_treasures(	IN p_num INT, 
								IN p_max_value SMALLINT, 
								IN p_num_years SMALLINT UNSIGNED 
)
BEGIN
   DECLARE i 			INT UNSIGNED DEFAULT 1;
   DECLARE amount 		INT UNSIGNED DEFAULT 1;
   DECLARE disco_date 	DATE DEFAULT '1680-01-01';

   WHILE i <= p_num DO
   
	  SET amount = FLOOR( RAND() * p_max_value );
	  SET disco_date = ADDDATE("1680-01-01", FLOOR( RAND() * p_num_years * 365) );
	  
	  INSERT INTO treasures_part (id, amount, discovery) VALUES ( i, amount, disco_date);
	  INSERT INTO treasures_no_part (id, amount, discovery) VALUES ( i, amount, disco_date);
      SET i = i + 1;
	  
   END WHILE;
END |
DELIMITER ;


CREATE TABLE treasures_part
(
   id INT UNSIGNED NOT NULL,
   amount INT UNSIGNED NOT NULL,
   discovery DATE NOT NULL DEFAULT '1680-01-01'
   
) PARTITION BY RANGE(YEAR(discovery))
(
   PARTITION p1 VALUES LESS THAN(1680),
   PARTITION p2 VALUES LESS THAN(1685),
   PARTITION p3 VALUES LESS THAN(1690),
   PARTITION p4 VALUES LESS THAN(1695),
   PARTITION p5 VALUES LESS THAN(1700),
   PARTITION p6 VALUES LESS THAN(1705),
   PARTITION p7 VALUES LESS THAN(1710),
   PARTITION p8 VALUES LESS THAN(MAXVALUE)
);


CREATE TABLE treasures_no_part
(
   id INT UNSIGNED NOT NULL,
   amount INT UNSIGNED NOT NULL,
   discovery DATE NOT NULL DEFAULT '1680-01-01'
);

