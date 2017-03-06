USE pyrates;

PREPARE toto FROM 'SELECT * FROM famous_pyrates WHERE id=? OR id=?';
SET @id1 = 1;
SET @id2 = 1;
EXECUTE toto USING @id1, @id2 ;