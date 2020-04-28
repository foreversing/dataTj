function makeLegendFromData(objArr, property) {
    var legend = [];
    for (var item in objArr) {
        legend.push(objArr[item][property]);
    }
    return legend;
}

var studentTypeRate = [
    {value: 5288, name: '走读学生', selected: true},
    {value: 2156, name: '住宿学生', selected: false},
];

var dvStudentTypeRate = {
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
        data: makeLegendFromData(studentTypeRate, "name")
    },
    color: ['#f9b725', '#0877db'],
    series: [
        {
            name: '走读/住宿学生占比',
            type: 'pie',
            radius: '58%',
            center: ['48%', '48%'],
            data: studentTypeRate,
            label: {show: false},
        }
    ]
};


var sickSituation = [
    {name: '学生隔离', totalNum: 16},
    {name: '教师隔离', totalNum: 5}
];

var todyStudentSickSituation = [
    {name: '隔离', totalNum: 4, compareCurrentMonthAgo: 0, max: 11, min: 9, average: 10},
    {name: '解除', totalNum: 1, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10}

];

var todyTeacherSickSituation = [
    {name: '隔离', totalNum: 1, compareCurrentMonthAgo: 0.33, max: 11, min: 9, average: 10},
    {name: '解除', totalNum: 1, compareCurrentMonthAgo: -0.33, max: 11, min: 9, average: 10}
];


function updateSickSituation() {
    $("#sickSituation").empty();
    var str = "";
    for (var it in sickSituation) {
        var obj = sickSituation[it];
        str += "<div class='col-md' style='min-width: 0'>" +
            "<div class='card-num'>" + obj.totalNum + "</div>" +
            "<div class='s-text'>" + obj.name + "</div>" +
            "</div>";
    }
    $("#sickSituation").append(str);
}


function updateTodayStudentSickSituation() {
    $("#todyStudentSickSituation").empty();
    var str = "";
    for (var it in todyStudentSickSituation) {
        var obj = todyStudentSickSituation[it];
        var updown = Math.abs(obj.compareCurrentMonthAgo) * 100 + "% ";
        if (obj.compareCurrentMonthAgo > 0) updown += "↑";
        else if (obj.compareCurrentMonthAgo < 0) updown += "↓";
        else updown += "-";
        //add by yy 统一修改位"-"
        updown = "-"
        str += "<div class='col-md' style='min-width: 0'>" +
            "<div class='card-num'>" + obj.totalNum + "</div>" +
            "<div class='s-text'>" + obj.name + "<small>" + updown + "</small></div>" +
            "</div>";
    }
    $("#todyStudentSickSituation").append(str);
}

function updateTodayTeacherSickSituation() {
    $("#todyTeacherSickSituation").empty();
    var str = "";
    for (var it in todyTeacherSickSituation) {
        var obj = todyTeacherSickSituation[it];
        var updown = Math.abs(obj.compareCurrentMonthAgo) * 100 + "% ";
        if (obj.compareCurrentMonthAgo > 0) updown += "↑";
        else if (obj.compareCurrentMonthAgo < 0) updown += "↓";
        else updown += "-";
        //add by yy 统一修改位"-"
        updown = "-"
        str += "<div class='col-md' style='min-width: 0'>" +
            "<div class='card-num'>" + obj.totalNum + "</div>" +
            "<div class='s-text'>" + obj.name + "<small>" + updown + "</small></div>" +
            "</div>";
    }
    $("#todyTeacherSickSituation").append(str);
}

function updateSick() {
    updateSickSituation();
    updateTodayStudentSickSituation();
    updateTodayTeacherSickSituation();
}


var studentTeacherDivideTrend = [
    {
        value: [110, 112, 121, 154, 134, 120, 114, 121, 154, 134, 120, 114],
        name: '教职工'
    }, {
        value: [130, 112, 114, 134, 124, 130, 110, 114, 134, 124, 130, 110],
        name: '学生'
    }
];

var dvStudentTeacherDivideTrend = {
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
    series: getStudentTeacherDivideTrend()
};

function getStudentTeacherDivideTrend() {
    var dataArr = [];
    for (var it in studentTeacherDivideTrend) {
        var thisobj = studentTeacherDivideTrend[it];
        var obj = {
            name: thisobj.name,
            type: "line",
            showAllSymbol: true,
            smooth: 0.2,
            data: thisobj.value
        }
        dataArr.push(obj);
    }
    return dataArr;
}

var todayAbsentStudent = [
    {name: '因病', value: 6, compareCurrentMonthAgo: 0, max: 11, min: 9, average: 10},
    {name: '因事', value: 2, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10},
    {name: '未返哈', value: 1, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10}
];

function updateTodayAbsentStudent() {
    $("#todayAbsentStudent").empty();
    var str = "";
    for (var it in todayAbsentStudent) {
        var obj = todayAbsentStudent[it];
        var updown = Math.abs(obj.compareCurrentMonthAgo) * 100 + "% ";
        if (obj.compareCurrentMonthAgo > 0) updown += "↑";
        else if (obj.compareCurrentMonthAgo < 0) updown += "↓";
        else updown += "-";
        //add by yy 统一修改位"-"
        updown = "-"
        str += "<div class='col-md' style='min-width: 0'>" +
            "<div class='card-num'>" + obj.value + "</div>" +
            "<div class='s-text'>" + obj.name + "<small>" + updown + "</small></div>" +
            "</div>";
    }
    $("#todayAbsentStudent").append(str);
}

var todayAbsentTeacher = [
    {name: '因病', value: 1, compareCurrentMonthAgo: 0, max: 11, min: 9, average: 10},
    {name: '因事', value: 2, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10},
    {name: '未返哈', value: 1, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10}

];

function updateTodayAbsentTeacher() {
    $("#todayAbsentTeacher").empty();
    var str = "";
    for (var it in todayAbsentTeacher) {
        var obj = todayAbsentTeacher[it];
        var updown = Math.abs(obj.compareCurrentMonthAgo) * 100 + "% ";
        if (obj.compareCurrentMonthAgo > 0) updown += "↑";
        else if (obj.compareCurrentMonthAgo < 0) updown += "↓";
        else updown += "-";
        //add by yy 统一修改位"-"
        updown = "-"
        str += "<div class='col-md' style='min-width: 0'>" +
            "<div class='card-num'>" + obj.value + "</div>" +
            "<div class='s-text'>" + obj.name + "<small>" + updown + "</small></div>" +
            "</div>";
    }
    $("#todayAbsentTeacher").append(str);
}

var todayAlreadyStudent = [
    {name: '待复学', totalNum: 28761, compareCurrentMonthAgo: 0, max: 11, min: 9, average: 10},
    {name: '实际出勤', totalNum: 7484, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10}

];


function updateTodayAlreadyStudent() {
    $("#todayAlreadyStudent").empty();
    var str = "";
    for (var it in todayAlreadyStudent) {
        var obj = todayAlreadyStudent[it];
        var updown = Math.abs(obj.compareCurrentMonthAgo) * 100 + "% ";
        if (obj.compareCurrentMonthAgo > 0) updown += "↑";
        else if (obj.compareCurrentMonthAgo < 0) updown += "↓";
        else updown += "-";
        //add by yy 统一修改位"-"
        updown = "-"
        str += "<div class='col-md' style='min-width: 0'>" +
            "<div class='card-num'>" + obj.totalNum + "</div>" +
            "<div class='s-text'>" + obj.name + "<small>" + updown + "</small></div>" +
            "</div>";
    }
    $("#todayAlreadyStudent").append(str);
}

var todayAlreadyTeacher = [
    {name: '教师应出', totalNum: 68, compareCurrentMonthAgo: 0, max: 11, min: 9, average: 10},
    {name: '教师实出', totalNum: 66, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10},
    {name: '工作人员出勤', totalNum: 33, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10}

];


function updateTodayAlreadyTeacher() {
    $("#todayAlreadyTeacher").empty();
    var str = "";
    for (var it in todayAlreadyTeacher) {
        var obj = todayAlreadyTeacher[it];
        var updown = Math.abs(obj.compareCurrentMonthAgo) * 100 + "% ";
        if (obj.compareCurrentMonthAgo > 0) updown += "↑";
        else if (obj.compareCurrentMonthAgo < 0) updown += "↓";
        else updown += "-";
        //add by yy 统一修改位"-"
        updown = "-"
        str += "<div class='col-md' style='min-width: 0'>" +
            "<div class='card-num'>" + obj.totalNum + "</div>" +
            "<div class='s-text'>" + obj.name + "<small>" + updown + "</small></div>" +
            "</div>";
    }
    $("#todayAlreadyTeacher").append(str);
}


var studentAlreadyRate = 0.99;

var dvStudentAlreadyRate = {
    title: {
        text: studentAlreadyRate * 100 + '%',
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
        data: [{
            value: studentAlreadyRate

        }, {
            value: 1 - studentAlreadyRate
        }]
    }]
}


var teacherAlreadyRate = 0.97;

var dvTeacherAlreadyRate = {
    title: {
        text: teacherAlreadyRate * 100 + '%',
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
    color: ['#f8712b', '#355672'],
    series: [{
        name: '今日教职工出勤率',
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
        data: [{
            value: teacherAlreadyRate

        }, {
            value: 1 - teacherAlreadyRate
        }]
    }]
}


var dvTodayStudentAbsentTypeRate = {
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
        data: todayAbsentStudent
    }

};


var dvTodayTeacherAbsentTypeRate = {
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
        name: '教职工缺席类别占比',
        type: 'pie',
        center: ['48%', '51%'],
        radius: ['68%', '85%'],
        avoidLabelOverlap: false,
        label: {
            show: false
        },
        data: todayAbsentTeacher
    }

};


var studentTeacherAlreadyTrend = [
    {
        value: [0.98, 0.97, 0.98, 0.96, 0.94, 0.98, 0.96, 0.99, 0.95, 0.93, 0.99, 0.98],
        name: '教职工'
    }, {
        value: [0.98, 0.99, 0.98, 0.98, 0.99, 0.96, 0.98, 0.88, 0.96, 0.99, 0.88, 0.97],
        name: '学生'
    }
];

var dvStudentTeacherAlreadyTrend = {
    tooltip: {
        trigger: 'axis',
    },
    grid: {
        left: '3%',
        right: '3%',
        top: 40,
        left: 40,
        bottom: 30
    },
    color: ['#f8712b', '#00e18e', '#e6b532', '#029bf3', '#00e5e2', '#7d65d4'],
    legend: {
        icon: 'rect',
        itemWidth: 15,
        itemHeight: 15,
        itemGap: 13,
        top: 10,
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
        // min:0.8,
        // max:1
    },
    series: (function () {
        var dataArr = [];
        for (var it in studentTeacherAlreadyTrend) {
            var thisobj = studentTeacherAlreadyTrend[it];
            var obj = {
                name: thisobj.name,
                type: "line",
                showAllSymbol: true,
                smooth: 0.2,
                data: thisobj.value
            }
            dataArr.push(obj);
        }
        return dataArr;
    })()
};


var studentAbsentBySick = [14, 9, 12, 14, 11, 9, 6, 8, 7, 6, 5, 4];

var dvStudentAbsentBySick = {
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
        name: '单位（人数）',
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
        data: studentAbsentBySick
    }
};


var historyAbnormalTemperature = [
    {name: '学生', value: 154, compareCurrentMonthAgo: 0, max: 11, min: 9, average: 10},
    {name: '教师', value: 38, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10}

];

function updateHistoryAbnormalTemperature() {
    makeSimpleNumberCard(historyAbnormalTemperature, "historyAbnormalTemperature");
}


var todayTemperatureWatch = [
    {name: '学生正常', value: 7474, compareCurrentMonthAgo: 0, max: 11, min: 9, average: 10},
    {name: '学生异常', value: 10, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10},
    {name: '教职工正常', value: 66, compareCurrentMonthAgo: 0, max: 11, min: 9, average: 10},
    {name: '教职工异常', value: 2, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10}

];

function updateTodayTemperatureWatch() {

    makeComplexNumberCard(todayTemperatureWatch, "todayTemperatureWatch");
}


var studentTeacherAbnormalTemperatureTrend = [
    {
        value: [28, 33, 36, 35, 38, 37, 34, 36, 34, 32, 29, 29],
        name: '教职工'
    }, {
        value: [130, 112, 114, 154, 124, 130, 110, 114, 134, 124, 130, 110],
        name: '学生'
    }
];

var dvStudentTeacherAbnormalTemperatureTrend = {
    tooltip: {
        trigger: 'axis',
    },
    grid: {
        right: 10,
        top: 40,
        left: 40,
        bottom: 20
    },
    color: ['#f8712b', '#00e18e', '#e6b532', '#029bf3', '#00e5e2', '#7d65d4'],
    legend: {
        icon: 'rect',
        itemWidth: 15,
        itemHeight: 15,
        itemGap: 13,
        top: 10,
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

    },
    series: (function () {
        var dataArr = [];
        for (var it in studentTeacherAbnormalTemperatureTrend) {
            var thisobj = studentTeacherAbnormalTemperatureTrend[it];
            var obj = {
                name: thisobj.name,
                type: "line",
                showAllSymbol: true,
                smooth: 0.2,
                data: thisobj.value
            }
            dataArr.push(obj);
        }
        return dataArr;
    })()
};


var recoveryStudentTeacher = [
    {name: '待复学学生', value: 28761, compareCurrentMonthAgo: 0, max: 11, min: 9, average: 10},
    {name: '待复工教职工', value: 476, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10}
];

function updateRecoveryStudentTeacher() {
    makeSimpleNumberCard(recoveryStudentTeacher, "recoveryStudentTeacher");
}


var increaseDivideRecoveryTrend = [
    {
        value: [2, 3, 1, 1, 2, 2, 1, 3, 4, 2, 1, 2],
        name: '新增隔离教职工'
    }, {
        value: [5, 6, 4, 4, 5, 7, 6, 3, 5, 4, 2, 3],
        name: '新增隔离学生'
    }, {
        value: [110, 112, 121, 154, 198, 170, 124, 165, 175, 182, 192, 222],
        name: '新增复学学生'
    }, {
        value: [20, 30, 25, 38, 45, 56, 20, 35, 36, 27, 35, 65],
        name: '新增复工教职工'
    }
];

var dvIncreaseDivideRecoveryTrend = {
    title: {
        show: true,
        text: '新增隔离与新增复工复学趋势对比',
        textStyle: {
            color: "#fff",
            fontSize: 15
        },
        top: 11,
        left: "2%",
    },
    tooltip: {
        trigger: 'axis',
    },
    grid: {
        right: 10,
        top: 63,
        left: 40,
        bottom: 18
    },
    color: ['#e6b532', '#029bf3', '#00e5e2', '#7d65d4'],
    legend: {
        icon: 'rect',
        itemWidth: 15,
        itemHeight: 15,
        itemGap: 13,
        top: 34,
        right: 5,
        textStyle: {
            color: "#8ba3be"
        },
        data: ["新增隔离学生", "新增隔离教职工", "新增复学学生", "新增复工教职工"]
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

    },
    series: (function () {
        var dataArr = [];
        for (var it in increaseDivideRecoveryTrend) {
            var thisobj = increaseDivideRecoveryTrend[it];
            var obj = {
                name: thisobj.name,
                type: "line",
                showAllSymbol: false,
                smooth: 0.2,
                data: thisobj.value
            }
            dataArr.push(obj);
        }
        return dataArr;
    })()
};


var studentLunch = [
    {value: 3658, name: "自带午饭", trend: [3648, 3636, 3640, 3648, 3636, 3640]},
    {value: 3713, name: "订餐", trend: [3723, 3735, 3731, 3723, 3735, 3731]},

];

var dvStudentLunch = {
    title: {
        text: '非在校就餐 113 人',
        textStyle: {
            color: '#fff',
            fontSize: 14,
            lineHeight: 21
        },

        bottom: -8,
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b}：{c}<br/>({d}%)'
    },
    color: ["#ea6c46", "#fbb721", "#0e75d7", "#ee9824", "#55df60", "#5ddedd"],
    series: [{
        name: '学生就餐类别统计',
        type: 'pie',
        center: ['50%', '48%'],
        radius: "70%",
        avoidLabelOverlap: false,
        label: {
            show: false
        },
        data: studentLunch
    }
    ]
};


function makeStudentLunchLegend() {

    for (var it in studentLunch) {
        var str = "";
        var color = dvStudentLunch.color[it];
        var obj = studentLunch[it];
        var arrow = "";
        var ids = "lunchTrend" + it;
        var dvs = "dvLunchTrend" + it;

        str += "<div class='d-table-row'>" +
            "<div class='d-table-cell'><div class='rect' style='background-color:" + (color ? color : "red") + "'></div></div>" +
            "<div class='d-table-cell'>" + obj.name + "</div>" +
            "<div class='d-table-cell dth'>" + obj.value + "</div>" +
            "<div class='d-table-cell rowDtrend' id='" + ids + "'></div>" +
            "</div>";
        $("#studentLunch").append(str);

        if (!dvMap[dvs]) {
            var options = {
                grid: {
                    top: '3',
                    left: '-8',
                    right: '-8',
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
            chartobj.setOption(options);
            dvMap[dvs] = {domObj: domObj, jsonOption: options};
        }

    }
    $("#nok_nothing").remove();
}


var studentTransportType = [
    {value: 2568, name: "私家车", trend: [33, 44, 35, 35, 35, 37]},
    {value: 1662, name: "步行", trend: [44, 32, 43, 21, 3, 21]},
    {value: 3254, name: "公交出行", trend: [44, 32, 43, 21, 3, 21]}

];

var dvStudentTransportType = {
    tooltip: {
        trigger: 'item',
        formatter: '{b}：{c}<br/>({d}%)'
    },
    color: ["#ea6c46", "#fbb721", "#0e75d7", "#ee9824", "#55df60", "#5ddedd"],
    series: [{
        name: '学生就餐类别统计',
        type: 'pie',
        center: ['50%', '52%'],
        radius: "85%",
        avoidLabelOverlap: false,
        label: {
            show: false
        },
        data: studentTransportType
    }
    ]
};


function makeStudentTransportTypeLegend() {

    for (var it in studentTransportType) {
        var str = "";
        var color = dvStudentTransportType.color[it];
        var obj = studentTransportType[it];
        var arrow = "";
        var ids = "studentTransportTypeTrend" + it;
        var dvs = "dvStudentTransportTypeTrend" + it;

        str += "<div class='d-table-row'>" +
            "<div class='d-table-cell'><div class='rect' style='background-color:" + (color ? color : "red") + "'></div></div>" +
            "<div class='d-table-cell'>" + obj.name + "</div>" +
            "<div class='d-table-cell dth'>" + obj.value + "</div>" +
            "<div class='d-table-cell rowDtrend' id='" + ids + "'></div>" +
            "</div>";
        $("#studentTransportType").append(str);

        if (!dvMap[dvs]) {
            var options = {
                grid: {
                    top: '3',
                    left: '-8',
                    right: '-8',
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
            chartobj.setOption(options);
            dvMap[dvs] = {domObj: domObj, jsonOption: options};
        }

    }
    $("#nok_nothing1").remove();
}


var teacherTransportType = [
    {value: 24, name: "私家车", trend: [33, 44, 35, 35, 35, 37]},
    {value: 9, name: "步行", trend: [44, 32, 43, 21, 3, 21]},
    {value: 35, name: "公交出行", trend: [44, 32, 43, 21, 3, 21]}

];

var dvTeacherTransportType = {
    tooltip: {
        trigger: 'item',
        formatter: '{b}：{c}<br/>({d}%)'
    },
    color: ["#ea6c46", "#fbb721", "#0e75d7", "#ee9824", "#55df60", "#5ddedd"],
    series: [{
        name: '学生就餐类别统计',
        type: 'pie',
        center: ['50%', '52%'],
        radius: "85%",
        avoidLabelOverlap: false,
        label: {
            show: false
        },
        data: teacherTransportType
    }
    ]
};


function makeTeacherTransportTypeLegend() {

    for (var it in teacherTransportType) {
        var str = "";
        var color = dvTeacherTransportType.color[it];
        var obj = teacherTransportType[it];
        var arrow = "";
        var ids = "teacherTransportTypeTrend" + it;
        var dvs = "dvTeacherTransportTypeTrend" + it;

        str += "<div class='d-table-row'>" +
            "<div class='d-table-cell'><div class='rect' style='background-color:" + (color ? color : "red") + "'></div></div>" +
            "<div class='d-table-cell'>" + obj.name + "</div>" +
            "<div class='d-table-cell dth'>" + obj.value + "</div>" +
            "<div class='d-table-cell rowDtrend' id='" + ids + "'></div>" +
            "</div>";
        $("#teacherTransportType").append(str);

        if (!dvMap[dvs]) {
            var options = {
                grid: {
                    top: '3',
                    left: '-8',
                    right: '-8',
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
            chartobj.setOption(options);
            dvMap[dvs] = {domObj: domObj, jsonOption: options};
        }

    }
    $("#nok_nothing2").remove();
}


var dataUploadedRate = 0.65;

var dvDataUploadedRate = {
    tooltip: {
        trigger: 'item',
        formatter: '{d}%'
    },
    title: {
        text: dataUploadedRate * 100 + '%',
        x: 'center',
        y: 'center',
        textStyle: {
            fontWeight: 'normal',
            color: '#fff',
            fontSize: '15'
        }
    },
    color: ['#32c18e', '#355672'],
    series: [{
        name: '今日数据上报率',
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
        data: [{
            value: dataUploadedRate

        }, {
            value: 1 - dataUploadedRate
        }]
    }]
}


var dataUploadedComprehensive = [
    {name: '尚未上报学校', value: 3},
    {name: '已上报学校', value: 46},
    {name: '完成上报学校', value: 36}


];

function updateDataUploadedComprehensive() {
    makeSimpleNumberCard(dataUploadedComprehensive, "dataUploadedComprehensive");
}


var timePoints = [
    {date: "04/7", title: "共上报防疫数据196条,测温数据29936条", content: "学生病假2例，事假2例，体温异常10例(返哈隔离1人，隔离1人)，最高温度38.1"},
    {date: "04/8", title: "共上报防疫数据398条,测温数据37406条", content: "学生病假2例，事假2例，体温异常10例(返哈隔离1人，隔离1人)，最高温度37.6"},
    {date: "04/9", title: "共上报防疫数据586条,测温数据44879条", content: "学生病假2例，事假2例，体温异常10例(返哈隔离1人，隔离1人)，最高温度37.8"},
    {date: "04/10", title: "共上报防疫数据989条,测温数据52360条", content: "学生病假2例，事假2例，体温异常10例(返哈隔离1人，隔离1人)，最高温度37.9"}
];

function makeTimeLine() {
    var dateStr = "";
    var issueStr = "";
    var i = 0;
    for (var it in timePoints) {
        var obj = timePoints[it];
        dateStr += "<li><a href='#tltl-" + i + "'>" + obj.date + "</a></li>";
        issueStr += "<li id='tltl-" + i + "'><h1>" + obj.title + "</h1><p>" + obj.content + "</p></li>";
        i++;
    }
    $("#dates").html(dateStr);
    $("#issues").html(issueStr);

    $().timelinr({
        autoPlay: 'true',
        autoPlayDirection: 'forward',
        startAt: 1,
        autoPlayPause: 10000
    })

}