$(function () {
    statisticdataform();
    statisticReportTime();
    // dataReportView();

    // 定时刷新
    setInterval(function () {
        statisticdataform();
        statisticReportTime();
        // dataReportView();
    }, 10000);

    // 尚未上报学校
    var noRepotSchoolCount = 0;
    var finishReportCount = 0;
});

function statisticdataform() {

    $.ajax({
        url: reqUrl + "dataformcontroller/statisticdataform",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: {},
        dataType: "json",
        success: function (data) {

            // 数据上报率
            var dataReportRate = data.data.dataReportRate;

            // 未上报学校
            var noReportSchool = data.data.noReportSchool;

            // 已上报学校
            var reportingSchool = data.data.reportingSchool;

            // 完成上报学校
            var reportedSchool = data.data.reportedSchool;

            dvDataUploadedRate.title.text = dataReportRate * 100 + '%';
            dvDataUploadedRate.series[0].data[0].value = dataReportRate;
            dvDataUploadedRate.series[0].data[1].value = 1 - dataReportRate;

            dataUploadedComprehensive[0].value = noReportSchool;
            dataUploadedComprehensive[1].value = reportingSchool;
            dataUploadedComprehensive[2].value = reportedSchool;
            updateDataUploadedComprehensive();

            // 今日数据上报学校明细
            var reportSchoolList = data.data.reportSchoolList;
            if (reportSchoolList != null && reportSchoolList.length > 0) {
                $("#reportSchoolList").empty();
                for (let i = 0; i < reportSchoolList.length; i++) {
                    var img;
                    if (i == 0) {
                        img = "images/01gold.png";
                    }

                    if (i == 1) {
                        img = "images/02silver.png";
                    }

                    if (i == 2) {
                        img = "images/03copper.png";
                    }

                    let html = "<tr>\n";
                    if (i > 2) {
                        html = html + "  <td>" + (i + 1) + "</td>\n";
                    } else {
                        html = html + "  <td class=\"prize\"><img src=\"" + img + "\"></td>\n";
                    }
                    html = html + "  <td>" + reportSchoolList[i].schName + "</td>\n";
                    html = html + "  <td>" + reportSchoolList[i].status + "</td>\n";
                    html = html + "  <td>" + reportSchoolList[i].reportTime + "</td>\n";
                    html = html + "</tr>";
                    $("#reportSchoolList").append(html);
                }
            }
        },
        error: function (e) {
        }
    });
}

/**
 * 上报时间
 */
function statisticReportTime() {
    $.ajax({
        url: reqUrl + "reporttimecontroller/statisticreporttime",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: {},
        dataType: "json",
        success: function (data) {
            const reportDatas = data.data.reportData;
            if (reportDatas != null && reportDatas != undefined) {
                for (let i = 0; i < reportDatas.length; i++) {
                    timePoints[i].date = reportDatas[i].time;
                    timePoints[i].title = "共上报防疫数据" + reportDatas[i].epidemicCount + "条,测温数据" + reportDatas[i].epidemicCount + "条";
                    timePoints[i].content = "学生病假" + reportDatas[i].stuIllnessCount + "例，事假" + reportDatas[i].stuIllnessCount + "例，体温异常"
                        + reportDatas[i].thermometryCount + "例，最高温度" + reportDatas[i].stuThermometryMax;
                }
                makeTimeLine();
            }
        },
        error: function (e) {
        }
    });
}


/**
 * 数据上报情况统计
 */
function dataReportView() {


    $.ajax({
        url: reqUrl + "dataReportController/statisticepidemic",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: {},
        dataType: "json",
        success: function (data) {

            // 今日报告种类
            var reportTypes = data.data.reportTypes;

            // 今日已经上报学校（上报中）数量
            var reported = data.data.reportedCount;

            // 根据学校类型统计已经复课的学校数量
            var renewSchool = data.data.renewSchoolCount;//高中 3


            // 今日已经上报学校（上报中）名称
            var reportName = data.data.reportedName;

            // 尚未上报学校
            var noRepotSchoolCount = renewSchool - reported;

            //
            finishReportCount = data.data.finishReportCount - 1;

            // 数据综合情况
            dataUploadedComprehensive[0].value = noRepotSchoolCount;
            dataUploadedComprehensive[1].value = reported;
            dataUploadedComprehensive[2].value = finishReportCount;
            updateDataUploadedComprehensive();

            // 数据上报率
            dataUploadedRate = Math.round(reported / renewSchool * 100) / 100;
            dvDataUploadedRate.title.text = dataUploadedRate * 100 + '%';
            dvDataUploadedRate.series[0].data[0] = dataUploadedRate;
            dvDataUploadedRate.series[0].data[1] = 1 - dataUploadedRate;


        },
        error: function (e) {
        }
    });

}