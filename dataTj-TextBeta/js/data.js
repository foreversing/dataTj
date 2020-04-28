const reqUrl = "http://192.168.0.155:9090/";
// 在籍学生数
var regStuCount = 0;
$(function () {
    baseDataView();
    epidemicisolateView();
    // ondutyView();
    attendence();
    // 定时刷新
    setTimeout(function () {
        baseDataView();
        epidemicisolateView();
        // ondutyView();
        attendence();
    }, 1000);
});

/**
 * 出行情况
 */
function attendence() {

    $.ajax({
        url: reqUrl + "attendancestatisticscontroller/statisticattendence",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: {},
        dataType: "json",
        success: function (data) {

            // ======== 学生综合出勤
            // 待复学
            var onDutyStus = data.data.notAttendenceStuCount;

            // 实际出勤
            var realOnDutyStus = data.data.actualAttendenceStuCount;

            // ======== 缺席学生
            // 因病
            var illAbsentStus = data.data.illnessStuCount;

            // 因事
            var eventAbsentStus = data.data.causeStuCount;

            // 未返哈
            var noReturnStus = data.data.notBackStuCount;

            // ======== 教职工综合出勤
            // 教师应出
            var onDutyTeas = data.data.attendenceTeaCount;

            //教师实出
            var realOnDutyTeas = data.data.actualAttendenceTeaCount;

            //工作人员出勤
            var onDutyWors = data.data.attendenceWorkerCount;

            // ======== 缺席教职工
            // 因病
            var illAbsentTeas = data.data.illnessTeaCount;

            // 因事
            var eventAbsentTeas = data.data.causeTeaCount;

            // 未返哈
            var noReturnTeas = data.data.notBackTeaCount;

            todayAlreadyStudent[0].totalNum = onDutyStus;
            todayAlreadyStudent[1].totalNum = realOnDutyStus;
            //百分比

            updateTodayAlreadyStudent();

            todayAbsentStudent[0].value = illAbsentStus;
            todayAbsentStudent[1].value = eventAbsentStus;
            todayAbsentStudent[2].value = noReturnStus;
            updateTodayAbsentStudent();

            todayAlreadyTeacher[0].totalNum = onDutyTeas;
            todayAlreadyTeacher[1].totalNum = realOnDutyTeas;
            todayAlreadyTeacher[2].totalNum = onDutyWors;
            updateTodayAlreadyTeacher();

            todayAbsentTeacher[0].value = illAbsentTeas;
            todayAbsentTeacher[1].value = eventAbsentTeas;
            todayAbsentTeacher[2].value = noReturnTeas;
            updateTodayAbsentTeacher();

            // ======= 学生因病缺勤趋势 =========
            dvStudentAbsentBySick.series.data = data.data.studentIllnessTrend.count;
            dvStudentAbsentBySick.xAxis[0].data = data.data.studentIllnessTrend.time;
            dvStudentAbsentBySick.yAxis[0].max = data.data.studentIllnessTrend.max;
            dvStudentAbsentBySick.yAxis[0].min = data.data.studentIllnessTrend.min;

            // ++++++++++++ 师生出勤率趋势 +++++++++++++++
            studentTeacherAlreadyTrend[0].value = data.data.teaAndStuAttendanceRateTrend.teaCount;
            studentTeacherAlreadyTrend[1].value = data.data.teaAndStuAttendanceRateTrend.stuCount;
            dvStudentTeacherAlreadyTrend.series[0].data = studentTeacherAlreadyTrend[0].value;
            dvStudentTeacherAlreadyTrend.series[1].data = studentTeacherAlreadyTrend[1].value;
            dvStudentTeacherAlreadyTrend.xAxis.data = data.data.teaAndStuAttendanceRateTrend.time;
            // dvStudentTeacherAlreadyTrend.yAxis.min = data.data.teaAndStuAttendanceRateTrend.min;
            // dvStudentTeacherAlreadyTrend.yAxis.max = data.data.teaAndStuAttendanceRateTrend.max;

            // 学生出勤率
            dvStudentAlreadyRate.title.text = data.data.attendanceStuRate.rate * 100 + '%'
            dvStudentAlreadyRate.series[0].data[0].value = data.data.attendanceStuRate.rate;
            dvStudentAlreadyRate.series[0].data[1].value = 1 - data.data.attendanceStuRate.rate;

            // 教职工出勤率
            dvTeacherAlreadyRate.title.text = data.data.attendanceTeaRate.rate * 100 + '%'
            dvTeacherAlreadyRate.series[0].data[0].value = data.data.attendanceTeaRate.rate;
            dvTeacherAlreadyRate.series[0].data[1].value = 1 - data.data.attendanceTeaRate.rate;
        },
        error: function (e) {
        }
    });


}

// /**
//  * 今日师生出勤
//  */
// function ondutyView() {
//
//     $.ajax({
//         url: reqUrl + "ondutycontroller/statisticepidemic",
//         type: "POST",
//         contentType: "application/json; charset=utf-8",
//         data: {},
//         dataType: "json",
//         success: function (data) {
//
//             // ======== 学生综合出勤
//             // 待复学
//             var onDutyStus = regStuCount - data.data.onDutyStus - data.data.illAbsentStus - data.data.eventAbsentStus - data.data.noReturnStus;
//             if (onDutyStus < 0) {
//                 onDutyStus = 0;
//             }
//
//             // 实际出勤
//             var realOnDutyStus = data.data.onDutyStus;
//
//             // ======== 缺席学生
//             // 因病
//             var illAbsentStus = data.data.illAbsentStus;
//
//             // 因事
//             var eventAbsentStus = data.data.eventAbsentStus;
//
//             // 未返哈
//             var noReturnStus = data.data.noReturnStus;
//
//             // ======== 教职工综合出勤
//             // 教师应出
//             var onDutyTeas = data.data.onDutyTeas;
//
//             //教师实出
//             var realOnDutyTeas = data.data.realOnDutyTeas;
//
//             //工作人员出勤
//             var onDutyWors = data.data.onDutyWors;
//
//             // ======== 缺席教职工
//             // 因病
//             var illAbsentTeas = data.data.illAbsentTeas;
//
//             // 因事
//             var eventAbsentTeas = data.data.eventAbsentTeas;
//
//             // 未返哈
//             var noReturnTeas = data.data.noReturnTeas;
//
//             todayAlreadyStudent[0].totalNum = onDutyStus;
//             todayAlreadyStudent[1].totalNum = realOnDutyStus;
//             updateTodayAlreadyStudent();
//
//             todayAbsentStudent[0].value = illAbsentStus;
//             todayAbsentStudent[1].value = eventAbsentStus;
//             todayAbsentStudent[2].value = noReturnStus;
//             updateTodayAbsentStudent();
//
//             todayAlreadyTeacher[0].totalNum = onDutyTeas;
//             todayAlreadyTeacher[1].totalNum = realOnDutyTeas;
//             todayAlreadyTeacher[2].totalNum = onDutyWors;
//             updateTodayAlreadyTeacher();
//
//             todayAbsentTeacher[0].value = illAbsentTeas;
//             todayAbsentTeacher[1].value = eventAbsentTeas;
//             todayAbsentTeacher[2].value = noReturnTeas;
//             updateTodayAbsentTeacher();
//
//             // ======= 学生因病缺勤趋势 =========
//             var illAbsentStuCount = data.data.stuAbsentTread.illAbsentStuCount;
//             var illAbsentDate = data.data.stuAbsentTread.illAbsentDate;
//
//             dvStudentAbsentBySick.series.data = illAbsentStuCount;
//             dvStudentAbsentBySick.xAxis[0].data = illAbsentDate;
//
//
//             // ++++++++++++ 师生出勤率趋势 +++++++++++++++
//             // studentTeacherDivideTrend[0].value = Math.round((realOnDutyTeas + onDutyWors) / (onDutyTeas + onDutyWors));
//             // studentTeacherDivideTrend[1].value = Math.round(onDutyStus / (illAbsentStus + eventAbsentStus + noReturnStus + onDutyStus));
//
//             // studentTeacherAlreadyTrend[0].value = [11, 10];
//             // studentTeacherAlreadyTrend[1].value = [16, 50];
//             dvStudentTeacherAlreadyTrend.xAxis.data = data.data.teaStuOnDutyTread.onDutyDate;
//             dvStudentTeacherAlreadyTrend.yAxis.min = data.data.teaStuOnDutyTread.min;
//             dvStudentTeacherAlreadyTrend.yAxis.max = data.data.teaStuOnDutyTread.max;
//
//             // 学生出勤率
//             studentAlreadyRate = Math.round(onDutyStus / (illAbsentStus + eventAbsentStus + noReturnStus + onDutyStus));
//             dvStudentAlreadyRate.title.text = studentAlreadyRate*100+'%';
//             dvStudentAlreadyRate.series[0].data[0] = studentAlreadyRate;
//             dvStudentAlreadyRate.series[0].data[1] = 1 - studentAlreadyRate;
//
//
//             // 教职工出勤率
//             teacherAlreadyRate = Math.round((realOnDutyTeas + onDutyWors) / (onDutyTeas + onDutyWors));
//             dvTeacherAlreadyRate.title.text = teacherAlreadyRate*100+'%';
//             dvTeacherAlreadyRate.series[0].data[0] = teacherAlreadyRate;
//             dvTeacherAlreadyRate.series[0].data[1] = 1 - teacherAlreadyRate;
//
//         },
//         error: function (e) {
//         }
//     });
//
// }

/**
 * 传染病疫情
 */
function epidemicisolateView() {

    $.ajax({
        url: reqUrl + "epidemicisolatecontroller/statisticepidemic",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: {},
        dataType: "json",
        success: function (data) {

            // 总体学生隔离数
            var totalIsolateStuCount = data.data.totalIsolateStuCount;
            // 总体教师隔离数
            var totalIsolateTeaCount = data.data.totalIsolateTeaCount;

            // 今日学生隔离数
            var todayIsolateStuCount = data.data.todayIsolateStuCount;
            // 今日学生解除隔离
            var todayRemoveIsolateStuCount = data.data.todayRemoveIsolateStuCount;

            // 今日教师隔离数
            var todayIsolateTeaCount = data.data.todayIsolateTeaCount;
            // 今日教师解除隔离
            var todayRemoveIsolateTeaCount = data.data.todayRemoveIsolateTeaCount;

            sickSituation[0].totalNum = totalIsolateStuCount;
            sickSituation[1].totalNum = totalIsolateTeaCount;

            todyStudentSickSituation[0].totalNum = todayIsolateStuCount;
            todyStudentSickSituation[1].totalNum = todayRemoveIsolateStuCount;

            todyTeacherSickSituation[0].totalNum = todayIsolateTeaCount;
            todyTeacherSickSituation[1].totalNum = todayRemoveIsolateTeaCount;

            updateSick();

            studentTeacherDivideTrend[0].value = data.data.stuAndTeaIsolate.teaCount;
            studentTeacherDivideTrend[1].value = data.data.stuAndTeaIsolate.stuCount;
            dvStudentTeacherDivideTrend.series[0].data = studentTeacherDivideTrend[0].value
            dvStudentTeacherDivideTrend.series[1].data = studentTeacherDivideTrend[1].value
            dvStudentTeacherDivideTrend.xAxis.data = data.data.stuAndTeaIsolate.time;
            // dvStudentTeacherDivideTrend.yAxis.max = data.data.stuAndTeaIsolate.max;
            // dvStudentTeacherDivideTrend.yAxis.min = data.data.stuAndTeaIsolate.min;
        },
        error: function (e) {
        }
    });
}


/**
 * 基本数据统计
 */
function baseDataView() {

    $.ajax({
        url: reqUrl + "basedaocontroller/statisticbasedate",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: {},
        dataType: "json",
        success: function (data) {
            // 在籍学生数
            var registerStuCount = data.data.registerStuCount;
            regStuCount = registerStuCount;
            // 住校学生
            var staySchoolStuCount = data.data.staySchoolStuCount;
            // 走读学生
            var goHomeStuCount = data.data.goHomeStuCount;


            $("#registerStuCount").empty();
            $("#registerStuCount").html(registerStuCount + "<small>人</small>");

            $("#staySchoolStuCount").empty();
            $("#staySchoolStuCount").text(staySchoolStuCount);

            $("#goHomeStuCount").empty();
            $("#goHomeStuCount").text(goHomeStuCount);


            studentTypeRate[0].value = goHomeStuCount;
            studentTypeRate[1].value = staySchoolStuCount;

            // studentTypeRate[0].value = Math.round(goHomeStuCount/(goHomeStuCount + staySchoolStuCount));
            // studentTypeRate[1].value = Math.round(staySchoolStuCount/(goHomeStuCount + staySchoolStuCount));

        },
        error: function (e) {
        }
    });

}
