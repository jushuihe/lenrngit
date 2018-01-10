<?php
	require("../../init.php");
	function register(){
		global $conn;
		@$uname = $_REQUEST["uname"];
		@$upwd = $_REQUEST["upwd"];
		@$email = $_REQUEST["email"];
		@$phone = $_REQUEST["phone"];
		if($uname&&$upwd&&$email&&$phone){
			$sql = "insert into miko_users (uid,uname,upwd,email,phone) values (null,'$uname','$upwd','$email','$phone')";
			$result = mysqli_query($conn,$sql);

			//直接登录，将用户的uid 保存在uid中
			$sql = "select * from miko_users where uname='$uname' and binary upwd='$upwd'";
			$result = mysqli_query($conn,$sql);
			$user = mysqli_fetch_all($result,1);
			session_start();
			$_SESSION["uid"] = $user[0]["uid"];
		}
	}

	function checkName(){
		global $conn;
		@$uname = $_REQUEST["uname"];
		if($uname){
			$sql = "select * from miko_users where uname='$uname'";
			$result=mysqli_query($conn,$sql);
			$user = mysqli_fetch_all($result,1);
			if($user) return false;
			else return true;
		}
	}
	
	function login(){
		global $conn;
		@$uname = $_REQUEST["uname"];
		@$upwd = $_REQUEST["upwd"];
		if($uname&&$upwd){
			$sql = "select * from miko_users where uname='$uname' and binary upwd='$upwd'";
			$result = mysqli_query($conn,$sql);
			$user = mysqli_fetch_all($result,1);
			if(count($user)!=0){  //找到查结果
				session_start();
				$_SESSION["uid"] = $user[0]["uid"];
				return true;//登陆成功
			}else{
				return false;
			}
		}
	}

	function logout(){
		session_start();
		$_SESSION["uid"]=null;
	}
	function isLogin(){
		global $conn;
		session_start();
		@$uid=$_SESSION["uid"];
		if($uid){
			$sql= "select uname from miko_users where uid=$uid";
			// echo $sql;
			$result=mysqli_query($conn,$sql);
			$user=mysqli_fetch_all($result,1);
			$uname = $user[0]['uname'];

			return ["ok"=>1,"uname"=>$user[0]["uname"]];
		}else
			return ["ok"=>0];
	}


?>