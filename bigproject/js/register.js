(()=>{
  //注册页面的js文件
  /*
    需要实现的效果
    1、对注册按钮增加onmouseover事件
    2、在div.hobby 绑定onclick事件如果 点击后增加className .hobby_span
    3、通过AJAX请求进行注册处理
  */
  $("button").mouseover((e)=>{
    var $btn = $(e.target);
    $btn.css("background","#fb808e");
  }).mouseout((e)=>{
    var $btn = $(e.target);
    $btn.css("background","#FF7282");
  });
  
    $("button").click((e)=>{
      var num = $(".true").length;
      if(num == 5){
      var $btn = $(e.target);
      var uname = $(".uname").val();
      var upwd = $(".upwd").val();
      var email = $(".email").val();
      var phone = $(".phone").val();
      ajax({
        type:"get",
        data:"uname="+uname+"&upwd="+upwd+"&email="+email+"&phone="+phone,
        dataType:"text",
        url:"../data/routes/users/register.php"
      }).then((data)=>{
        location="index.html";
      });
    }else{
      $(".add").css({
        opacity:1
      });
      setTimeout(e=>{
        $(".add").css({
        opacity:0
      });
      },2000);
    }
  });

//为用户名的input的表单添加onblur事件
  $(".uname").blur((e)=>{
    var $uname = $(e.target).val();
    if($uname !=""){
      ajax({
        type:"get",
        data:"uname="+$uname,
        dataType:"text",
        url:"../data/routes/users/checkName.php"
      }).then((data)=>{
        if(data) $(".uname").next().attr("class","true");
        else $(".uname").next().attr("class","false");
      });
    }else{
      $(".uname").next().attr("class","false");
    }
  });

  //为邮箱的input添加onblur事件  判断邮箱的格式是否正确
  $(".email").blur((e)=>{
    var $email = $(e.target).val();
    if($email!=""){
      var reg=  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      var bool = reg.test($email);
      if(bool) $(".email").next().attr("class","true");
      else $(".email").next().attr("class","false");
    }else $(".email").next().attr("class","false");
  });


  //为密码框添加onblur事件 用正则表达式来判断是否符合标准
  $(".upwd").blur((e)=>{
    var $upwd = $(e.target).val();
    //密码的要求 6-12 位字母或数字 组成 ，区分大小写
    var reg= /^\w{6,12}$/;
    var bool = reg.test($upwd);
    if(bool) $(".upwd").next().attr("class","true");
    else $(".upwd").next().attr("class","false");
  });


  //为确认密码添加onblur事件，
  $(".cpwd").blur((e)=>{
    var $cpwd = $(e.target).val();
    var $upwd = $(".upwd").val();
    if($cpwd==$upwd) $(".cpwd").next().attr("class","true");
    else $(".cpwd").next().attr("class","false");
  });



  //位手机号码添加blur事件
  $(".phone").blur((e)=>{
    var $phone = $(e.target).val();
    //手机号码
    var reg= /^(\+86)?\s*1[34578]\d{9}$/;
    var bool = reg.test($phone);
    if(bool) $(".phone").next().attr("class","true");
    else $(".phone").next().attr("class","false");
  });



  //对div.hobby绑定onclick事件
  $(".hobby").click((e)=>{
    var $span = e.target;
    if($span.nodeName=="SPAN"){
      if($span.className=="")
      $span.className="hobby_span";
      else $span.className="";
    }
  });



})();