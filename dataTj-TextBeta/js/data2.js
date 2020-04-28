const host = "192.168.0.155";
const port = 9090;
const path = "epidemic/sid=";
const sid = "10000";
const wsUrl = "ws://" + host + ":" + port + "/" + path + sid;
var websocket = null;
$(function () {
    statistictemp();
    statisticstulunchmethod();
    statisticrecoveronstudy();
    statistictripmode();
    statisticschool();

    // 建立websocket连接
    connectWebSocket();

    // 定时刷新
    setInterval(function () {
        statistictemp();
        statisticstulunchmethod();
        statisticrecoveronstudy();
        statistictripmode();
        statisticschool();
    }, 10000);
});

/**
 * 建立websocket连接
 */
function connectWebSocket() {
    console.log("=====WebSocket开始建立连接=====");
    websocket = new WebSocket(wsUrl);
    websocket.onopen = function () {
        console.log("=====WebSocket Onpen=====");
    };
    websocket.onclose = function () {
        console.log("=====WebSocket Onclose=====");
        if (websocket != null) {
            websocket.close();
        }
        setInterval(function () {
            connectWebSocket();
        }, 100000);// 一分钟重连一次
    };
    websocket.onmessage = function (msg) {
        console.log("=====WebSocket Onmessage=====");
        console.log(msg.data);
        const jsonObj = eval("(" + msg.data + ")");
        if (jsonObj != null && jsonObj != undefined) {
            let schoolName = jsonObj.schoolName;
            let className = jsonObj.className;
            let name = jsonObj.name;
            let temperature = jsonObj.temperature;
            let status = jsonObj.status;
            let time = jsonObj.time;
            if (status == "体温正常") {
                scrollAfterAppend(makeListItem(schoolName, className, name, temperature, time, status, "list-green-flag"));
            } else {
                scrollAfterAppend(makeListItem(schoolName, className, name, temperature, time, status, "list-flag"));
            }
        }
    }
}


/**
 * 学校复学情况
 */
function statisticschool() {

    $.ajax({
        url: reqUrl + "schoolstatisticcontroller/statisticschool",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: {},
        dataType: "json",
        success: function (data) {


            for (let i = 0; i < data.data.length; i++) {
                let type = data.data[i].type;
                let count = data.data[i].count;
                if (1 == type) {
                    // 小学
                    $("#primary_school").empty();
                    $("#primary_school").html(count + "<small>所</small>");
                    if (count > 0) {
                        $("#primary_school_list").empty();
                        for (let j = 0; j < count; j++) {
                            let schoolHtml = '<div class="col-4 gText">' + data.data[i].schoolList[j].name + '</div>';
                            $("#primary_school_list").append(schoolHtml);
                        }
                    }
                }

                if (2 == type) {
                    // 初中
                    $("#junior_school").empty();
                    $("#junior_school").html(count + "<small>所</small>");
                    if (count > 0) {
                        $("#junior_school_list").empty();
                        for (let j = 0; j < count; j++) {
                            let schoolHtml = '<div class="col-4 gText">' + data.data[i].schoolList[j].name + '</div>';
                            $("#junior_school_list").append(schoolHtml);
                        }
                    }
                }

                if (3 == type) {
                    // 高中
                    $("#senior_school").empty();
                    $("#senior_school").html(count + "<small>所</small>");
                    if (count > 0) {
                        $("#senior_school_list").empty();
                        for (let j = 0; j < count; j++) {
                            let schoolHtml = '<div class="col-4 gText">' + data.data[i].schoolList[j].name + '</div>';
                            $("#senior_school_list").append(schoolHtml);
                        }
                    }
                }

                // // TODO : 大学类型？？
                // if (1 == type) {
                //     // 大学
                //     $("#primary_school").empty();
                //     $("#primary_school").html(count + "<small>所</small>");
                //     if (count > 0) {
                //         $("#primary_school_list").empty();
                //         for (let j = 0; j < count; j++) {
                //             let schoolHtml = '<div class="col-4 gText">' + data.data[i].schoolList[j].name + '</div>';
                //             $("#primary_school_list").append(schoolHtml);
                //         }
                //     }
                // }
            }

        },
        error: function (e) {
        }
    });

}


/**
 * 复学情况
 */
function statisticrecoveronstudy() {

    $.ajax({
        url: reqUrl + "recoveronstudycontroller/statisticrecoveronstudy",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: {},
        dataType: "json",
        success: function (data) {
            recoveryStudentTeacher[0].value = data.data.notRecoverStus;// 待复学学生
            recoveryStudentTeacher[1].value = data.data.notRecoverTeas;// 待复工教职工
            updateRecoveryStudentTeacher();

            // 新增隔离教职工
            increaseDivideRecoveryTrend[0].value = data.data.isolateAndRecover.isolateTea;
            dvIncreaseDivideRecoveryTrend.series[0].data = increaseDivideRecoveryTrend[0].value;

            // 新增隔离学生
            increaseDivideRecoveryTrend[1].value = data.data.isolateAndRecover.isolateStu;
            dvIncreaseDivideRecoveryTrend.series[1].data = increaseDivideRecoveryTrend[1].value;

            // 新增复学学生
            increaseDivideRecoveryTrend[2].value = data.data.isolateAndRecover.recoverStu;
            dvIncreaseDivideRecoveryTrend.series[2].data = increaseDivideRecoveryTrend[2].value;

            // 新增复工教职工
            increaseDivideRecoveryTrend[3].value = data.data.isolateAndRecover.recoverTea;
            dvIncreaseDivideRecoveryTrend.series[3].data = increaseDivideRecoveryTrend[3].value;

            // 日期
            dvIncreaseDivideRecoveryTrend.xAxis.data = data.data.isolateAndRecover.time;

            // 最大值 最小值
            //dvIncreaseDivideRecoveryTrend.yAxis.max = data.data.isolateAndRecover.max;
            //dvIncreaseDivideRecoveryTrend.yAxis.min = data.data.isolateAndRecover.min;

        },
        error: function (e) {
        }
    });

}


/**
 * 学生，教职工出行情况
 */
function statistictripmode() {

    $.ajax({
        url: reqUrl + "tripmodecontroller/statistictripmode",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: {},
        dataType: "json",
        success: function (data) {
            // ======== 学生出行情况 ============
            // 私家车
            studentTransportType[0].value = data.data.stutripMethod.byCarStuCount;
            studentTransportType[0].trend = data.data.stuTripTrend.byCarStuCount;

            // 步行
            studentTransportType[1].value = data.data.stutripMethod.walkStuCount;
            studentTransportType[1].trend = data.data.stuTripTrend.walkStuCount;

            // 公交出行
            studentTransportType[2].value = data.data.stutripMethod.byBusStuCount;
            studentTransportType[2].trend = data.data.stuTripTrend.byBusStuCount;


            // ======== 教职工出行情况 ============
            // 私家车
            teacherTransportType[0].value = data.data.teatripMethod.byCarTeaCount;
            teacherTransportType[0].trend = data.data.teaTripTread.byCarTeaCount;

            // 步行
            teacherTransportType[1].value = data.data.teatripMethod.walkTeaCount;
            teacherTransportType[1].trend = data.data.teaTripTread.walkTeaCount;

            // 公交出行
            teacherTransportType[2].value = data.data.teatripMethod.byBusTeaCount;
            teacherTransportType[2].trend = data.data.teaTripTread.byBusTeaCount;
        },
        error: function (e) {
        }
    });

}


/**
 * 学生就餐情况
 */
function statisticstulunchmethod() {

    $.ajax({
        url: reqUrl + "stulunchmethodcontroller/statisticstulunchmethod",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: {},
        dataType: "json",
        success: function (data) {
            studentLunch[0].value = data.data.lunchMethod.bringCount;// 自带午餐
            studentLunch[0].trend = data.data.orderTrend.bringCount;// 自带午餐趋势
            studentLunch[1].value = data.data.lunchMethod.orderCount;// 订餐
            studentLunch[1].trend = data.data.orderTrend.orderCount;// 订餐趋势

            dvStudentLunch.title.text = "非在校就餐 " + data.data.lunchMethod.otherCount + " 人";

        },
        error: function (e) {
        }
    });

}


/**
 * 体温监测
 */
function statistictemp() {

    $.ajax({
        url: reqUrl + "thermometrycontroller/statistictemp",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: {},
        dataType: "json",
        success: function (data) {

            // 体温异常累计
            historyAbnormalTemperature[0].value = data.data.totalAbnormalTempratureStuCount;// 学生
            historyAbnormalTemperature[1].value = data.data.totalAbnormalTempratureTeaCount;// 教师
            updateHistoryAbnormalTemperature();

            // 今日体温监测
            todayTemperatureWatch[0].value = data.data.normalTemperatureStuCount;// 学生正常
            todayTemperatureWatch[1].value = data.data.abnormalTemperatureStuCount;// 学生异常
            todayTemperatureWatch[2].value = data.data.normalTemperatureTeaCount;// 教师正常
            todayTemperatureWatch[3].value = data.data.abnormalTemperatureTeaCount;// 教师异常
            updateTodayTemperatureWatch();

            // 师生体温异常发展趋势
            studentTeacherAbnormalTemperatureTrend[0].value = data.data.abnormalTemperature.teaCount;// 教职工
            studentTeacherAbnormalTemperatureTrend[1].value = data.data.abnormalTemperature.stuCount;// 学生
            dvStudentTeacherAbnormalTemperatureTrend.series[0].data = studentTeacherAbnormalTemperatureTrend[0].value
            dvStudentTeacherAbnormalTemperatureTrend.series[1].data = studentTeacherAbnormalTemperatureTrend[1].value
            dvStudentTeacherAbnormalTemperatureTrend.xAxis.data = data.data.abnormalTemperature.time;// 日期
            //dvStudentTeacherAbnormalTemperatureTrend.yAxis.max = data.data.abnormalTemperature.max;
            //dvStudentTeacherAbnormalTemperatureTrend.yAxis.min = data.data.abnormalTemperature.min;

        },
        error: function (e) {
        }
    });

}