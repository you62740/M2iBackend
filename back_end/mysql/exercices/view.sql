USE pyrates;

CREATE VIEW info_pyrates AS SELECT f.name AS name, f.surname AS surname, s.name AS shipname FROM famous_pyrates AS f LEFT JOIN ships AS s ON f.id = s.owner_id WHERE s.is_unique_ship = "1" ORDER BY f.id;