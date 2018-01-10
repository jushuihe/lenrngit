//这是一个products的页面 
/*
  主要作用是可以对小说的不同类型进行分类查询，分页查询
*/

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

/*
	在分类搜索页面要实现的效果，通过页面中的变量来查找后端的数据
	可能影响后端数据的变量包括
	1、根据input标签里面的value值  $kw
	2、nav标签里面的type属性值  被选中的标签用一个class表示 选取它的data属性
			---因为涉及到两个不同的数据库的表，所以在服务器页面要采用 外联模式查找
	3、上一页，下一页的按钮传值  pno
*/


function loadProducts({storyStyle,pno,$kw}){
	// console.log(pno);
	//将kw的默认值设置为当前选中的标签
	var storyStyle = storyStyle || "all";
	var pno = pno || 0;
	//这里取的关键词是从search 文本框中提取的信息
	var aa = decodeURI(location.search.split("=")[1]);

	var $kw;
    if(aa=="undefined")  $kw = " ";
	else $kw = aa;
	// var $kw =  decodeURI(location.search.split("=")[1]) || " ";


    $.ajax({
		type:"get",
		url:"../data/routes/products/getProductsByKw.php",
		data:{kw:$kw,pno:pno,storyStyle:storyStyle,pageSize:9}
		//将三个数字全部传向后端
	}).then(output=>{
		//  console.log(output);
		var data=output.data;
		if(data!=""){
		var html="";
		for(var p of data){
			html+=`
				<div class="story">
            <div class="lf">
							<a href="product_details.html?id=${p.story_id}">
              	<img src="${p.md}" alt="">
							</a>
            </div>
            <div class="rf">
              <p>标题：${p.story_name}</p>
              <p>作者：${p.story_autor}</p>
              <p>故事简介:${p.story_introduction}</p>
              <p>收藏数:${p.collectorCount}</p>
              <p>阅读数：${p.story_readcount}</p>
            </div>
          </div>
			`
		}
		$(".content").html(html);

		var pageCount=output.pageCount,
			  pageNo=output.pageNo;
		var html=`<a href="javascript:;" class="previous">上一页</a>`;
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
				 html+=`<a href="javascript:;">${i}</a>`;
				 b++;
				}
				
			}
		// }
		html+=`<a href="javascript:;" class="next">下一页</a>`;
		var $divPages=$("#page");
		$divPages.html(html);
		// $divPages.children(":eq("+(pageNo+1)+")").addClass("current");
		// 给内容中包含 页码数的a标签增加选中样式
		$divPages.children(":contains('"+(pageNo+1)+"')").first().addClass("current");
		checkAStatus($divPages,pageCount,pageNo);}
	})
}


(function($){
	loadProducts({});
	var $divPages=$("#page");
	$divPages.click(e=>{//为divPages绑定单击事件
		var $tar=$(e.target);
			if($tar.is("a,:not(.not)")){//如果目标元素是a
				//如果a不是divPages的第一个子元素和最后一个子元素
				if(!$tar.is(":first-child,:last-child")){
					//如果当前a的class不是current
					if(!$tar.is(".current")){
						//获得当前a的内容-1，保存在pno中
						var pno=$tar.html()-1;
						//调用loadProducts(pno)重新加载第pno页
						//向后台发送的数据没有错误
						console.log(pno+"向后台发送的页码数");
						var $style = $(".selector").data("toggle");
						console.log($style);
						loadProducts({pno:pno,storyStyle:$style});
					}
				}else{
					//如果class不以disabled结尾
					if(!$tar.is(".disabled")){
						//在divPages下查找class为current的a
						var $curr=
							$divPages.children(".current");
						//如果class以next开头
						if($tar.is(".next")){
							//重新加载商品列表传入current的内容作为pno
							var $style = $(".selector").data("toggle");
							loadProducts({pno:$curr.html(),storyStyle:$style});
						}else{
							var $style = $(".selector").data("toggle");
							loadProducts({pno:($curr.html()-2),storyStyle:$style});
						}
					}
				}
			}
		})		


//为导航栏里面的li设置点击事件
	$(".fenlei").on("click","[data-toggle]",function(e){
		console.log("a");
		var $tar = $(e.target);
		//console.log($tar.attr("data-toggle"));
		var $style = $tar.attr("data-toggle");
		console.log($style);		
		
		//点击的是后为当前点击的li打个桩
		$("li").removeClass("selector");
		$tar.addClass("selector");

		//我这里的关键字$kw 是从当前页面的搜索框里面的val值来获取，如果后面要改 先从这里改
		// $kw = $(".header_search>input").val();
		// console.log($kw);
		loadProducts({storyStyle:$style})
	})
})(jQuery);