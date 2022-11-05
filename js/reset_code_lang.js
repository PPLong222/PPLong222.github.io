// 延时为code_block加上language注释
var code_blocks = document.getElementsByClassName("code-wrapper")
// window.addEventListener('onload', function (i) {
//     console.log(code_blocks[1].children[0].getAttribute("data-language"));
//     for(i = 0; i < code_blocks.length; i++) {
//         block_code_lang = code_blocks[i].children[0].getAttribute("data-language");
//         code_blocks[i].children[0].children[1].innerHTML = block_code_lang;
//     }
// })
// 似乎更快的方式
$(document).ready(function(){
    for(i = 0; i < code_blocks.length; i++) {
        block_code_lang = code_blocks[i].children[0].getAttribute("data-language");
        code_blocks[i].children[0].children[1].innerHTML = block_code_lang;
        // 元素过多则先不予展示
        if(code_blocks[i].getElementsByTagName('code')[0].childElementCount < 50) {
            code_blocks[i].children[0].children[2].style.display="none";
            code_blocks[i].children[0].children[3].style.display="inline-block";
            code_blocks[i].getElementsByTagName('code')[0].style.display = "block";
        }
    }
    for(i = 0; i < code_blocks.length; i++) {
        const rel_code_block_idx = i;
        code_blocks[i].children[0].children[2].addEventListener('click',function(){
            code_blocks[rel_code_block_idx].children[0].children[0].style.display="block";
            code_blocks[rel_code_block_idx].children[0].children[2].style.display="none";
            code_blocks[rel_code_block_idx].children[0].children[3].style.display="inline-block";
 
        });
        code_blocks[i].children[0].children[3].addEventListener('click',function(){
            code_blocks[rel_code_block_idx].children[0].children[0].style.display="none";
            code_blocks[rel_code_block_idx].children[0].children[3].style.display="none";
            code_blocks[rel_code_block_idx].children[0].children[2].style.display="inline-block";
        });
    }
    
})
