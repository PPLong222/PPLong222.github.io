var chartDom = document.getElementById('leetcode-type-chart');
var loading_div = document.getElementById('chart-block-img');
const issue_count = document.getElementsByTagName('h2').length;


var myChart = echarts.init(chartDom);
var option;

var algo_names=["DP","Greedy","Math","Foreach","Recursion","Binary","DFS"];
var tag_class=["code-tag-label-dp","code-tag-label-greedy","code-tag-label-math"
,"code-tag-label-foreach","code-tag-label-recursion",
"code-tag-label-binary","code-tag-label-dfs"];
var tag_map = [];

document.getElementById("issue-count").innerHTML=issue_count;

option = {
  title:{
    text:'题库解答类型',
    left: 'center',
    textStyle:{
      color:'#fff',
    },
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '8%',
    left: 'center',
    itemStyle:{
      borderWidth:1 
    },
    textStyle:{
      color: '#dddddd',
      fontWeight: 'normal',
      fontSize: 15,
      fontFamily: 'sans-serif',
    }
  },
  series: [
    {
      name: 'Algorithm Type',
      type: 'pie',
      radius: ['50%', '80%'],
      avoidLabelOverlap: false,
      top: 40,
      selectedMode: 'single',
      selectedOffset: 20,
      itemStyle: {
        borderRadius: 5,
        borderColor: '#fff',
        borderWidth: 1
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold',
          color: '#4792e6'
        }
      },
      labelLine: {
        show: false
      },
      data: tag_map
    }
  ]
};
// 不好的做法，有待改进
setTimeout(() => {
  loading_div.style.display="none";
  chartDom.style.display="block";
  option && myChart.setOption(option);
}, 4000);
$(document).ready(function() {
  for(let i = 0; i < algo_names.length; i++) {
    let map={};
    map["value"]=document.getElementsByClassName(tag_class[i]).length;
    map["name"]=algo_names[i];
    tag_map[i] = map;

  }
})

