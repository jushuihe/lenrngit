<?php
	header("Content-Type:application/json");
	//
	require_once("../../controllers/product.controler.php");
	get_index_products();
?>