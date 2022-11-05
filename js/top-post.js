(function() {

    let appId = "9MuBWVsFJbGBbwW0dLf4PCir-MdYXbMMI"
    let appKey = "ufhGMao9OY41YN3la9fN7NI0";
    let chartDom = document.getElementById("top-blog-chart");
    let myChart = echarts.init(chartDom);
    let topTenAttr = { "time": [], "target": [], "title": [] };
    const MAX_TOP_NUM = 10;
    let option;

    // 查询存储的记录
    var a = 1;

    function getRecord(Counter, target) {
        return new Promise(function(resolve, reject) {
            Counter('get', '/classes/Counter')
                .then(resp => resp.json())
                .then(({ results, code, error }) => {
                    if (code === 401) {
                        throw error;
                    }
                    if (results && results.length > 0) {
                        results.sort(resort_arr);
                        onDataLoad(results);
                    } else {
                        Counter('post', '/classes/Counter', { target, time: 0 })
                            .then(resp => resp.json())
                            .then((record, error) => {
                                if (error) {
                                    throw error;
                                }
                                resolve(record);
                            }).catch(error => {
                                // eslint-disable-next-line no-console
                                console.error('Failed to create', error);
                                reject(error);
                            });
                    }
                }).catch((error) => {
                    // eslint-disable-next-line no-console
                    console.error('LeanCloud Counter Error:', error);
                    reject(error);
                });
        });
    }

    function addCounter(Counter) {
        var uvGetter = getRecord(Counter, 'site-uv').then((record) => {})
    };

    function resort_arr(a, b) {
        return b.time - a.time;
    }

    function fetchData(api_server) {
        var Counter = (method, url, data) => {
            return fetch(`${api_server}/1.1${url}`, {
                method,
                headers: {
                    'X-LC-Id': appId,
                    'X-LC-Key': appKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        };
        addCounter(Counter);
    }

    var apiServer = appId.slice(-9) !== '-MdYXbMMI' ? serverUrl : `https://${appId.slice(0, 8).toLowerCase()}.api.lncldglobal.com`;

    if (apiServer) {
        fetchData(apiServer);
    } else {
        fetch('https://app-router.leancloud.cn/2/route?appId=' + appId)
            .then(resp => resp.json())
            .then((data) => {
                if (data.api_server) {
                    fetchData('https://' + data.api_server);
                }
            });
    }


    function onDataLoad(res) {
        for (i = 0, j = 0; i < res.length && j < MAX_TOP_NUM; i++) {
            if (res[i].target.startsWith("/")) {
                topTenAttr['time'][j] = res[i].time;
                topTenAttr['target'][j] = res[i].target;
                matchStr = res[i].target.split("/");
                topTenAttr['title'][j] = matchStr[matchStr.length - 2];
                j++;
            }
        }
        option = {
            title: {
                text: '文章访问 Top10',
                left: 'center',
                textStyle: {
                    color: '#fff',
                },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: {
                        show: true
                    },
                    shadowStyle: {
                        color: 'rgba(150,150,150,0.1)',
                        shadowBlur: 10
                    }
                },
            },
            xAxis: {
                type: 'category',
                name: '文章标题',
                data: topTenAttr['title'],
                axisLabel: {
                    rotate: 20,
                },
            },
            yAxis: {
                type: 'value',
                name: '访问量',
                splitLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: '#494e59',
                    }
                },
            },
            series: [{
                data: topTenAttr['time'],
                type: 'bar',
                colorBy: [],
                barCategoryGap: "40%",
                itemStyle: {
                    borderRadius: [10, 10, 0, 0],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0,0,0,0.3)'
                        },
                    }
                }
            }]
        };
        option && myChart.setOption(option);
        myChart.on('click', function(params) {
            window.location.href = topTenAttr['target'][params.dataIndex];
        });
    }
}())