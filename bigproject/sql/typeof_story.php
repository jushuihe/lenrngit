<?php
	
	/*创建一个表表示小说的类型有哪些
		create TABLE typeof_story(
			story_id           INT PRIMARY KEY AUTO_INCREMENT,
			story_name         VARCHAR(32),
			isRiqing           INT,
			isTongren          INT,
			isDianjin          INT,
			isMeishi           INT,
			isXiaoyuan         INT,
			isXinfan           INT,
			isLianai           INT,
			isLunli            INT,
			isWangyou          INT,
			isFighting         INT,
			isHarem            INT
		);

	*/
	require("../data/init.php");
//	for($i = 0;$i<=300;$i++){
//		$sql = "insert into typeof_story(isRiqing,isTongren,isDianjin,isMeishi,isXiaoyuan,isXinfan,isLianai,isLunli,isWangyou,isFighting,isHarem) values(
//		'".(mt_rand(0,10)>7?1:0)."',
//		'".(mt_rand(0,10)>7?1:0)."',
//		'".(mt_rand(0,10)>7?1:0)."',
//		'".(mt_rand(0,10)>7?1:0)."',
//		'".(mt_rand(0,10)>7?1:0)."',
//		'".(mt_rand(0,10)>7?1:0)."',
//		'".(mt_rand(0,10)>7?1:0)."',
//		'".(mt_rand(0,10)>7?1:0)."',
//		'".(mt_rand(0,10)>7?1:0)."',
//		'".(mt_rand(0,10)>7?1:0)."',
//		'".(mt_rand(0,10)>7?1:0)."'
//		)";
//		$result = mysqli_query($conn,$sql);
//		echo $sql;
//		if($result == true){
//			echo "添加成功";
//		}
//	}	
	for($aa=0;$aa<300;$aa++){
		$story_name = "select story_name from story_list where story_id='$aa'";
		$result = mysqli_query($conn,$story_name);
		if(mysqli_fetch_all($result,1)){
		$sql = "update typeof_story set story_name=(select story_name from story_list where story_id='$aa') where story_id='$aa'";
//		echo $sql;
		$result = mysqli_query($conn,$sql);
		if($result) echo "修改成功";
		}
	}
?>