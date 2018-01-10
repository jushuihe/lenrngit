$(()=>{
    //为左侧的导航栏添加点击事件
    //点击后出现下拉框
    $(".side-menu").stop().on("click","a",function(e){
        var $tar = $(e.target);
        //得到当前要改变的ul
        var $ul =$tar.parent().children(".child_menu");
        //单个li的长度 和  li 的个数
        var length = $ul.children().length;
        var li = 41;
        if($ul.is(".child_menu")){
            if($ul.css("height")!="0px"){
                $(".child_menu").css("height",0);
            }else{
                $(".child_menu").css("height",0);
                $ul.css("height",""+length*li);
                $ul.css("border-right","5px solid #FA9198");
            }
        }
    })

    //为class 为small_img的 图片设置点击事件  点击生成大图
    $(".table").on("click",".big_img",function(){
        $tar = $(this);
        $tar.css({height:180,width:135,zIndex:"100"});
    }).on("mouseleave",".big_img",function(){
        $tar = $(this);
        $tar.css({height:$(".big_img").css("height"),width:$(".big_img").css("width"),zIndex:"1"});
    })
    loadProducts({});

    //为商品列表设置点击发送请求事件
    //得到 搜索框
    $("#kw").on("keyup","",function(e){
        var $tar = $(this);
        if(e.keyCode==13){
            var $kw = $tar.val();
            $tar.attr("value",$kw);
            // console.log($kw);
            loadProducts({$kw:$kw});
        }
    })
    //设置页码的点击事件
    var $divPages=$(".fengye");
    $divPages.click(e=>{//为divPages绑定单击事件
        var $tar=$(e.target);
        if($tar.is(".btn")){//如果目标元素是a
            //如果a不是divPages的第一个子元素和最后一个子元素
            if(!$tar.is(":first-child,:last-child")){
                //如果当前a的class不是current
                if(!$tar.is(".active")){
                    //获得当前a的内容-1，保存在pno中
                    var pno=$tar.html()-1;
                    //调用loadProducts(pno)重新加载第pno页
                    //向后台发送的数据没有错误
                    loadProducts({pno:pno});
                }
            }else{
                //如果class不以disabled结尾
                if(!$tar.is(".disabled")){
                    //在divPages下查找class为current的a
                    var $curr=$divPages.children(".active");
                    //如果class以next开头
                    if($tar.is(".next")){
                        //重新加载商品列表传入current的内容作为pno
                        loadProducts({pno:$curr.html()});
                    }else{
                        loadProducts({pno:($curr.html()-2)});
                    }
                }
            }
        }});

    //设置 class为 sel 的input 标签 的 change 事件
    $(".sel").change(e=>{
        var $val = $(".sel").val();
        var $kw = $("#kw").val();
        loadProducts({$kw:$kw});
    })



});
function loadProducts({storyStyle,pno,$kw}){
     // console.log(pno);
    //将kw的默认值设置为当前选中的标签
    var storyStyle = storyStyle || "all";
    var pno = pno || 0;
    //这里取的关键词是从search 文本框中提取的信息
    var $kw = $kw || $("#kw").val();
    var pageSize = $(".sel").val();
    $.ajax({
        type:"get",
        url:"../data/routes/products/getProductsByKw.php",
        data:{kw:$kw,pno:pno,storyStyle:storyStyle,pageSize:pageSize}
        //将三个数字全部传向后端
    }).then(output=>{
        // console.log(output);
        var data=output.data;
        if(data!=""){
            var html="";
            for(var p of data){
                html+=`
				    <tr>
                        <td>
                            <input type="checkbox">
                            </td>
                            <td>
                                ${p.story_id}
                            </td>
                            <td>
                                <img  class="small_img" src="${p.md}" alt="" title="点击查看大图">
                                <img  class="big_img" src="${p.md}" alt=""  title="点击查看大图">
                            </td>
                            <td>${p.story_autor}</td>
                            <td>${p.story_name}</td>
                            <td>${p.totalWords}</td>
                            <td>${p.story_readcount}</td>
                            <td>
                                <button class="btn btn-default" data-toggle="details">详情</button>
                                <button class="btn btn-info" data-toggle="update">修改</button>
                                <button class="btn btn-danger" data-toggle="delete">删除</button>
                            </td>
                        </tr>
			`;
            }
            $(".table tbody").html(html);

            var pageCount=output.pageCount,
                pageNo=output.pageNo;
            var html=`<botton class="btn btn-info previous">前一页</botton>`;
            // if(pageNo<10){
            // 	for(var i=1;i<=pageCount;i++){
            // 		if(i<=10) html+=`<a href="javascript:;">${i}</a>`;
            // 		else if(i==11) html+=`<a  class="not" href="javascript:;">...</a>`;
            // 	}
            // }else{
            // console.log(pageNo);
            for(var i=(pageNo-5),b=0;i<=pageCount&&b<10;i++){
                // console.log(i);
                if(i>0){
                    html+=` <botton class="btn btn-info">${i}</botton>`;
                    b++;
                }
            }
            // }
            html+=`<botton class="btn btn-info next">后一页</botton>`;
            var $divPages=$(".fengye");
            $divPages.html(html);
            // $divPages.children(":eq("+(pageNo+1)+")").addClass("current");
            // 给内容中包含 页码数的a标签增加选中样式
            $divPages.children(":contains('"+(pageNo+1)+"')").first().addClass("active");
            checkAStatus($divPages,pageCount,pageNo);}
    },function(){console.log("错误")});
}

function checkAStatus($divPages,pageCount,pageNo){
    //获得divPages下两个a
    var $prev=$divPages.children().first();
    var $next=$divPages.children().last();
    //如果pageNo不是0，也不是pageCount
    if(pageNo!=0&&pageNo!=pageCount-1){
        //两个按钮都启用
        $prev.removeClass("disabled");
        $next.removeClass("disabled");
    }else{//否则
        if(pageNo==0)//如果pageNo==0,就prev禁用
            $prev.addClass("disabled");
        //如果pageNo==pageCount-1,就next禁用
        if(pageNo==pageCount-1)
            $next.addClass("disabled");
    }
}