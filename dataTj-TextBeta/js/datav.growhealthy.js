var host = "192.168.0.13";
var port = 9003;
var path = "healthy/sid=";
var overview_sid = "overview";
var bodyShape_sid = "bodyshape";
var physicalfitness_sid = "physicalfitness";
var statistic_sid = "statistic";
var overview_websocket = null;
var bodyshape_websocket = null;
var physicalfitness_websocket = null;
var statistic_websocket = null;
var overview_url = "ws://" + host + ":" + port + "/" + path + overview_sid;
var bodyshape_url = "ws://" + host + ":" + port + "/" + path + bodyShape_sid;
var physicalfitness_url = "ws://" + host + ":" + port + "/" + path + physicalfitness_sid;
var statistic_url = "ws://" + host + ":" + port + "/" + path + statistic_sid;


$(function () {

    /**
     * 建立监测总览websocket connection
     */
    connectOverviewWebSocket();

    /**
     * 建立形态技能websocket connection
     */
    connectBodyshapeWebSocket();

    /**
     * 建立身体素质websocket connection
     */
    // connectPhysicalfitnessWebSocket();

    /**
     * 建立监测统计websocket connection
     */
    // connectStatisticWebSocket();


    // 初始化加载最近3条监测动态数据（体检/体测）
    $.ajax({
        type: "POST",
        url: "http://192.168.0.13:8987/overviewcontroller/listhealthyitemmonitor",
        data: "",
        success: function (data) {
            var lis = "";
            for (let i = 0; i < data.length; i++) {
                var type = data[i].type;
                var name = data[i].name;
                var itemName = data[i].itemName;
                var imgUrl = data[i].imgUrl;
                var checkResult = data[i].checkResult;
                var checkDate = data[i].checkDate;
                var li = makeListItem(name, itemName, imgUrl, checkResult, 1, checkDate)
                lis += li;
            }
            $("#watcher").empty();
            $("#watcher").html(lis);
        }
    });
});

//建立监测总览WebSocket连接
function connectOverviewWebSocket() {

    console.log("=====建立监测总览 websocket 开始……=====");

    overview_websocket = new WebSocket(overview_url);

    overview_websocket.onopen = function () {
        console.log("=====监测总览 websocket onpen……=====");
    };

    overview_websocket.onclose = function () {
        console.log("=====监测总览 websocket onclose=====");
        if (overview_websocket != null) {
            overview_websocket.close();
        }
        setInterval(function () {
            connectOverviewWebSocket();
        }, 100000);// 一分钟重连一次
    };

    overview_websocket.onmessage = function (msg) {
        console.log("=====监测总览 websocket onmessage=====");
        console.log(msg.data);
        const jsonObj = eval("(" + msg.data + ")");

        // 刷新监测动态
        const monitor_dynamics = jsonObj.monitor_dynamics;
        if (monitor_dynamics != undefined && monitor_dynamics != null) {
            var type = monitor_dynamics.type;
            var name = monitor_dynamics.name;
            var itemName = monitor_dynamics.itemName;
            var imgUrl = monitor_dynamics.imgUrl;
            var checkResult = monitor_dynamics.checkResult;
            var checkDate = monitor_dynamics.checkDate;
            scrollAfterAppend(
                makeListItem(
                    name,
                    itemName,
                    imgUrl,
                    checkResult,
                    1,
                    checkDate));
        }

        // 刷新班级数
        const class_num = jsonObj.class_num;
        if (class_num != undefined && class_num != null) {
            // console.log("班级数: " + class_num);
            $("#class_num").html(class_num + "<small>个</small>");
        }

        // 刷新学生数
        const student_num = jsonObj.student_num;
        if (student_num != undefined && student_num != null) {
            // console.log("学生数: " + student_num);
            $("#student_num").html(student_num + "<small>个</small>");
        }

        // 刷新在册男女比例
        const boy_gril_proportion = jsonObj.boy_gril_proportion;
        if (boy_gril_proportion != undefined && boy_gril_proportion != null) {
            // console.log("在册男女比例: " + boy_gril_proportion);
            $("#process_male").text(boy_gril_proportion.boyRate);
            $("#process_female").text(boy_gril_proportion.girlRate);
        }

        // 刷新历史累计
        const history_statistic = jsonObj.history_statistic;
        if (history_statistic != undefined && history_statistic != null) {
            // console.log("历史累计: " + history_statistic);
            // TODO: 上升下降标识
            _increase("total_shape", history_statistic.hisBodyShape);
            _increase("total_quality", history_statistic.hisCheckResult);
        }

        // 刷新今日实时
        const today_statistic = jsonObj.today_statistic;
        if (today_statistic != undefined && today_statistic != null) {
            // console.log("今日实时: " + today_statistic);
            // TODO: 上升下降标识
            _increase("today_shape", today_statistic.curBodyShape);
            _increase("today_quality", today_statistic.curCheckResult);
        }

        // 刷新平均身高与体重
        const avg_height_weight = jsonObj.avg_height_weight;
        if (avg_height_weight != undefined && avg_height_weight != null) {
            dvMeanHeightAndweight.series[0].data[0].value = avg_height_weight.avgHeight;
            dvMeanHeightAndweight.series[1].data[0].value = avg_height_weight.avgWeight;
        }

        // 刷新检测覆盖率
        const check_coverage_rate = jsonObj.check_coverage_rate;
        if (check_coverage_rate != undefined && check_coverage_rate != null) {
            // const alreadyChecked = Math.round((check_coverage_rate.alreadyCheck / check_coverage_rate.total) * 100) / 100;
            // const notCheck = Math.round((check_coverage_rate.notCheck / check_coverage_rate.total) * 100) / 100;

            // console.log("已检测: " + alreadyChecked);
            // console.log("未检测: " + notCheck);

            const alreadyCheckRate = check_coverage_rate.alreadyCheckRate;
            const notCheckRate = check_coverage_rate.notCheckRate;

            alert(alreadyCheckRate);

            monitorCoverRate[0].value = alreadyCheckRate;
            monitorCoverRate[1].value = notCheckRate;
        }

        // 刷新发育异常占比
        const growth_abnormal = jsonObj.growth_abnormal;
        if (growth_abnormal != undefined && growth_abnormal != null) {

            var temperatureWarn = growth_abnormal.temperatureWarn;//体温异常
            var weightWarn = growth_abnormal.weightWarn;// 超重
            var visionWarn = growth_abnormal.visionWarn;// 视力异常
            var pabulumWarn = growth_abnormal.pabulumWarn;// 营养不良
            var pressureWarn = growth_abnormal.pressureWarn;// 血压异常
            var heartRateWarn = growth_abnormal.heartRateWarn;// 心率异常
            var fatWarn = growth_abnormal.fatWarn;// 脂肪率异常

            // console.log("体温异常: " + temperatureWarn);
            // console.log("超重: " + weightWarn);
            // console.log("视力异常: " + visionWarn);
            // console.log("营养不良: " + pabulumWarn);
            // console.log("血压异常: " + pressureWarn);
            // console.log("心率异常: " + heartRateWarn);
            // console.log("脂肪率异常: " + fatWarn);

            growthAbnormal[0].value = temperatureWarn;
            growthAbnormal[1].value = weightWarn;
            growthAbnormal[2].value = visionWarn;
            growthAbnormal[3].value = pabulumWarn;
            growthAbnormal[4].value = pressureWarn;
            growthAbnormal[5].value = heartRateWarn;
            growthAbnormal[6].value = fatWarn;
        }

        // 刷新体育达标率

        // 刷新多项指标雷达图

    }
}


/**
 * 建立形态机能WebSocket连接
 */
function connectBodyshapeWebSocket() {

    console.log("=====建立形态技能 websocket 开始……=====");

    bodyshape_websocket = new WebSocket(bodyshape_url);

    bodyshape_websocket.onopen = function () {
        console.log("=====形态技能 websocket onopen……=====");
    };

    bodyshape_websocket.onclose = function () {
        console.log("=====形态技能 websocket onclose……=====");
        if (bodyshape_websocket != null) {
            bodyshape_websocket.close();
        }
    };

    bodyshape_websocket.onmessage = function (msg) {
        // console.log("=====形态技能 websocket onmessage……=====");
        // console.log(msg.data);

        const jsonObj = eval("(" + msg.data + ")");
        var all_grade_height_trend = jsonObj.ALL_GRADE_HEIGHT_TREND;

        // 各年级身高趋势
        if (all_grade_height_trend != undefined && all_grade_height_trend != null) {
            for (let i = 0; i < all_grade_height_trend.gradeArray.length; i++) {
                gradeArray[i] = all_grade_height_trend.gradeArray[i];
            }

            for (let i = 0; i < all_grade_height_trend.monthArray.length; i++) {
                monthArray[i] = all_grade_height_trend.monthArray[i];
            }

            for (let i = 0; i < all_grade_height_trend.heightTrendArray.length; i++) {
                heightGrowthTrend[i].name = all_grade_height_trend.heightTrendArray[i].gradeName;
                for (let j = 0; j < all_grade_height_trend.heightTrendArray[i].heightArray.length; j++) {
                    heightGrowthTrend[i].value[j] = all_grade_height_trend.heightTrendArray[i].heightArray[j];
                }
            }
            console.log("heightGrowthTrend=" + heightGrowthTrend);
        }

        // 身高体重分布
        var height_and_weight_dis = jsonObj.HEIGHT_AND_WEIGHT_DIS;
        if (height_and_weight_dis != undefined && height_and_weight_dis != null) {

            for (let i = 0; i < height_and_weight_dis.girls.length; i++) {
                var heightAndWeight = [];
                heightAndWeight[0] = height_and_weight_dis.girls[i].height;
                heightAndWeight[1] = height_and_weight_dis.girls[i].weight;
                heightAndWeightScatter[0][i] = heightAndWeight;
            }

            for (let i = 0; i < height_and_weight_dis.boys.length; i++) {
                var heightAndWeight = [];
                heightAndWeight[0] = height_and_weight_dis.boys[i].height;
                heightAndWeight[1] = height_and_weight_dis.boys[i].weight;
                heightAndWeightScatter[1][i] = heightAndWeight;
            }
        }

        // 各年级近视分布
        var all_grade_myopia_dis = jsonObj.ALL_GRADE_MYOPIA_DIS;
        console.log("all_grade_myopia_dis=" + all_grade_myopia_dis);
        if (all_grade_myopia_dis != undefined && all_grade_myopia_dis != null) {
            for (let i = 0; i < all_grade_myopia_dis.length; i++) {
                myopicDistribution[i].value = all_grade_myopia_dis[i].myopiaNum;// 近视学生人数
                myopicDistribution[i].name = all_grade_myopia_dis[i].grade;// 年级名称
                myopicDistribution[i].abnormalRate = all_grade_myopia_dis[i].abnormalRate;// 同比上升/下降
                myopicDistribution[i].averageMyopic = all_grade_myopia_dis[i].avgVision;// 平均视力
                myopicDistribution[i].trend = all_grade_myopia_dis[i].visionTrends;// 视力趋势
            }
            var htmlStr = "<div class=\"d-table-row\">\n" +
                "<div class=\"d-table-cell\"></div>\n" +
                "<div class=\"d-table-cell\"></div>\n" +
                "<div class=\"d-table-cell dtrend\"></div>\n" +
                "<div class=\"d-table-cell dth\">平均视力</div>\n" +
                "<div class=\"d-table-cell dth\">上月同比</div>\n" +
                "</div>";
            $("#MyopicLegendBody").empty();
            $("#MyopicLegendBody").html(htmlStr);
            makeMyopicDistributionLegend();
        }

        // 平均bmi
        var avg_bmi = jsonObj.AVG_BMI;
        console.log("avg_bmi=" + avg_bmi);
        if (avg_bmi != undefined && avg_bmi != null) {
            dvAverageBMI.series[3].data[0].value = avg_bmi;
        }

        // 各年级男女学生体重达标占比
        const ALL_GRADE_BOY_AND_GRIL_WEIGHT_RATE = jsonObj.ALL_GRADE_BOY_AND_GRIL_WEIGHT_RATE;
        if (ALL_GRADE_BOY_AND_GRIL_WEIGHT_RATE != undefined && ALL_GRADE_BOY_AND_GRIL_WEIGHT_RATE != null) {

            /*
             * 男生体重达标人数
             */
            var gradeOneWeightBoys = ALL_GRADE_BOY_AND_GRIL_WEIGHT_RATE.boys[0];// 一年级
            var gradeTwoWeightBoys = ALL_GRADE_BOY_AND_GRIL_WEIGHT_RATE.boys[1];// 二年级
            var gradeThreeWeightBoys = ALL_GRADE_BOY_AND_GRIL_WEIGHT_RATE.boys[2];// 三年级
            var gradeFourWeightBoys = ALL_GRADE_BOY_AND_GRIL_WEIGHT_RATE.boys[3];// 四年级
            var gradeFiveWeightBoys = ALL_GRADE_BOY_AND_GRIL_WEIGHT_RATE.boys[4];// 五年级
            var gradeSixWeightBoys = ALL_GRADE_BOY_AND_GRIL_WEIGHT_RATE.boys[5];// 六年级

            /*
             * 女生体重达标人数
             */
            var gradeOneWeightGirls = ALL_GRADE_BOY_AND_GRIL_WEIGHT_RATE.girls[0];// 一年级
            var gradeTwoWeightGirls = ALL_GRADE_BOY_AND_GRIL_WEIGHT_RATE.girls[1];// 二年级
            var gradeThreeWeightGirls = ALL_GRADE_BOY_AND_GRIL_WEIGHT_RATE.girls[2];// 三年级
            var gradeFourWeightGirls = ALL_GRADE_BOY_AND_GRIL_WEIGHT_RATE.girls[3];// 四年级
            var gradeFiveWeightGirls = ALL_GRADE_BOY_AND_GRIL_WEIGHT_RATE.girls[4];// 五年级
            var gradeSixWeightGirls = ALL_GRADE_BOY_AND_GRIL_WEIGHT_RATE.girls[5];// 六年级

            // console.log("一年级男生体重达标人数: " + gradeOneWeightBoys);
            // console.log("二年级男生体重达标人数: " + gradeTwoWeightBoys);
            // console.log("三年级男生体重达标人数: " + gradeThreeWeightBoys);
            // console.log("四年级男生体重达标人数: " + gradeFourWeightBoys);
            // console.log("五年级男生体重达标人数: " + gradeFiveWeightBoys);
            // console.log("六年级男生体重达标人数: " + gradeSixWeightBoys);

            // console.log("一年级女生体重达标人数: " + gradeOneWeightGirls);
            // console.log("二年级女生体重达标人数: " + gradeTwoWeightGirls);
            // console.log("三年级女生体重达标人数: " + gradeThreeWeightGirls);
            // console.log("四年级女生体重达标人数: " + gradeFourWeightGirls);
            // console.log("五年级女生体重达标人数: " + gradeFiveWeightGirls);
            // console.log("六年级女生体重达标人数: " + gradeSixWeightGirls);

            /*
             * 为ECharts图表赋值
             */
            // 男生
            everyGradeWeightStandardReachingRate[0][0].value = gradeOneWeightBoys;// 一年级
            everyGradeWeightStandardReachingRate[0][1].value = gradeTwoWeightBoys;// 二年级
            everyGradeWeightStandardReachingRate[0][2].value = gradeThreeWeightBoys;// 三年级
            everyGradeWeightStandardReachingRate[0][3].value = gradeFourWeightBoys;// 四年级
            everyGradeWeightStandardReachingRate[0][4].value = gradeFiveWeightBoys;// 五年级
            everyGradeWeightStandardReachingRate[0][5].value = gradeSixWeightBoys;// 六年级

            // 女生
            everyGradeWeightStandardReachingRate[1][0].value = gradeOneWeightGirls;// 一年级
            everyGradeWeightStandardReachingRate[1][1].value = gradeTwoWeightGirls;// 二年级
            everyGradeWeightStandardReachingRate[1][2].value = gradeThreeWeightGirls;// 三年级
            everyGradeWeightStandardReachingRate[1][3].value = gradeFourWeightGirls;// 四年级
            everyGradeWeightStandardReachingRate[1][4].value = gradeFiveWeightGirls;// 五年级
            everyGradeWeightStandardReachingRate[1][5].value = gradeSixWeightGirls;// 六年级

        }

        // 刷新各年级男女学生身高达标占比
        const ALL_GRADE_BOY_AND_GRIL_HEIGHT_RATE = jsonObj.ALL_GRADE_BOY_AND_GRIL_HEIGHT_RATE;
        if (ALL_GRADE_BOY_AND_GRIL_HEIGHT_RATE != undefined && ALL_GRADE_BOY_AND_GRIL_HEIGHT_RATE != null) {

            /*
             * 男生体重达标人数
             */
            var gradeOneHeightBoys = ALL_GRADE_BOY_AND_GRIL_HEIGHT_RATE.boys[0];// 一年级
            var gradeTwoHeightBoys = ALL_GRADE_BOY_AND_GRIL_HEIGHT_RATE.boys[1];// 二年级
            var gradeThreeHeightBoys = ALL_GRADE_BOY_AND_GRIL_HEIGHT_RATE.boys[2];// 三年级
            var gradeFourHeightBoys = ALL_GRADE_BOY_AND_GRIL_HEIGHT_RATE.boys[3];// 四年级
            var gradeFiveHeightBoys = ALL_GRADE_BOY_AND_GRIL_HEIGHT_RATE.boys[4];// 五年级
            var gradeSixHeightBoys = ALL_GRADE_BOY_AND_GRIL_HEIGHT_RATE.boys[5];// 六年级

            /*
             * 女生体重达标人数
             */
            var gradeOneHeightGirls = ALL_GRADE_BOY_AND_GRIL_HEIGHT_RATE.girls[0];// 一年级
            var gradeTwoHeightGirls = ALL_GRADE_BOY_AND_GRIL_HEIGHT_RATE.girls[1];// 二年级
            var gradeThreeHeightGirls = ALL_GRADE_BOY_AND_GRIL_HEIGHT_RATE.girls[2];// 三年级
            var gradeFourHeightGirls = ALL_GRADE_BOY_AND_GRIL_HEIGHT_RATE.girls[3];// 四年级
            var gradeFiveHeightGirls = ALL_GRADE_BOY_AND_GRIL_HEIGHT_RATE.girls[4];// 五年级
            var gradeSixHeightGirls = ALL_GRADE_BOY_AND_GRIL_HEIGHT_RATE.girls[5];// 六年级

            // console.log("一年级男生身高达标人数: " + gradeOneHeightBoys);
            // console.log("二年级男生身高达标人数: " + gradeTwoHeightBoys);
            // console.log("三年级男生身高达标人数: " + gradeThreeHeightBoys);
            // console.log("四年级男生身高达标人数: " + gradeFourHeightBoys);
            // console.log("五年级男生身高达标人数: " + gradeFiveHeightBoys);
            // console.log("六年级男生身高达标人数: " + gradeSixHeightBoys);

            // console.log("一年级女生身高达标人数: " + gradeOneHeightGirls);
            // console.log("二年级女生身高达标人数: " + gradeTwoHeightGirls);
            // console.log("三年级女生身高达标人数: " + gradeThreeHeightGirls);
            // console.log("四年级女生身高达标人数: " + gradeFourHeightGirls);
            // console.log("五年级女生身高达标人数: " + gradeFiveHeightGirls);
            // console.log("六年级女生身高达标人数: " + gradeSixHeightGirls);

            /*
             * 为ECharts图表赋值
             */
            // 男生
            everyGradeHeightStandardReachingRate[0][0].value = gradeOneHeightBoys;// 一年级
            everyGradeHeightStandardReachingRate[0][1].value = gradeTwoHeightBoys;// 二年级
            everyGradeHeightStandardReachingRate[0][2].value = gradeThreeHeightBoys;// 三年级
            everyGradeHeightStandardReachingRate[0][3].value = gradeFourHeightBoys;// 四年级
            everyGradeHeightStandardReachingRate[0][4].value = gradeFiveHeightBoys;// 五年级
            everyGradeHeightStandardReachingRate[0][5].value = gradeSixHeightBoys;// 六年级

            // 女生
            everyGradeHeightStandardReachingRate[1][0].value = gradeOneHeightGirls;// 一年级
            everyGradeHeightStandardReachingRate[1][1].value = gradeTwoHeightGirls;// 二年级
            everyGradeHeightStandardReachingRate[1][2].value = gradeThreeHeightGirls;// 三年级
            everyGradeHeightStandardReachingRate[1][3].value = gradeFourHeightGirls;// 四年级
            everyGradeHeightStandardReachingRate[1][4].value = gradeFiveHeightGirls;// 五年级
            everyGradeHeightStandardReachingRate[1][5].value = gradeSixHeightGirls;// 六年级

        }
    }
}

//建立身体素质WebSocket连接
function connectPhysicalfitnessWebSocket() {

    console.log("建立身体素质 websocket 开始...");

    physicalfitness_websocket = new WebSocket(physicalfitness_url);

    physicalfitness_websocket.onopen = function () {
        console.log("physicalfitness_websocket onpen");
    };

    physicalfitness_websocket.onclose = function () {
        console.log("physicalfitness_websocket onclose");
        if (physicalfitness_websocket != null) {
            physicalfitness_websocket.close();
        }
    };

    physicalfitness_websocket.onmessage = function (msg) {
        console.log("physicalfitness_websocket onmessage");
        console.log(msg.data);
        const jsonObj = eval("(" + msg.data + ")");
        var type = jsonObj.type;
        var name = jsonObj.name;
        var itemName = jsonObj.itemName;
        var imgUrl = jsonObj.imgUrl;
        var checkResult = jsonObj.checkResult;
        var checkDate = jsonObj.checkDate;
        scrollAfterAppend(
            makeListItem(
                name,
                itemName,
                imgUrl,
                checkResult,
                1,
                checkDate));
    }
}


//建立监测统计WebSocket连接
function connectStatisticWebSocket() {

    console.log("建立监测统计 websocket 开始...");

    statistic_websocket = new WebSocket(statistic_url);

    statistic_websocket.onopen = function () {
        console.log("statistic_websocket onpen");
    };

    statistic_websocket.onclose = function () {
        console.log("statistic_websocket onclose");
        if (statistic_websocket != null) {
            statistic_websocket.close();
        }
    };

    statistic_websocket.onmessage = function (msg) {
        console.log("statistic_websocket onmessage");
        console.log(msg.data);
        const jsonObj = eval("(" + msg.data + ")");
        var type = jsonObj.type;
        var name = jsonObj.name;
        var itemName = jsonObj.itemName;
        var imgUrl = jsonObj.imgUrl;
        var checkResult = jsonObj.checkResult;
        var checkDate = jsonObj.checkDate;
        scrollAfterAppend(
            makeListItem(
                name,
                itemName,
                imgUrl,
                checkResult,
                1,
                checkDate));
    }
}


//数字翻牌效果
function _increase(objTarget, val) {
    var objTarget = $("#" + objTarget);
    objTarget.text(val);
    objTarget.addClass('is-increment-hide');

    setTimeout(function () {
        objTarget.addClass('is-increment-visible');
    }, 100);

    setTimeout(function () {
        objTarget.removeClass('is-increment-hide');
        objTarget.removeClass('is-increment-visible');
    }, 200);
}

// growthAbnormal=[
//     {value:1, name:'体温'},
//     {value:1, name:'超重'},
//     {value:1, name:'视力'},
//     {value:1, name:'营养不良'},
//     {value:1, name:'血压'},
//     {value:1, name:'心率'},
//     {value:1, name:'脂肪率'}
// ];