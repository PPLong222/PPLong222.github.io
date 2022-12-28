// 获取IP地址
$.ajax({
  type: "GET",
  url: "https://www.pplong.top:8080/net/getIp",
  dataType: "json",
  success: function (data) {
    //请求成功后回调函数
    console.log(data);
  },
  error: function (jqXHR) {
    //请求失败后回调函数
  },
});
console.log(window.location.href);
