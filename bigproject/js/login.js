(()=>{


	//检查local Storage 中是否有数据
	function checkUser(){
		var b_uname = localStorage["qingwenuname"];
		var b_upwd = localStorage["qingwenupwd"];
		if(b_uname){
			// for(let i =0;i<2;i++){
			// 	b_uname = uncompile(b_uname);
			// }
			// for(let i=0;i<2;i++){
             //    b_uname = Base64.decode(b_uname);
			// }
			b_uname = uncompile(b_uname);
			b_uname = Base64.decode(b_uname);
            console.log("b_uname" + b_uname);
            $("input:text").val(b_uname);
		}
		if(b_upwd){
            // for(let i =0;i<2;i++){
            //     b_upwd = uncompile(b_upwd);
            // }
            // for(let i=0;i<2;i++){
            //     b_upwd = Base64.decode(b_upwd);
            // }
            b_upwd = uncompile(b_upwd);
            b_upwd = Base64.decode(b_upwd);
            console.log("b_upwd" + b_upwd);
            $("input:password").val(b_upwd);
		}
	}
	checkUser();

	//自定义的加密函数
    function compile(code){
        var c=String.fromCharCode(code.charCodeAt(0)+code.length);
        for(var i=1;i<code.length;i++){c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));}
        return escape(c);
    }
    //自定义的解密函数
    function uncompile(code){
        code=unescape(code);
        var c=String.fromCharCode(code.charCodeAt(0)-code.length);
        for(var i=1;i<code.length;i++){ c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));}
        return c;
    }

    var txtName=$("input:text");
	var txtPwd=$("input:password");
	$("button:first-child").click(()=>{
    // console.log(txtName.val().trim(),txtPwd.val().trim());
		var uname = txtName.val().trim();
		var upwd = txtPwd.val().trim();
		$.ajax({
			type:"post",
			url:"../data/routes/users/login.php",
			data:{uname:uname,upwd:upwd},
			dataType:"text",
			success:function(text){
                if(text=="false")
                    alert("用户名或密码错误!");
                else{
                    //如果有search
                    if(location.search!==""){
                        location=decodeURIComponent(
                            location.search.slice(6)
                        );
                    }else{
                    	var b_uname = Base64.encode(uname);
                    	var b_upwd = Base64.encode(upwd);
                    	b_uname = compile(b_uname);
                    	b_upwd = compile(b_upwd);
                        // for(let i=0;i<2;i++){
                        //     b_uname = compile(b_uname);
                        //     b_upwd = compile(b_upwd);
                        // }
                        // for(let i=0;i<2;i++){
                        //     b_uname = Base64.encode(b_uname);
                        //     b_upwd = Base64.encode(b_upwd);
                        // }
                        // console.log(b_uname, b_upwd);
                        localStorage["qingwenuname"] =b_uname;
						localStorage["qingwenupwd"] = b_upwd;
                    	 location.href="index.html";
                    }
                }
			},
			error:function(){
				alert("网络错误");
			}
		})
		}
  );
})();