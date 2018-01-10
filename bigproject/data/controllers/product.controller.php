<?php
	require("../../init.php");
	function get_index_products(){
		global $conn;
		$output=[
			
		];
		$sql = "select * from story_list inner join story_pic on story_id=story_id1";
		$result = mysqli_query($conn,$sql);
		$products = mysqli_fetch_all($result,1);
		echo json_encode($products);
	}

	function getProductsByKw(){
		global $conn;
		$output=[
			"count"=>0,
			"pageSize"=>9,
			"pageCount"=>0,
			"pageNo"=>0,
			"data"=>[]
		];
		if($_REQUEST["pageSize"]!=""||$_REQUEST["pageSize"]!=null){
		    $output["pageSize"] = $_REQUEST["pageSize"];
		}
		$output["pageSize"]= (int)$output["pageSize"];
		// data:{kw:$kw,pno:pno,storyStory:storyStyle}
		//前台传向后台的三个数据
		@$kw = $_REQUEST["kw"];
		@$stroyStyle = $_REQUEST["storyStyle"];
		@$pno = (int)$_REQUEST["pno"];
		if($pno) $output["pageNo"] = $pno;
		//表示当前请求的是哪一个表	
		
		if($stroyStyle=="all"){
			$sql = "select story_id,story_name,story_autor,story_readcount,story_introduction,totalWords,collectorCount,(select md from story_pic where story_id1=story_id) as md from story_list ";
				
			if($kw){
				$sql .= " where";
				$kws = explode(" ",$kw);  //js:split
				for($i=0;$i<count($kws);$i++){
					$kws[$i]=" story_name like '%".$kws[$i]."%'";
				}
				$sql .= "  ".implode(" and ",$kws);
			}
		}else if($stroyStyle=="updataTime"||$stroyStyle=="collectorCount"||$stroyStyle=="totalWords"||$stroyStyle=="ovationCount"){
			$sql = "select story_id,story_name,story_autor,story_readcount,story_introduction,totalWords,collectorCount,(select md from story_pic where story_id1=story_id) as md from story_list ";
			if($kw){
				$sql .= " where";
				$kws = explode(" ",$kw);  //js:split
				for($i=0;$i<count($kws);$i++){
					$kws[$i]=" story_name like '%".$kws[$i]."%'";
				}
				$sql .= "  ".implode(" and ",$kws);
			}

			$sql .= " ORDER BY ".$stroyStyle." DESC"; 	//"DESC 降序排列"
		}else{
			$sql = "select story_id,story_name,story_autor,story_readcount,isGold,isSliver,isRecommend,story_introduction,totalWords,collectorCount,(select md from story_pic where story_id1=story_id) as md from story_list inner join typeof_story on story_id=story_id1  where ".$stroyStyle."='1'  ";
				
			if($kw){
				// echo "进入了 if";
				$sql .= " and";
				//将$kw 按空格切割为数组
				$kws = explode(" ",$kw);  //js:split
				//$kw:[mac,256g];
				for($i=0;$i<count($kws);$i++){
					$kws[$i]=" story_name like '%".$kws[$i]."%'";
				}
				$sql .= "  ".implode(" and ",$kws);
						//js:$kws.join(" and ")
			}
		}


//			echo $sql;
			$result = mysqli_query($conn,$sql);
			$products = mysqli_fetch_all($result,1);
			$output["count"]=count($products);
			$output["pageCount"] = ceil($output["count"]/$output["pageSize"]);
			$sql .= " limit ".($output["pageNo"]*$output["pageSize"]).",".$output["pageSize"];
			$result = mysqli_query($conn,$sql);
			$output["data"]=mysqli_fetch_all($result,1);
			echo json_encode($output);

		
	}
	//getProductsByKw();
	function getProductById(){
		global $conn;
		@$lid = $_REQUEST["lid"];
		
	}
?>