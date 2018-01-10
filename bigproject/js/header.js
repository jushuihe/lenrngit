(()=>{

  function loadStatus(){
      //判断登录:
		var $loginList=$("#loginList");
		var $welcomeList=$("#welcomeList");
		$.ajax({
			type:"get",
			url:"../data/routes/users/isLogin.php",
            dataType:"json",
            success:function(data){
                if(data.ok==1){
                    $loginList.hide();
                    $welcomeList.show();
                    $("#uname").html(data.uname);
                }else{
                    $loginList.show();
                    $welcomeList.hide();
                }
            },
            error:function(){
                console.log("没得到isLogin的数据");
            }
		});
	}


  //向header.html 页面发送请求 获取 header.html 页面的结构
  $.ajax({
    type:"get",
    url:"header.html",
    dataType:"html"
  }).then((data)=>{
    $("#header").html(data);
      loadStatus();
    //如果url中有kw参数，就读取kw参数，到搜索文本框中
    var $search = $("div.search input");  //得到搜索框
    if(location.search) $search.val(decodeURI(location.search.split("=")[1]));
    $("div.search img").click((e)=>{
      e.preventDefault();
      var $btn = $(e.target);
      var $kw = $search.val().trim();
      if($kw!="") location.href ="products.html?kw="+$kw;
      $kw = $kw = $(".header_search>input").val();
      // console.log($kw);



    })
  //  为 user_center 添加onmouseenter 事件
      $("#welcomeList").mouseenter(function(e){
          $(".user_center").addClass("show_drop-menu");
      }).mouseleave(function(e){
           $(".user_center").removeClass("show_drop-menu");
      })

      //为退出登录 添加点击事件
      $(".login_out").click(function(){
          console.log("点击成功");
          $.ajax({
              url:"../data/routes/users/logout.php",
              type:"GET",
          });
          location.href="index.html";
      })

  });

  



  
  


})()