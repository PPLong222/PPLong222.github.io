(function () {
  let chartDom = document.getElementById("post-rank-chart");
  let myChart_post_rank = echarts.init(chartDom);
  let option;
  let post_count_list = [];
  $.get(
    "https://114.115.150.92/custom_src/data/post-count-rank.json",
    function (_rawData) {
      post_count_list = _rawData;
      drawChart(_rawData);
    }
  );

  function drawChart(data) {
    option = {
      title: {
        text: "文章字数 Top10",
        left: "center",
        textStyle: {
          color: "#fff",
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
          label: {
            show: true,
          },
          shadowStyle: {
            color: "rgba(150,150,150,0.1)",
            shadowBlur: 10,
          },
        },
      },
      dataset: [
        {
          dimensions: ["title", "wordcount", "permalink"],
          source: data,
        },
        {
          transform: {
            type: "sort",
            config: { dimension: "wordcount", order: "desc" },
          },
        },
      ],
      xAxis: {
        type: "category",
        axisLabel: { interval: 0, rotate: 30 },
      },
      yAxis: {
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: "#494e59",
          },
        },
      },
      series: {
        type: "bar",
        encode: { x: "title", y: "wordcount" },
        datasetIndex: 1,
        colorBy: [],
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0,0,0,0.3)",
            },
          },
        },
      },
    };
    option && myChart_post_rank.setOption(option);
    myChart_post_rank.on("click", function (params) {
      window.location.href = post_count_list[params.dataIndex][2];
    });
  }
})();
