#!/usr/bin/env node
// 防君子不防小人
// 在/etc/hosts配置了 dns映射， 后期ip更新后可能有错误
const appId= "9MuBWVsFJbGBbwW0dLf4PCir-MdYXbMMI"
const appKey = "ufhGMao9OY41YN3la9fN7NI0";
const pattern = /site-pv|site-uv/;
const targetFile = "./source/custom_src/data/pvuv.json";
const AV = require('leancloud-storage');
const date=new Date();
const  fs = require("fs"); 

console.log("-----------Start Pull UV PV---------------");
AV.init({
    appId: "9MuBWVsFJbGBbwW0dLf4PCir-MdYXbMMI",
    appKey: "ufhGMao9OY41YN3la9fN7NI0",
  });

const query = new AV.Query('Counter');

query.matches('target', pattern);
query.find().then((counter) => {
    const uv_num = counter[0].attributes.time;
    const pv_num = counter[1].attributes.time;
   // writeToFile(uv_num,pv_num);
    readInFs(uv_num,pv_num);
  });

function readInFs(uv_num,pv_num) {
    fs.readFile(targetFile, 'utf8',function(err, data) {
        dateStr = date.Format("yyyy/MM/dd");
        var obj = JSON.parse(data);
        let writeLine = obj.length;
        if(obj[obj.length - 1][0].includes(dateStr)) {
            writeLine--;
            console.log("Same Day Pull,Just Update UV and PV");
        }else{
            obj.push([]);
            console.log("New Day Pull,Add UV and PV");
        }
        obj[writeLine][0] = dateStr;
        obj[writeLine][1] = uv_num;
        obj[writeLine][2] = pv_num;
        const writeStr = JSON.stringify(obj);
        fs.writeFile(targetFile,writeStr,function(err){});
    });
}
// 更麻烦的方式，通过js外调shell完成
function writeToFile(uv_num,pv_num) {
    
    dateStr = date.Format("yyyy/MM/dd");
    const tarStr="["+dateStr+"\t" + uv_num + "\t" + pv_num+"]";
    const spawn = require('child_process').spawn;
    free2 = require('child_process').exec;

    free = require('child_process').exec; 

    free2('cat '+targetFile + '| wc -l ',function(err,out,code) {
        console.log(Number(out));
        const curLine = Number(out);
        free('sed -n "'+curLine + 'p" ' + targetFile,function(err,out,code) {
            const lastStr = out.replace(/[\r\n]/g, "") + ',';
            if(lastStr.includes(dateStr)){
                addStr = lastStr+',\n'+tarStr;
                free('sed -i "'+curLine + 'd" ' + targetFile,function(err,out,code) {
                    free('sed -i "'+curLine+'i '+lastStr+'" '+ targetFile,function(err,out,code) {
                        console.log(err);
                    });
                });
            }else{

            }

        });
    }); 
    // 捕获标准输出并将其打印到控制台 
    //free.stdout.on('data', function (data) { 
        
        // const dataStr=data.toString();
        // if(dataStr.startsWith(dateStr)) {
        //     console.log("delete");
        //     free = spawn('sed', ['-i','$d',targetFile]); 
        // }
        // // 另一种获取shell执行的方式，前一种似乎不能执行
        // free2('echo ' + tarStr +' >> '+targetFile); 
        // console.log("-----------Successfully write to file-----------");
 //   }); 
 
}


Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
