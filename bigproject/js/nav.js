/**
 * Created by web-01 on 2017/12/6.
 */
$.ajax({
    url:"nav.html",
    method:"GET",
    dataType:"html",
    success:function(data){

        $(".nav").html(data);
        addDorpdown();
    },
    error:function(){
        alert("网络错误")
    }
});

//这个函数的作用是在为nav 里面的内容添加输入移入 出现事件
function addDorpdown(){
    $(".menu").mouseenter(function(){
        var $tar = $(this);
        // console.log($tar);
        $tar.children(".dropDown-menu").addClass("show_drop-menu");
    }).mouseleave(function(){
        var $tar = $(this);
        $tar.children(".dropDown-menu").removeClass("show_drop-menu");
    })
}