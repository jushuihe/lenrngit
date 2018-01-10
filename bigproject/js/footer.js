(()=>{
  //向header.html 页面发送请求 获取 header.html 页面的结构
  $.ajax({
    type:"get",
    url:"footer.html",
    dataType:"html"
  }).then((data)=>{
    $("#footer").html(data);
  });

})()