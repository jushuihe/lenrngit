<?php

  require_once("../../init.php");

  //通过接受传过来的一个参数 返回一个一个固定结构的json数组
  function getMsg(){

    global $conn;
    //传出的数据的结构包括十个大图，编辑推荐，战力榜
    $output = [
      "bigPic"=>[],
      "recommend"=>[],
      "ovationCount"=>[],
    ];
    @$style = $_REQUEST["style"];
    //传过来的值包含 热门原创，热门同人，热门演汇，热门女性向  最近更新 几个方面
    //分别用 isXinfan  isTongren  isRiqing   isHarem    updataTime  表示
    if($style!="updataTime"){
      $sql = "select story_id,story_name,story_autor,story_readcount,isGold,isSliver,isRecommend,story_introduction,totalWords,collectorCount,(select md from story_pic where story_id1=story_id) as md  from story_list inner join typeof_story on story_id=story_id1  where ".$style."='1'  ORDER BY collectorCount DESC";
    }else{
      $sql = "select story_id,story_name,story_autor,story_readcount,isGold,isSliver,isRecommend,story_introduction,updataTime,totalWords,collectorCount,(select md from story_pic where story_id1=story_id) as md from story_list ORDER BY updataTime DESC";
    }
    $result = mysqli_query($conn,$sql);
    $result1 = mysqli_fetch_all($result,1);

    $output["bigPic"] = array_slice($result1,0,10);
    //截取数组中的一段数据   0位置开始，截取10个
    $output["recommend"] = array_slice($result1,10,4);
    $output["ovationCount"] = array_slice($result1,14,9);
    echo json_encode($output);
  }


?>