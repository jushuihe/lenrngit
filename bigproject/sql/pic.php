<?php
	require("../data/init.php");
	for($i=0;$i<300;$i++){
		$md ="../img/02/1 ($i).jpg";
		$sm ="../img/sm/1 ($i).jpg";
		$lg ="../img/lg/1 ($i).jpg";
		$sql = "insert into story_pic values('$i','$sm','$md','$lg')";
		echo $sql;

		$result=mysqli_query($conn,$sql);
		if($result==true) echo "插入成功";
	}
?>