/**
 * Created by web-01 on 2017/12/6.
 */
$(function(){
    //分享模块 设置鼠标移入  事件
    $(".min-btn-group").mouseenter(()=>{
        $("#block-share").addClass("share-show");
    }).mouseleave(()=>{
        $("#block-share").removeClass("share-show");
    })
    $(".weixin").mouseenter(()=>{
        $(".qrcode").addClass("share-show");
    }).mouseleave(()=>{
        $(".qrcode").removeClass("share-show");
    })

    //
    $(".calendar").on("mouseenter",".dd",function(e){
        var $tar =$(this);
        if($tar.children(".detail")[0] !=  undefined){
            $tar.css("background","#FF7C8C").css("cousor","pointer");
            $tar.children(".detail").addClass("share-show");
        }
    }).on("mouseleave",".dd",function(){
        var $tar =$(this);
        if($tar.children(".detail")[0] !=  undefined){
            $tar.css("background","none");
            $tar.children(".detail").removeClass("share-show");
        }
    })
    //设置月份切换的两个按钮
    $(".btn-switch").click(function(e){
        var $tar = $(e.target);
        var month = parseInt($(".mt").html());
        console.log(month);
        if($tar.is(".btn-switch span:first")){
            console.log("上个月");
            addToClaendar((month-1)==0?12:(month-1));
        }else{
            console.log("下个月");
            addToClaendar((month+1)%12==0?12:(month+1)%12);
        }
    })
    addToClaendar(new Date().getMonth());
    //封装一个函数 他要实现的功能是 在 calendar中 循环添加 里面的内容

    //todo 为查看更多设置点击事件
    $(".js-btn-rank-more").click(function(e){
        e.preventDefault();
        var $tar = $(this);
        console.log($tar);
        $tar.hide();
        $(".loading").show();
    })


    let story_id = location.search.split("=")[1];

    console.log(story_id);
    getSectionName(story_id);

});

// todo 封装一个函数 从数据中 得到小说章节名字的 数据
function getSectionName(story_id){
    $.ajax({
        type:"get",
        data:"",
        dataType:"json",
        data:{story_id:story_id},
        url:"../data/routes/products/getProductById.php",
        success:function(data){
            // 已经得到数据
            let html = `<ul class="list-volume"><li class="volume">`;
            html += `<h3>魔王踏上了用女装拯救自己的旅程</h3>
                    <ul class="list-chapter">`;
            for(let i=0;i<100;i++){
                let msg = data[i][0];
                //这里的小说具体内容的 的 地址是由 小说id和 小说章节id 拼接而成
                html += `<li class="chapter cpt-434324"><a href="story_content_${story_id}${i}" title="${msg}">${msg}</a></li>`;
            }
            html += `  </ul>
                        </li>
                        <li class="volume">
                            <h3 title="小章节名">穿越时空的少女</h3>
                            <ul class="list-chapter">
                        `;
            for(let i=100;i<200;i++){
                let msg = data[i][0];
                //这里的小说具体内容的 的 地址是由 小说id和 小说章节id 拼接而成
                html += `<li class="chapter cpt-434324"><a href="story_content_${story_id}${i}" title="${msg}">${msg}</a></li>`;
            }
            html += `  </ul>
                        </li>
                        <li class="volume">
                            <h3 title="小章节名">樱花树下的未名山庄</h3>
                        <ul class="list-chapter">                        
                        `;
            for(let i=200;i<300;i++){
                let msg = data[i][0];
                //这里的小说具体内容的 的 地址是由 小说id和 小说章节id 拼接而成
                html += `<li class="chapter cpt-434324"><a href="story_content_${story_id}${i}" title="${msg}">${msg}</a></li>`;
            }
            html += `  </ul></li></ul>`;
            $("#book-menu").html(html);

        },
        error:function(){}
    })
}


function addToClaendar(month){
    let now = new Date();

    let data = now.getDate();  //  几号
    let day = now.getDay();  //星期数
    let new_day = (7+day-(data-1)%7)%7;   //得到这个月的一号是星期几
    let x = 0;
    let month_day  = mGetDate(now.getFullYear(),month);                           //得到这个月有多少天
    let html = `<div class="row row-h">
                                        <span class="mt">${month}</span>
                                        <span class="scl">月</span>
                                        <span class="d">已更新28天，累计80133字</span>
                                        <div class="change"></div>
                                    </div>
                                    <div class="row row-day">
                                        <div class="dd">
                                            <span class="day">日</span>
                                        </div>
                                        <div class="dd">
                                            <span class="day">一</span>
                                        </div>
                                        <div class="dd">
                                            <span class="day">二</span>
                                        </div>
                                        <div class="dd">
                                            <span class="day">三</span>
                                        </div>
                                        <div class="dd">
                                            <span class="day">四</span>
                                        </div>
                                        <div class="dd">
                                            <span class="day">五</span>
                                        </div>
                                        <div class="dd">
                                            <span class="day">六</span>
                                        </div>
                                    </div>`;
    for(let i =0;i<6;i++){
        //一共添加42个小div
        html += `<div class="row row-date">`;
        for(let j = 0;j<7;j++){
            html += `<div class="dd">`;
            if((i*7+j+1)>new_day&&x<month_day){
                x++;
                html+=`<span class="data">${x}</span>
                    <span class="check"></span>
                    <span class="detail">《女装勇者踏上复仇之路》更新1章 共2015字</span>`;

            }
            html += `</div>`;
        }
        html += ` </div>`;
    }

    html += ` </div>`;
    $(".calendar-book").html(html);
}

function mGetDate(year,month){
    var d = new Date(year,month,0);
    return d.getDate();
}