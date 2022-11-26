// 获取IP地址
$.ajax({
	type: "GET",	
	url: "http://43.139.93.91:8080/getIp",
	dataType: "json",
	success: function(data) {
		//请求成功后回调函数
        console.log(data)
	},
	error: function(jqXHR){
		//请求失败后回调函数
	},
})