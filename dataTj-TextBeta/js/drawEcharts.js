//实心饼图
function dvSolidPieChart() {
    var option = {
        title: {
            show: true,
            text: '➤  走读/住宿学生占比',
            textStyle: {
                color: "#1aa6ba",
                fontSize: 15
            },
            top: 11,
            left: "2%",
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}：{c}<br/>({d}%)'
        },
        legend: {
            orient: 'horizontal',
            bottom: '0px',
            itemGap: 23,
            padding: 15,
            itemWidth: 15,
            itemHeight: 15,
            textStyle: {
                color: '#8ba3be',
                fontSize: 13
            },
            data: []
        },
        color: ['#f9b725', '#0877db'],
        series: [
            {
                name: '走读/住宿学生占比',
                type: 'pie',
                radius: '58%',
                center: ['48%', '48%'],
                data: [],
                label: {show: false},
            }
        ]
    };
    return option;
}

//空心饼图
function dvHollowPieChart() {
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}：{c}<br/>({d}%)'
        },
        color: ["#ea6c46", "#fbb721", "#0e75d7", "#ee9824", "#55df60", "#5ddedd"],
        legend: {
            orient: 'vertical',
            left: '60',
            align: 'left',
            top: 'middle',
            textStyle: {
                color: '#8ba3be'
            },
            itemWidth: 15,
            itemHeight: 10,
        },
        series: {
            name: '学生缺席类别占比',
            type: 'pie',
            center: ['48%', '51%'],
            radius: ['68%', '85%'],
            avoidLabelOverlap: false,
            label: {
                show: false
            },
            data: []
        }
    };
    return option;
}

//百分比饼图
function dvPercentPieChart() {
    var option = {
        title: {
            text: '',
            x: 'center',
            y: 'center',
            textStyle: {
                fontWeight: 'normal',
                color: '#fff',
                fontSize: '15'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{d}%'
        },
        color: ['#00e18e', '#355672'],
        series: [{
            name: '今日学生出勤率',
            type: 'pie',
            radius: ['69%', '88%'],
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                }
            },
            hoverAnimation: false,
            data: []
        }]
    };
    return option;
}

var dataLine = [];
//遍历数据-折线图
function throughTheData_Line(datas) {
    dataLine = [];
    for (var it in datas) {
        var thisobj = datas[it];
        var obj = {
            name: thisobj.name,
            type: "line",
            smooth: 0.2,
            showAllSymbol: true,
            data: thisobj.value
        }
        dataLine.push(obj);
    }
    return dataLine;
}
//折线图
function dvLineChart() {
    var option = {
        title: {
            text: "师生传染病发展趋势",
            textStyle: {
                color: '#fff',
                fontSize: 15
            }
        },
        tooltip: {
            trigger: 'axis',
        },
        grid: {
            left: '3%',
            right: '3%',
            top: 40,
            left: 30,
            bottom: 34
        },
        color: ['#f8712b', '#00e18e', '#e6b532', '#029bf3', '#00e5e2', '#7d65d4'],
        legend: {
            icon: 'rect',
            itemWidth: 15,
            itemHeight: 15,
            itemGap: 13,
            top: 3,
            right: 0,
            textStyle: {
                color: "#8ba3be"
            },
            data: ["教职工", "学生"]
        },
        xAxis: {
            type: "category",
            boundaryGap: true,
            axisLine: {
                lineStyle: {
                    color: '#395575',
                    shadowBlur: 3,
                    shadowColor: '#fff'
                }
            },
            nameRotate: 45,
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                color: '#8ba3be'
            },
            data: ["4-7", "4-8", "4-9", "4-10", "4-13", "4-14", "4-15", "4-16", "4-17", "4-20", "4-21"]
        },
        yAxis: {
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#fff"
                }
            },
            axisLabel: {
                color: '#8ba3be'
            },
            axisTick: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: '#213c5a',
                    shadowBlur: 1,
                    shadowColor: '#fff'
                }
            },
            type: "value"
            // min:70,
            // max:190
        },
        series: dataLine
    };
    return option;
}

//面积图
function dvAreaChart() {
    var option = {
        tooltip: {
            trigger: 'axis',
        },
        grid: {
            left: '3%',
            right: '3%',
            top: '17%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#3a99aa'
                }
            },
            // axisLabel: {
            //     interval:0,
            //     rotate:90
            // },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#0e4765'
                }
            },
            data: ["4-7", "4-8", "4-9", "4-10", "4-13", "4-14", "4-15", "4-16", "4-17", "4-20", "4-21"]
        }],
        yAxis: [{
            type: 'value',
            name: '人数',
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#3a99aa'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    fontSize: 14
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#0e4765'
                }
            }
        }],
        series: {
            name: '联通',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 9,
            showSymbol: true,
            lineStyle: {
                normal: {
                    width: 1
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(219, 50, 51, 0.3)'
                    }, {
                        offset: 1,
                        color: 'rgba(219, 50, 51, 0.8)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(219,50,51)',
                    borderColor: 'rgba(219,50,51,0.2)',
                    borderWidth: 12
                }
            },
            data: []
        }
    };
    return option;
}

//双仪表盘
function dvDoubleGaugeChart() {
    var option = {
        series: [
            {
                name: '平均身高',
                type: 'gauge',
                data: [],
                radius: '70%',
                center: ['24%', '53%'],
                min: 70,
                max: 200,
                splitNumber: 4,

                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 8,
                        color: [
                            [1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                {
                                    offset: 0.1,
                                    color: "#0a85f3"
                                },
                                {
                                    offset: 1,
                                    color: "#dd1982"
                                }
                            ])
                            ]
                        ]
                    }
                },
                axisTick: {
                    show: false

                },
                splitLine: {
                    length: 18,
                    lineStyle: {
                        color: 'auto'
                    }
                },
                axisLabel: {
                    color: '#fff',
                },
                detail: {
                    formatter: '{value} cm',
                    fontSize: 24,
                    color: '#fff',
                    offsetCenter: [0, '65%']
                },
                title: {
                    fontSize: 19,
                    color: '#8ba3be',
                    offsetCenter: [0, '95%']
                },
                pointer: {
                    width: 3
                }
            }, {
                name: '平均体重',
                type: 'gauge',
                data: [],
                radius: '70%',
                center: ['76%', '53%'],
                min: 40,
                max: 220,
                splitNumber: 4,

                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 8,
                        color: [
                            [1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                {
                                    offset: 0.1,
                                    color: "#0a85f3"
                                },

                                {
                                    offset: 1,
                                    color: "#dd1982"
                                }
                            ])
                            ]
                        ]
                    }
                },

                axisTick: {
                    show: false
                },
                splitLine: {
                    length: 18,
                    lineStyle: {
                        color: 'auto'
                    }
                },
                axisLabel: {
                    color: '#fff',
                },
                detail: {
                    formatter: '{value} 斤',
                    fontSize: 24,
                    color: '#fff',
                    offsetCenter: [0, '65%']
                },
                title: {
                    fontSize: 19,
                    color: '#8ba3be',
                    offsetCenter: [0, '95%']
                },
                pointer: {
                    width: 3
                }
            }
        ]
    };
    return option;
}

//南丁格尔玫瑰图
function dvNightingaleRoseDiagramChart() {
    var option = {
        title: {
            text: '发育异常',
            textStyle: {
                color: '#fff'
            },
            x: 'center',
            y: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: ['#0179e5', '#35d15f', '#00c7fe', '#8a01e0', '#f3960d', '#5e55ff'],
        legend: {
            x: 'center',
            y: 'bottom',
            textStyle: {
                color: '#8ba3be',
                fontSize: 11
            },
            width: '332',
            align: 'left',
            itemWidth: 15,
            itemHeight: 15,
            data: []
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: [55, 118],
                center: ['48%', '48%'],
                roseType: 'radius',
                label: {
                    show: false
                },
                data: growthAbnormal
            }
        ]
    };
    return option;
}

var dataRadar = [];
var radarColors = ['#4A99FF', '#4BFFFC'];
//遍历数据-雷达图
function throughTheData_Radar(datas) {
    for (var it in datas) {
        var thisobj = datas[it];
        var thiscolor = radarColors[it];
        var obj = {
            value: thisobj.value,
            name: thisobj.name,
            itemStyle: {
                normal: {
                    lineStyle: {
                        color: thiscolor,
                    },
                    shadowColor: thiscolor,
                    shadowBlur: 10,
                },
            },
            areaStyle: {
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: thiscolor
                        }, {
                            offset: 0.5,
                            color: 'rgba(0,0,0,0)'
                        }, {
                            offset: 1,
                            color: thiscolor
                        }],
                        globalCoord: false
                    },
                    opacity: 1
                }
            }
        };
        dataRadar.push(obj);
    }
    return dataRadar;
}
//雷达图
function dvRadarChart() {
    var option = {
        color: radarColors,
        tooltip: {},
        legend: {
            orient: 'horizontal',
            data: [],
            bottom: 35,
            right: 40,
            itemWidth: 14,
            itemHeight: 14,
            itemGap: 21,
            textStyle: {
                fontSize: 14,
                color: '#8ba3be',
            }
        },
        radar: {
            name: {
                textStyle: {
                    color: '#fff',
                    fontSize: 16
                },
            },
            indicator: [{
                text: '耐力',
                max: 100,
            },
                {
                    text: '机能',
                    max: 100
                },
                {
                    text: '形态',
                    max: 100
                },
                {
                    text: '灵敏',
                    max: 100,
                },
                {
                    text: '柔韧',
                    max: 100
                },
                {
                    text: '力量',
                    max: 100
                }
            ],
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(255,255,255,0)', 'rgba(255,255,255,0)']
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#3a99aa',
                    shadowColor: '#ffff',
                    shadowBlur: 20
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#0e4765',
                    width: 1,
                    shadowColor: '#ffff',
                    shadowBlur: 20
                }
            },
        },
        series: [{
            type: 'radar',
            symbolSize: 8,
            data: dataRadar
        }]
    };
    return option;
}

var dataScatter = [];
//遍历数据-散点图
function throughTheData_Scatter(datas) {
    for (var it in datas) {
        var thisobj = datas[it];
        var obj = {
            name: thisobj.name,
            type: "scatter",
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            },
            data: thisobj.value
        }
        dataScatter.push(obj);
    }
    return dataScatter;
}
//散点图
function dvScatterChart() {
    var option = {
        color: ['#4A99FF', '#4BFFFC'],
        grid: {
            left: '0',
            right: '6%',
            bottom: '1%',
            top: '32',
            containLabel: true
        },

        legend: {
            data: ['女生', '男生'],
            left: 'right',
            textStyle: {
                color: '#8ba3be'
            }
        },
        xAxis: [
            {
                type: 'value',
                scale: true,
                axisLabel: {
                    formatter: '{value} cm',
                    textStyle: {
                        color: '#8ba3be'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#45607e',
                        shadowBlur: 3,
                        shadowColor: '#fff'
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: '#395575',
                        shadowBlur: 3,
                        shadowColor: '#fff'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                axisLabel: {
                    formatter: '{value} kg',
                    textStyle: {
                        color: '#8ba3be'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#213c5a',
                        shadowBlur: 3,
                        shadowColor: '#fff'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#395575',
                        shadowBlur: 3,
                        shadowColor: '#fff'
                    }
                }
            }
        ],
        series: dataScatter
    };
    return option;
}

//水球图
function dvWaterPoloChart(datas) {
    var standardReachingRate = datas;
    var option = {
        title: {
            text: (standardReachingRate * 100).toFixed(0) + '{a|%}',
            textStyle: {
                fontSize: 50,
                fontFamily: 'Microsoft Yahei',
                fontWeight: 'normal',
                color: '#fff',
                rich: {
                    a: {
                        fontSize: 28,
                    }
                }
            },
            x: 'center',
            y: '35%'
        },
        graphic: [{
            type: 'group',
            left: 'center',
            top: '56%',
            children: [{
                type: 'text',
                z: 100,
                left: '10',
                top: 'middle',
                style: {
                    fill: '#8ba3be',
                    text: '体质达标率',
                    fontSize: 25
                }
            }]
        }],
        series: [{
            type: 'liquidFill',
            radius: '84%',
            center: ['50%', '50%'],
            data: [standardReachingRate, standardReachingRate],
            backgroundStyle: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: '#0151a1'},
                        {offset: 1, color: '#0063c4'}
                    ]
                )
            },
            outline: {
                borderDistance: 4,
                itemStyle: {
                    borderWidth: 11,
                    borderColor: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#0363ca'},
                            {offset: 1, color: '#053463'}
                        ]
                    ),
                    shadowBlur: 0,
                }
            },
            color: ['#2e6ba8', '#2e6ba8'],
            label: {
                normal: {
                    formatter: '',
                }
            }
        }]
    };

    return option;

}

//饼图+折线图
function dvPieAndLineChart_pie() {
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}：{c}<br/>({d}%)'
        },
        color: ["#ea6c46", "#fbb721", "#0e75d7", "#ee9824", "#55df60", "#5ddedd"],
        series: [{
            name: '',
            type: 'pie',
            center: ['50%', '52%'],
            radius: "85%",
            avoidLabelOverlap: false,
            label: {
                show: false
            },
            data: []
        }
        ]
    };
    return option;
}
function dvPieAndLineChart_line(dom, domProp, options, datas) {
    $(dom).next().children().children("div:first-child").show();
    $(dom).next().children().children("div:first-child").nextAll().remove();
    for (var it in datas) {
        var str = "";
        var color = options.color[it];
        var obj = datas[it];
        var ids = domProp + it;
        str += "<div class='d-table-row'>" +
            "<div class='d-table-cell'><div class='rect' style='background-color:" + (color ? color : "red") + "'></div></div>" +
            "<div class='d-table-cell'>" + obj.name + "</div>" +
            "<div class='d-table-cell dth'>" + obj.value + "</div>" +
            "<div class='d-table-cell rowDtrend' style='width: 130px; height: 29px;' id='" + ids + "'></div>" +
            "</div>";

        $(dom).next().children().append(str);
        var optionLine = {
            grid: {
                top: '3',
                left: '4',
                right: '4',
                bottom: '4'
            },
            xAxis: {
                type: 'category',
                show: false,
                axisLabel: {
                    show: false
                }
            },
            yAxis: {
                show: false,
                type: 'value',
                max: 'dataMax',
                min: 'dataMin',
                axisLabel: {
                    show: false
                }
            },
            series: [{
                symbolSize: 6,
                data: obj.trend,
                type: 'line',
                smooth: 0.2,
                itemStyle: {
                    color: color,
                    shadowBlur: 1,
                    shadowColor: '#fff'
                },
                lineStyle: {
                    shadowBlur: 10,
                    shadowColor: '#fff'
                }
            }]
        };
        var domObj = document.getElementById(ids);
        var chartobj = echarts.init(domObj);
        chartobj.setOption(optionLine);

    }
    $(dom).next().children().children("div:first-child").hide();
}







