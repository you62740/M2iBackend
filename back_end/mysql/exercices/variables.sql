SET @toto="tata";


SELECT @t1:=(@t2:=2) + (@t3:=2) AS total, @t2 as left_operand, @t3 as right_operand;