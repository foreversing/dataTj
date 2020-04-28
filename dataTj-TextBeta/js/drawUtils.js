
//页面初始化
function initThemeDataVirtual(){
    if (current == 1){
        var solidData = [
            {name: '走读学生', value: 5288, selected: true},
            {name: '住宿学生', value: 2156, selected: false}

        ];
        //走读/住宿学生占比
        dvChartData("solid",$(".JS_SolidPie")[0],"➤  走读/住宿学生占比", jsonForArray(solidData,"name"), "", solidData);

        /**
         * 今日师生出勤
         * */
        var attendanceStudentDatas = [
            {name: '', value: 0.97}

        ];
        //学生出勤率
        dvChartData("percent",$(".JS_PercentPie_Student")[0],"","", "", attendanceStudentDatas);

        var attendanceTeacherDatas = [
            {name: '', value: 0.90}

        ];
        //教师出勤率
        dvChartData("percent",$(".JS_PercentPie_Teacher")[0],"","", "", attendanceTeacherDatas);

        var absentStudentDatas = [
            {name: '因病', value: 6, compareCurrentMonthAgo: 0, max: 11, min: 9, average: 10},
            {name: '因事', value: 2, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10},
            {name: '未返哈', value: 1, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10}

        ];
        //学生缺勤占比
        dvChartData("hollow",$(".JS_HollowPie_StuAbsence")[0],"","", "", absentStudentDatas);

        var absentTeacherDatas = [
            {name: '因病', value: 1, compareCurrentMonthAgo: 0, max: 11, min: 9, average: 10},
            {name: '因事', value: 2, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10},
            {name: '未返哈', value: 1, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10}
        ];
        //教师缺勤占比
        dvChartData("hollow",$(".JS_HollowPie_TeaAbsence")[0],"","", "", absentTeacherDatas);

        var stuAttendDatas = [
            {name: '待复学', value: 28761, compareCurrentMonthAgo: 0, max: 11, min: 9, average: 10},
            {name: '实际出勤', value: 7484, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10}

        ];
        //学生综合出勤率
        dvSummaryInfo($(".JS_Stu_Attendance"),stuAttendDatas);

        var teaAttendDatas = [
            {name: '教师应出', value: 68, compareCurrentMonthAgo: 0, max: 11, min: 9, average: 10},
            {name: '教师实出', value: 66, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10},
            {name: '工作人员出勤', value: 33, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10}

        ];
        //教师综合出勤率
        dvSummaryInfo($(".JS_Tea_Attendance"),teaAttendDatas);

        var stuAbsentDatas = [
            {name: '因病', value: 6, compareCurrentMonthAgo: 0, max: 11, min: 9, average: 10},
            {name: '因事', value: 2, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10},
            {name: '未返哈', value: 1, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10}

        ];
        //缺席学生
        dvSummaryInfo($(".JS_Stu_Absent"),stuAbsentDatas);

        var teaAbsentDatas = [
            {name: '因病', value: 1, compareCurrentMonthAgo: 0, max: 11, min: 9, average: 10},
            {name: '因事', value: 2, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10},
            {name: '未返哈', value: 1, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10}

        ];
        //缺席教师
        dvSummaryInfo($(".JS_Tea_Absent"),teaAbsentDatas);



        /**
         * 传染病疫情
         * */
        var sickSituationDatas = [
            {name: '学生隔离', value: 16},
            {name: '教师隔离', value: 5}

        ];
        //总体疫情
        dvSummaryInfo($(".JS_SickSituation"),sickSituationDatas);

        var studentSickSituationDatas = [
            {name: '隔离', value: 4, compareCurrentMonthAgo: 0, max: 11, min: 9, average: 10},
            {name: '解除', value: 1, compareCurrentMonthAgo: 1, max: 11, min: 9, average: 10}

        ];
        //今日学生疫情
        dvSummaryInfo($(".JS_StudentSickSituation"),studentSickSituationDatas);

        var teacherSickSituationDatas = [
            {name: '隔离', value: 1, compareCurrentMonthAgo: 0.33, max: 11, min: 9, average: 10},
            {name: '解除', value: 1, compareCurrentMonthAgo: -0.33, max: 11, min: 9, average: 10}

        ];
        //今日教师疫情
        dvSummaryInfo($(".JS_TeacherSickSituation"),teacherSickSituationDatas);

        var divideTrenddatas = [
            {name: '教职工', value: [110, 112, 121, 154, 134, 120, 114, 121, 154, 134, 120, 114], xAxis: ["4-7", "4-8", "4-9", "4-10", "4-13", "4-14", "4-15", "4-16", "4-17", "4-20", "4-21"]},
            {name: '学生', value: [130, 112, 114, 134, 124, 130, 110, 114, 134, 124, 130, 110], xAxis: ["4-7", "4-8", "4-9", "4-10", "4-13", "4-14", "4-15", "4-16", "4-17", "4-20", "4-21"]}
        ];
        //师生传染病发展趋势
        dvChartData("line",$(".JS_DivideTrend")[0],"师生传染病发展趋势",divideTrenddatas, divideTrenddatas, divideTrenddatas);

        /**
         * 学生因病缺勤趋势
         * */
        var studentAbsentBySickDatas =[
            {name: '', value: [14, 9, 12, 14, 11, 9, 6, 8, 7, 6, 5, 4], xAxis: ["4-7", "4-8", "4-9", "4-10", "4-13", "4-14", "4-15", "4-16", "4-17", "4-20", "4-21"]}
        ];
        dvChartData("area",$(".JS_StudentAbsentBySick")[0],"师生传染病发展趋势","", studentAbsentBySickDatas, studentAbsentBySickDatas);


        /**
         * 师生出勤率趋势
         * */

        var studentTeacherAlreadyTrendDatas = [
            {name: '教职工', value: [0.98, 0.97, 0.98, 0.96, 0.94, 0.98, 0.96, 0.99, 0.95, 0.93, 0.99, 0.98], xAxis: ["4-7", "4-8", "4-9", "4-10", "4-13", "4-14", "4-15", "4-16", "4-17", "4-20", "4-21"]},
            {name: '学生', value: [0.98, 0.99, 0.98, 0.98, 0.99, 0.96, 0.98, 0.88, 0.96, 0.99, 0.88, 0.97], xAxis: ["4-7", "4-8", "4-9", "4-10", "4-13", "4-14", "4-15", "4-16", "4-17", "4-20", "4-21"]},
        ];

        dvChartData("line",$(".JS_StudentTeacherAlreadyTrend")[0],"",studentTeacherAlreadyTrendDatas, studentTeacherAlreadyTrendDatas, studentTeacherAlreadyTrendDatas);
    } else if (current == 2){
        /**
         * 体温监测
         * */
        //scroll_Height();
        //test
        var data = [
            {schoolname:"T_哈尔滨市德强学校",classname:"三年二班123",name:"张德新",temp:"36.4",time:"04-11 09:18"},
            {schoolname:"T1_哈尔滨市德强学校",classname:"三年二班123",name:"张德新",temp:"36.4",time:"04-11 09:18"},
            {schoolname:"T2_哈尔滨市德强学校",classname:"三年二班123",name:"张德新",temp:"36.4",time:"04-11 09:18"},
            {schoolname:"T3_哈尔滨市德强学校",classname:"三年二班123",name:"张德新",temp:"36.4",time:"04-11 09:18"},
            {schoolname:"T4_哈尔滨市德强学校",classname:"三年二班123",name:"张德新",temp:"36.4",time:"04-11 09:18"}
        ];
        makeListItems(data);


        var saetras = [
            {value: 3658, name: "自带午饭", trend: [3648, 3636, 3640, 3648, 3636, 3640]},
            {value: 3713, name: "订餐", trend: [3723, 3735, 3731, 3723, 3735, 3731]},
        ];
        dvChartData("pieAndLine",$(".JS_TestChart")[0],"非在校就餐 113 人","", "", saetras);
    } else if (current == 3){
    }
}



function dealThemes(){
    var w=-1;
    if(current<total)
        w=current+1;
    else w=1;
    gotos(w);
}

function gotos(themeid)
{
    var theme = $("#theme-"+themeid);
    if(themeid!=current&&theme.length>0){
        var pre=$("#theme-"+current);
        $("#theme-link-"+current).removeClass("active");
        $("#theme-link-"+themeid).addClass("active");
        pre.addClass( outClass ).on(animEndEventName, function() {
            pre.attr("hidden",1);
            pre.off(animEndEventName);
            pre.removeClass(outClass);
            theme.removeAttr("hidden");

            theme.addClass(inClass).on( animEndEventName, function() {
                theme.off(animEndEventName);
                current=themeid;
                theme.removeClass(inClass);
                //刷新所有echart
                initThemeDataVirtual();


            } );
        } );
    }
}



var charts_JSON = [];

function jsonForArray(objJson,property){
    var array=[];
    for(var item in objJson){
        array.push(objJson[item][property]);
    }
    return array;
}

//切换页面时 echart刷新方法 -- 有问题 待更新 dom对象存入失败
function resetCharts(){
    for(var item in charts_JSON){
        var obj = charts_JSON[item].obj;
        var opt = charts_JSON[item].opt;
        obj = JSON.parse(obj);
        var chartobj = echarts.init(obj);
        chartobj.setOption(opt);
        chartobj.resize()
    }
}



var strs = "";
//数据刷新效果
function makeListItems(datas){
    for (var it in datas) {
        strs += "<li>"+
            "<div class='list-flag'></div>"+
            "<div class='list-textarea'>"+
            "<div class='list-text1'>"+datas[it].schoolname+"</div>"+
            "<div class='list-text2'>"+"  "+datas[it].classname+"-"+datas[it].name+" "+datas[it].temp+"℃（体温正常）"+"</div>"+
            "<div class='list-text3'>"+datas[it].time+"</div>"+
            "</div>"+
            "</li> ";
    }
    scroll_li();
}

function scrollAfterAppends()
{
    var parent = $("#watcher");
    var first = parent.find('li:first');
    var height = first.height();
    var li_length = $("#watcher li").length;
    if (li_length > 2){
        first.animate({height: 0}, 1000, function() {
            //first.css('height', height).appendTo(parent);
            first.remove();
            parent.append(strs);
            strs = "";
        });
    }
}


function randomNums(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * ( maxNum - minNum + 1 ) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

//数字翻牌效果

function increase(objTarget) {
    var objTarget=$("#"+objTarget);

    objTarget.text(parseInt(objTarget.text())+1);
    objTarget.addClass('is-increment-hide');

    setTimeout(function() {
        objTarget.addClass('is-increment-visible');
    }, 100);

    setTimeout(function() {
        objTarget.removeClass('is-increment-hide');
        objTarget.removeClass('is-increment-visible');
    }, 200);
};


function clientSideInclude(id, url) {
    var req = false;
// Safari, Firefox, 及其他非微软浏览器
    if (window.XMLHttpRequest) {
        try {
            req = new XMLHttpRequest();
        } catch (e) {
            req = false;
        }
    } else if (window.ActiveXObject) {
// For Internet Explorer on Windows
        try {
            req = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                req = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                req = false;
            }
        }
    }
    var element = document.getElementById(id);
    if (!element) {
        alert("函数clientSideInclude无法找到id " + id + "。" +
            "你的网页中必须有一个含有这个id的div 或 span 标签。");
        return;
    }
    if (req) {
// 同步请求，等待收到全部内容
        req.open('GET', url, false);
        req.send(null);
        element.innerHTML = req.responseText;
    } else {
        element.innerHTML =
            "对不起，你的浏览器不支持" +
            "XMLHTTPRequest 对象。这个网页的显示要求" +
            "Internet Explorer 5 以上版本, " +
            "或 Firefox 或 Safari 浏览器，也可能会有其他可兼容的浏览器存在。";
    }
}



