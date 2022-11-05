// 修改主页的最近时间显示
dom = document.getElementById("latest_post_p");
strArr = dom.innerHTML.split(':')
date = new Date(parseInt(dom.getAttribute('tag-time'))).getTime()
cur_date = new Date().getTime()
date_offset = cur_date - date
str = ":"
const DAY = 60 * 24* 1000 * 60
if(date_offset > DAY) {
    let days = parseInt(date_offset / DAY)
    str += days + ' 天前 '
}else{
    let mins = parseInt(date_offset / (1000 * 60))
    let hour = parseInt(mins / 60);
    let minute = mins % 60;
    if(hour != 0) {
        str += hour + ' 小时 ';
    }
    str += minute + ' 分钟前 '
}
strArr[0] += str
str = ''
for(i in strArr) {
    if(i == strArr.length - 1) {
        str+= ': ' + strArr[i]
        break
    }
    str += strArr[i]
}

dom.innerHTML = str
