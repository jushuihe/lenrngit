(()=>{

//在index.html页面要完成的js特效
/*
  1、对有图片的小说的 img 设置mouseenter事件
  2、设置首页的轮播图
  3、设置主导航条上的mouseenter事件 ，出现下拉框
  4、在window.onload时加载
*/

  //1、先做小说封面的
  // $(".mohu2").on("mouseenter",".mohu",(e)=>{
  //   //增加一个div 和image的高宽一样大
  //   var $tar = $(e.target);
  //   //$tar.css("width"),$tar.css("height");
  //   var html = ` <div class="mohu1">
  //                               <p>书名:xxx</p>
  //                               <p>作者名:xxx</p>
  //                               <p>人气:xxx</p>
  //                   </div>`;
  //           var $html = $(html);
  //           $html.css({
  //             width:$tar.css("width"),
  //             height:$tar.css("height")
  //           });
  //          var $par = $tar.parent().parent();
  //          if($par.is(".mohu"))
  //         $tar.parent().parent().append($html);
  // });
  // $("#mohu").on("mouseleave",".mohu",(e)=>{
  //   $pre=$(".mohu1").remove();
  // });


  //2、设置首页的轮播图
  function lunbo(){
    //得到轮播图的div
    var $tar = $(".lunbo>.lunbo_part1>div:first-child"),$nav=$(".lunbo_part1>.indicators");
    var $imgs =$(".lunbo>.lunbo_part1>div:first-child>img"); 
    var LIWIDTH =473,INTERVAL=500,WAIT=2000,canMove=true,timer=null;
    var i = 0;
    function autoMove(){
      if(canMove){
        if(i==$imgs.length-1){
          i=0;
          $tar.css("left",0);
        }
        timer = setTimeout(()=>{
          i++;
          $nav.children(":eq("+i%5+")").addClass("hover").siblings().removeClass("hover");
          $tar.animate({left:-i*LIWIDTH},INTERVAL,autoMove);
        },WAIT);
      }
    }
    autoMove();
    /*设置鼠标悬停在轮播图上时 的停止轮播的事件*/
    $(".lunbo_part1").hover(()=>{
      canMove=false;   //关闭轮播的开关变量
      clearTimeout(timer);  //停止等待
      timer=null;
    },
    ()=>{
      canMove=true;
      autoMove();
    })
    // 设置nav的点击事件
    $nav.stop(true).on("click","li",e=>{
      i=$(e.target).index();
      $tar.stop(true).animate({left:-i*LIWIDTH},INTERVAL);
      $nav.children(":eq("+i%5+")").addClass("hover").siblings().removeClass("hover");
    });
    // 设置上一页，下一页的标签事件
    $(".arrow-left").click(function(){
      if(i == 0){
        i=$imgs.length-1;
        $tar.css("left",-LIWIDTH*i);
      }
      i--;
      $tar.stop(true).animate({left:-i*LIWIDTH},INTERVAL,autoMove);
      $nav.children(":eq("+i%5+")").addClass("hover").siblings().removeClass("hover");
    });
    $(".arrow-right").click(function(){
      if(i==$imgs.length-1){
        i=0;
        $tar.css("left",0);
      }
      i++;
      $tar.stop(true).animate({left:-i*LIWIDTH},INTERVAL,autoMove);
      $nav.children(":eq("+i%5+")").addClass("hover").siblings().removeClass("hover");
    });
  }
  lunbo();

  // 3、设置主导航条上的mouseenter事件 ，出现下拉框
  $(".nav>ul:nth-child(2)").on("mouseenter","li",(e)=>{
      let $tar = $(e.target);
      var i = $(".nav>ul:nth-child(2)").children().index($tar);
      $(".pullDown:nth-child("+(i+4)+")").css("height","170px").siblings(".pullDown").css("height",0);
  });
  // console.log($(".nav>ul:nth-child(2)").html());
  $(".nav>ul:nth-child(2)").mouseleave(function(){
    $(this).children(".pullDown").css("height",0);
  })



/*设置下雪事件*/
var timer;
$(".btn_snow").click(e=>{
  $tar = $(e.target);
  $("#container>div").css({background:"#313131"});
  $("body").css("background","rgba(0,0,0,0.8)");
 
  function flow(){
        console.log("aa");
				var snow = `<div class="snow"></div>`;
				var $snow = $(snow);
				$snow.css({
					left:Math.random()*1900,
					top:300
				}).animate({
					left:$snow.css("left"),
					top:3300
        },35000);
        console.log($snow);
				$("body").append($snow);
				if($(".snow").length>70) $(".snow")[0].parentNode.removeChild($(".snow")[0]);
			}
			$("body").on("mouseover",".snow",function(e){
						var $tar = $(e.target);
						var left = $tar.css("left");
						if($tar.css("top")=="3300px"){
							$tar.animate({
								left:parseInt(left)-parseInt(Math.random()*50),
								top:3300-parseInt(Math.random()*50)
						},1000);
						}
						console.log($tar.css("top"));
						console.log($tar.css("left"));
			});
			$("body").on("mouseout",".snow",function(e){
				$(e.target).animate({
					left:parseInt($(e.target).css("left"))-parseInt(Math.random()*50),
					top:3300
				},2000);
			});

			flow();
			timer = setInterval(flow,1000);
})
    $(".btn_snowclear").click(function(){
        clearInterval(timer);
        $("#container>div").css({background:"white"});
        $("body").css("background","white");
    })



    //这里要执行的操作是对 class 为 f1 的div 进行添加数据的处理
    var aa;
    function loadMsg1(style){
        var style = style;
        return new Promise(function(ers,r){$.get({
                url:"../data/routes/products/index_getProduct.php",
                data:{style:style},
                dataType:"JSON",
                success:function(data){
                    aa =  data;
                    ers();
                },
                error:function(){
                   return  "网络故障";
                }
                })
            }
        )
    }

   async function fun(){
       // var f1 = await loadMsg1("isWangyou");
       // load(aa,1);
       // var f2 = await loadMsg1("isDianjin");
       // load(aa,2);
       // var f3 = await loadMsg1("isLunli");
       // load(aa,3)

       //位轮播旁边的产品展示区的产品增加内容
       var f1 = await loadMsg1("isXiaoyuan");
       loadProduct_show(aa);

       //为热门推荐模块增加内容
       var f1 = await loadMsg1("isLunli");
       loadProducts_f2(aa);

       //为信仰榜单模块增加内容
       for(let i =1;i<4;i++){
           var f1 = await loadMsg1($(".bangdan:nth-child("+i+")").attr("data-style"));
           load(aa,i);
       }
   }
    fun();

    //为信仰榜单模块增加内容
    function load(data,i){
        var style;
        var $bangdan1 = $(".bangdan:nth-child("+i+")");
        if(i==1) style="全站";
        else if(i==2) style= "新书";
        else if(i==3) style= "原创";

        var html =` <li>${style} <img class="rf" src="../img/index/faithlist-1.png" alt=""></li>`;
        for(let i = 0;i<6;i++){
            let msg = data.bigPic[i];
            html += `<li><span>${i+1}</span>
                    <span><a href="product_details.html?id=${msg.story_id}">${msg.story_name}</a>
                    </span><span>万信仰</span><span>${msg.story_readcount}</span></li>
                `;
        }
        $bangdan1.html(html);
    }

    //为热门推荐模块增加内容
    function loadProducts_f2(data){
        var $tar = $(".f2_part1_container");
        var html =` <ul><li>签约新秀<img class="rf remenPic" src="../img/index/hot-recom-list-1.png" alt=""></li>`;
        var data = data.bigPic;
        for(let i=0;i<2;i++){
            let msg = data[i];
            html += `
                <li>
                    <img class="lf" src="${msg.md}" alt="">
                    <div class="rf">
                        <p>${msg.story_name}</p>
                        <p>${msg.story_introduction}</p>
                    </div>
                </li>
            `;
        }
        html += ` </ul><ul><li>热门作品<img class="rf remenPic" src="../img/index/hot-recom-list-2.png" alt=""></li>`;
        for(let i=2;i<4;i++){
            let msg = data[i];
            html += `
                <li>
                    <img class="lf " src="${msg.md}" alt="">
                    <div class="rf">
                        <p>${msg.story_name}</p>
                        <p>${msg.story_introduction}</p>
                    </div>
                </li>
            `;
        }
        html += `</ul> <ul><li>限时优惠<img class="rf remenPic" src="../img/index/hot-recom-list-3.png" alt=""></li>`;
        for(let i=4;i<10;i++){
            let msg = data[i];
            html +=`
                 <li><a href="product_details.html?id=${msg.story_id}"><span>${msg.story_name}</span><span>-30%</span></a></li>
            `;
        }
        html +=` </ul>`;
        $tar.html(html);
    }
    //位轮播旁边的产品展示区的产品增加内容
    function loadProduct_show(data){
        var $tar = $(".product_show");
        var html = ``;
        for(let i =0;i<6;i++){
            let msg = data.bigPic[i];
            html += `<li class="mohu" data-autor="${msg.story_autor}" data-readCount="${msg.story_readcount}" data-collector="${msg.collectorCount}" data-id="${msg.story_id}"><a href="pruduct_details.html?id=${msg.story_id}">
                <img  src="${msg.md}"></a><span>${msg.story_name}</span></li>`;
        }
        $tar.html(html);
    }

    //为产品展示区增加 onmouseenter 事件
    $(".product_show").on("mouseenter","img",(e)=>{
        var $tar = $(e.target);
        var $li = $tar.parent().parent();

        var story_autor = $li.attr("data-autor");
        var read = $li.attr("data-readCount");
        var collector = $li.attr("data-collector");
        var id = $li.attr("data-id");
        // console.log(id);
        var html = ` <a class="mohu1" href="product_details.html?story_id=${id}">
                                  <p>书名:${story_autor}</p>
                                  <p>阅读数:${read}</p>
                                  <p>收藏数:${collector}</p>
                      </a>`;
        var $html = $(html);
        // console.log($li.css("width"));
        $html.css({
            width:$li.css("width"),
            height:$li.css("height")
        });
        $li.append($html);
        $(".mohu1").children().first().animate({left:10},500);
        $(".mohu1").children().first().next().animate({left:10},800);
        $(".mohu1").children().last().animate({left:10},1100);
    });

    $(".product_show").on("mouseleave",".mohu1",(e)=>{
        $(".mohu1").remove();
    });
})();