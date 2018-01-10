<?php
    require("../../init.php");
    function getSection(){
        global $conn;
        @$story_id = $_REQUEST['story_id'];
        //这个函数的主要作用是获取数据库story1_section 中 小说story_id 为1 的所有的章节名
        $sql  = "SELECT section_name FROM story".$story_id."_section";
        $result = mysqli_query($conn,$sql);
        $row = mysqli_fetch_all($result);
        echo json_encode($row);
    }

?>

