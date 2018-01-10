<?php
	$conn =mysqli_connect("127.0.0.1","root","","miko",3306);
	header("Content-Type:application/json;charset=utf-8");
	mysqli_query($conn,"SET NAMES UTF8");
?>