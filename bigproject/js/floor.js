(()=>{
  //向floor.html 页面发送请求，将floor.html 页面的内容 加入到index.js 页面




    // 这里封装一个函数 ，实现的功能是，根据不同的楼层来发送不同的请求 等到数据后将拼接的内容加载到页面中
    function loadMsg(style){
      var style = style;
      $.get({
        url:"../data/routes/products/index_getProduct.php",
        data:{style:style},
        dataType:"JSON",
        success:function(data){
          // console.log(data);
            var html = `<div class="floor_container mohu2 clear">`;
          //拼接第一个部分
          var bigPic = data["bigPic"];
          html += `<div class="floor_part1 ">
          <p><span>热门原创</span><a href="#"><img src="../img/index/疑问.png" alt=""></a><a class="rf" href="#">更多&nbsp;&gt;</a></p>`;
          for(var p of bigPic){
            html+=`<div class="mohu">
                    <img src="${p.md}" alt="">
                    <p data-autor="${p.story_autor}" data-readCount="${p.story_readcount}" data-collector="${p.collectorCount}" data-id="${p.story_id}">${p.story_name}</p>
                    <span><span>${p.totalWords}</span>万字</span>
                  </div>`;
          }
          html+=`</div>`;
          html+=`<div class="floor_part2">
                 <p>编辑推荐</p>`;
          var recommend = data["recommend"];
          for(var f of recommend){
            html +=`
              <div>
                <img src="${f.md}" alt="">
                <div>
                  <p><a href="product_details.html?id=${f.story_id}">${f.story_name}</a></p>
                  <p>${f.story_introduction}</p>
                </div>
                <span><span>${f.totalWords}</span>万字</span>
              </div>
            `;

          }
          html+=`</div>
          <div class="floor_part3">
            <p><span>原创</span><span>战力榜</span></p>`;
          html+=`<ul>`;
          var ovationCount = data["ovationCount"];
          for(var f in ovationCount){
            var aa = ovationCount[f];
            if(f<3){
              html+=`
              <li class="sanjiao">
              <span>${parseInt(f)+1}</span>
              <img src="${aa.md}" alt="">
              <div>
              <p><a href="product_details.html?id=${aa.story_id}">书名：${aa.story_name}</a></p>
              <p>作者:${aa.story_autor}</p>
              <p>战力:${aa.story_readcount}</p>
              </div>    
              </li>
              `;
            }else{
              html+=`
              <li>
              <span>${parseInt(f)+1}</span>
              <span><a href="product_details.html?id=${aa.story_id}">${aa.story_name}</a></span>
              <span>${aa.story_readcount}万战力</span>
              </li>
              `;
            }
          }
          html +=`    </ul>
                    </div>
                  </div>
                `;
            $("[data-style='"+style+"']").html(html);
        },
        error:function(){
          alert("网络故障");
        }
      });
    }


    //传过来的值包含 热门原创，热门同人，热门演汇，热门女性向  最近更新 几个方面
    //分别用 isXinfan  isTongren  isRiqing   isHarem    updataTime  表示
    // loadMsg("isTongren");
    //查找页面中有有几个class为floor 的div 然后根据当前div的自定义属性去 从后台提取数据
    var length = $(".floor").length;
    for(let i =0;i<length;i++){
     let $floor =  $(".floor:nth-child("+(i+4)+")");
     //获取到要操作的页面元素
        let style= $floor.attr("data-style");
        loadMsg(style);
    }




    $(".floor").on("mouseenter","img",(e)=>{
        //增加一个div 和image的高宽一样大
        var $tar = $(e.target);
        //$tar.css("width"),$tar.css("height");
        // data-autor="${p.story_autor}" data-readCount="${p.story_readcount}" data-collector="${p.collectorCount}
        var story_autor = $tar.next().attr("data-autor");
        var read = $tar.next().attr("data-readCount");
        var collector = $tar.next().attr("data-collector");
        var id = $tar.next().attr("data-id");
        var html = ` <a class="mohu1" href="product_details.html?story_id=${id}">
                                  <p>书名:${story_autor}</p>
                                  <p>阅读数:${read}</p>
                                  <p>收藏数:${collector}</p>
                      </a>`;
        var $html = $(html);
        $html.css({
          width:$tar.css("width"),
          height:$tar.css("height")
        });

        var $par = $tar.parent();
        if($par.is(".mohu")) $par.append($html);
        else if($par.parent().is(".mohu")) $par.parent().append($html);
        $(".mohu1").children().first().animate({left:10},500);
        $(".mohu1").children().first().next().animate({left:10},800);
        $(".mohu1").children().last().animate({left:10},1100);

        //鼠标移入的时候将文字变成红色
    });

    $(".floor").on("mouseleave",".mohu",(e)=>{
        $(".mohu1").remove();
    });

})();