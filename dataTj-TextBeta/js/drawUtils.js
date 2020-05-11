const reqUrl = "http://192.168.0.155:9090/";
//页面初始化
function initThemeDataVirtual() {
	baseDataView();
	getDatasForAjax();
}


/**
 * read me
 * 注意事项：
 * 1.接口数据格式
 * 2.obj的值与html中DataVirtual属性的值匹配
 * 3.返回数据中title可已为空
 * */

//ajax获取数据部分
function getDatasForAjax() {
	//ajax 返回数据
	var jsonList = [];
	if (current == 1) {
		jsonList = [{
				obj: "dvStudentTypeRate",
				type: "solid",
				title: "➤  走读/住宿学生占比",
				val: [{
						name: '走读学生',
						value: 5288,
						selected: true
					},
					{
						name: '住宿学生',
						value: 2156,
						selected: false
					}
				]
			},
			{
				obj: "dvDivideTrend",
				type: "line",
				title: "师生传染病发展趋势",
				val: [{
						name: '教职工',
						value: [110, 112, 121, 154, 134, 120, 114, 121, 154, 134, 120, 114],
						xAxis: ["4-7", "4-8", "4-9", "4-10", "4-13", "4-14", "4-15", "4-16", "4-17", "4-20", "4-21"]
					},
					{
						name: '学生',
						value: [130, 112, 114, 134, 124, 130, 110, 114, 134, 124, 130, 110],
						xAxis: ["4-7", "4-8", "4-9", "4-10", "4-13", "4-14", "4-15", "4-16", "4-17", "4-20", "4-21"]
					}
				]
			},
			{
				obj: "dvStudentTeacherAlreadyTrend",
				type: "line",
				title: "师生传染病发展趋势",
				val: [{
						name: '教职工',
						value: [0.98, 0.97, 0.98, 0.96, 0.94, 0.98, 0.96, 0.99, 0.95, 0.93, 0.99, 0.98],
						xAxis: ["4-7", "4-8", "4-9", "4-10", "4-13", "4-14", "4-15", "4-16", "4-17", "4-20", "4-21"]
					},
					{
						name: '学生',
						value: [0.98, 0.99, 0.98, 0.98, 0.99, 0.96, 0.98, 0.88, 0.96, 0.99, 0.88, 0.97],
						xAxis: ["4-7", "4-8", "4-9", "4-10", "4-13", "4-14", "4-15", "4-16", "4-17", "4-20", "4-21"]
					}
				]
			},
			{
				obj: "dvStudentAbsentBySick",
				type: "area",
				title: "",
				val: [{
					name: '',
					value: [14, 9, 12, 14, 11, 9, 6, 8, 7, 6, 5, 4],
					xAxis: ["4-7", "4-8", "4-9", "4-10", "4-13", "4-14", "4-15", "4-16", "4-17", "4-20", "4-21"]
				}]
			},
			{
				obj: "dvTodayStudentAbsentTypeRate",
				type: "hollow",
				title: "",
				val: [{
						name: '因病',
						value: 6
					},
					{
						name: '因事',
						value: 2
					},
					{
						name: '未返哈',
						value: 1
					},
				]
			},
			{
				obj: "dvTodayTeacherAbsentTypeRate",
				type: "hollow",
				title: "",
				val: [{
						name: '因病',
						value: 1
					},
					{
						name: '因事',
						value: 2
					},
					{
						name: '未返哈',
						value: 1
					}
				]
			},
			{
				obj: "dvStudentAlreadyRate",
				type: "percent",
				title: "",
				val: [{
					name: '',
					value: 0.97
				}, ]
			},
			{
				obj: "dvTeacherAlreadyRate",
				type: "percent",
				title: "",
				val: [{
					name: '',
					value: 0.67
				}, ]
			},
			{
				obj: "dvStuAttendance",
				type: "",
				title: "",
				val: [{
						name: '待复学',
						value: 28761
					},
					{
						name: '实际出勤',
						value: 7484
					}
				]
			},
			{
				obj: "dvSickSituation",
				type: "",
				title: "",
				val: [{
						name: '学生隔离',
						value: 11
					},
					{
						name: '教师隔离',
						value: 4
					}
				]
			},
			{
				obj: "dvStudentSickSituation",
				type: "",
				title: "",
				val: [{
						name: '隔离',
						value: 3
					},
					{
						name: '解除',
						value: 2
					}
				]
			},
			{
				obj: "dvTeacherSickSituation",
				type: "",
				title: "",
				val: [{
						name: '隔离',
						value: 5
					},
					{
						name: '解除',
						value: 1
					}
				]
			},
			{
				obj: "dvStuAttendance",
				type: "",
				title: "",
				val: [{
						name: '待复学',
						value: 28761
					},
					{
						name: '实际出勤',
						value: 7484
					}
				]
			},
			{
				obj: "dvStuAbsent",
				type: "",
				title: "",
				val: [{
						name: '因病',
						value: 6
					},
					{
						name: '因事',
						value: 2
					},
					{
						name: '未返哈',
						value: 2
					}
				]
			},
			{
				obj: "dvTeacherAttendance",
				type: "",
				title: "",
				val: [{
						name: '教师应出',
						value: 68
					},
					{
						name: '教师实出',
						value: 66
					},
					{
						name: '工作人员出勤',
						value: 31
					}
				]
			},
			{
				obj: "dvTeacherAbsent",
				type: "",
				title: "",
				val: [{
						name: '因病',
						value: 2
					},
					{
						name: '因事',
						value: 2
					},
					{
						name: '未返哈',
						value: 1
					}
				]
			},
		];

	} else if (current == 2) {
		jsonList = [
			/**
			 * 体温监测
			 * */

			//体温异常累计
			{
				obj: "dvAbnormalTemperature",
				type: "",
				title: "",
				val: [{
						name: '学生',
						value: 154
					},
					{
						name: '教师',
						value: 38
					}
				]
			},
			//体温监测
			{
				obj: "dvTemperatureWatch",
				type: "",
				title: "",
				val: [{
						name: '学生正常',
						value: 7474
					},
					{
						name: '学生异常',
						value: 10
					},
					{
						name: '教职工正常',
						value: 66
					},
					{
						name: '教职工异常',
						value: 2
					}
				]
			},
			//监测动态-数据
			{
				obj: "dvMonitorDynamic",
				type: "",
				title: "",
				val: [{
						schoolname: "T_哈尔滨市德强学校",
						classname: "三年二班123",
						name: "张德新",
						temp: "36.4",
						time: "04-11 09:18"
					},
					{
						schoolname: "T1_哈尔滨市德强学校",
						classname: "三年二班123",
						name: "张德新",
						temp: "36.4",
						time: "04-11 09:18"
					},
					{
						schoolname: "T2_哈尔滨市德强学校",
						classname: "三年二班123",
						name: "张德新",
						temp: "36.4",
						time: "04-11 09:18"
					},
					{
						schoolname: "T3_哈尔滨市德强学校",
						classname: "三年二班123",
						name: "张德新",
						temp: "36.4",
						time: "04-11 09:18"
					},
					{
						schoolname: "T4_哈尔滨市德强学校",
						classname: "三年二班123",
						name: "张德新",
						temp: "36.4",
						time: "04-11 09:18"
					}
				]
			},
			//师生体温异常发展趋势
			{
				obj: "dvStudentTeacherAbnormalTemperatureTrend",
				type: "line",
				title: "",
				val: [{
						name: '教职工',
						value: [28, 33, 36, 35, 38, 37, 34, 36, 34, 32, 29, 29],
						xAxis: ["4-7", "4-8", "4-9", "4-10", "4-13", "4-14", "4-15", "4-16", "4-17", "4-20", "4-21"]
					},
					{
						name: '学生',
						value: [130, 112, 114, 154, 124, 130, 110, 114, 134, 124, 130, 110],
						xAxis: ["4-7", "4-8", "4-9", "4-10", "4-13", "4-14", "4-15", "4-16", "4-17", "4-20", "4-21"]
					}
				]
			},
			//学生就餐情况
			{
				obj: "dvStudentLunch",
				type: "pieAndLine",
				title: "非在校就餐100人",
				val: [{
						name: "自带午饭",
						value: 3658,
						trend: [3648, 3636, 3640, 3648, 3636, 3640],
						otherCount: 100
					},
					{
						name: "订餐",
						value: 3713,
						trend: [3723, 3735, 3731, 3723, 3735, 3731],
						otherCount: 165
					}
				]
			},
			//学生出行可视化
			{
				obj: "dvStudentTransportType",
				type: "pieAndLine",
				title: "",
				val: [{
						name: "私家车",
						value: 2568,
						trend: [33, 44, 35, 35, 35, 37]
					},
					{
						name: "步行",
						value: 1662,
						trend: [44, 32, 43, 21, 3, 21]
					},
					{
						name: "公交出行",
						value: 3254,
						trend: [44, 32, 43, 21, 3, 21]
					}
				]
			},
			//教职工出行可视化
			{
				obj: "dvTeacherTransportType",
				type: "pieAndLine",
				title: "",
				val: [{
						name: "私家车",
						value: 24,
						trend: [31, 11, 21, 35, 35, 37]
					},
					{
						name: "步行",
						value: 9,
						trend: [41, 32, 76, 21, 63, 21]
					},
					{
						name: "公交出行",
						value: 35,
						trend: [41, 23, 49, 21, 13, 21]
					}
				]
			},
			//全面复工复学
			{
				obj: "dvRecoveryStudentTeacher",
				type: "",
				title: "",
				val: [{
						name: '待复学学生',
						value: 28761
					},
					{
						name: '待复工教职工',
						value: 476
					}
				]
			},
			//复工复学后教职工情况
			{
				obj: "dvIncreaseDivideRecoveryTrend",
				type: "line",
				title: "",
				val: [{
						name: '新增隔离教职工',
						value: [2, 3, 1, 1, 2, 2, 1, 3, 4, 2, 1, 2],
						xAxis: ["4-7", "4-8", "4-9", "4-10", "4-13", "4-14", "4-15", "4-16", "4-17", "4-20", "4-21"]
					},
					{
						name: '新增隔离学生',
						value: [5, 6, 4, 4, 5, 7, 6, 3, 5, 4, 2, 3],
						xAxis: ["4-7", "4-8", "4-9", "4-10", "4-13", "4-14", "4-15", "4-16", "4-17", "4-20", "4-21"]
					},
					{
						name: '新增复学学生',
						value: [110, 112, 121, 154, 198, 170, 124, 165, 175, 182, 192, 222],
						xAxis: ["4-7", "4-8", "4-9", "4-10", "4-13", "4-14", "4-15", "4-16", "4-17", "4-20", "4-21"]
					},
					{
						name: '新增复工教职工',
						value: [20, 30, 25, 38, 45, 56, 20, 35, 36, 27, 35, 65],
						xAxis: ["4-7", "4-8", "4-9", "4-10", "4-13", "4-14", "4-15", "4-16", "4-17", "4-20", "4-21"]
					}
				]
			},
			//复工学校信息
			// {
			// 	obj: "dvd",
			// 	type: "",
			// 	title: "",
			// 	val: [
			// 	]
			// },

		];
	} else if (current == 3) {
		jsonList = [
			//数据上报率
			{
				obj: "dvDataUploadedRate",
				type: "percent",
				title: "",
				val: [{
					name: '',
						value: 0.65
					}
				]
			},
			//数据综合情况
			{
				obj: "dvDataUploadedComprehensive",
				type: "",
				title: "",
				val: [{
						name: '尚未上报学校',
						value: 3
					},
					{
						name: '已上报学校',
						value: 46
					},
					{
						name: '完成上报学校',
						value: 36
					}
				]
			},
			//时序图
			{
				obj: "dvTimeLine",
				type: "",
				title: "",
				val: [{
					date: "04/7",
						title: "共上报防疫数据196条,测温数据29936条",
						content: "学生病假2例，事假2例，体温异常10例(返哈隔离1人，隔离1人)，最高温度38.1"
					},
					{
						date: "04/8",
						title: "共上报防疫数据398条,测温数据37406条",
						content: "学生病假2例，事假2例，体温异常10例(返哈隔离1人，隔离1人)，最高温度37.6"
					},
					{
						date: "04/9",
						title: "共上报防疫数据586条,测温数据44879条",
						content: "学生病假2例，事假2例，体温异常10例(返哈隔离1人，隔离1人)，最高温度37.8"
					},
					{
						date: "04/10",
						title: "共上报防疫数据989条,测温数据52360条",
						content: "学生病假2例，事假2例，体温异常10例(返哈隔离1人，隔离1人)，最高温度37.9"
					}
				]
			},
			//学校列表信息
			{
				obj: "dvReportSchoolList",
				type: "",
				title: "",
				val: [{
						schName: "哈尔滨市剑桥第三中学校",
						status: "未上报",
						reportTime: "",
						"sort": 3
					},
					{
						schName: "哈尔滨市第六十四中学校",
						status: "未上报",
						reportTime: "",
						"sort": 3
					},
					{
						schName: "哈尔滨市第一二二中学校",
						status: "未上报",
						reportTime: "",
						"sort": 3
					},
					{
						schName: "哈尔滨市第四十六中学校",
						status: "未上报",
						reportTime: "",
						"sort": 3
					},
					{
						schName: "哈尔滨市东方红中学校",
						status: "未上报",
						reportTime: "",
						"sort": 3
					},
					{
						schName: "哈尔滨市第十一中学校",
						status: "未上报",
						reportTime: "",
						"sort": 3
					},
					{
						schName: "哈尔滨市第六中学校",
						status: "未上报",
						reportTime: "",
						"sort": 3
					},
					{
						schName: "哈尔滨市朝鲜族第一中学校",
						status: "未上报",
						reportTime: "",
						"sort": 3
					},
					{
						schName: "哈尔滨市现代应用技术中等职业学校",
						status: "未上报",
						reportTime: "",
						"sort": 3
					},
					{
						schName: "哈尔滨德强学校",
						status: "未上报",
						reportTime: "",
						"sort": 3
					},
					{
						schName: "哈尔滨市第五十九中学校",
						status: "未上报",
						reportTime: "",
						"sort": 3
					},
					{
						schName: "哈尔滨市第九中学",
						status: "未上报",
						reportTime: "",
						"sort": 3
					}
				]
			},
			//测温卡口
			{
				obj: "dvCamerLists",
				type: "",
				title: "",
				val: [{
						"cam_text": "正门口1",
						"preimg_url": "http://longxuetong.com:8030/uploadFiles/uploadImgs/channel85.jpg",
						"action_url": "http://longxuetong.com:8030/monitor.do?MENU_ID=85"
					},
					{
						"cam_text": "正门口2",
						"preimg_url": "http://longxuetong.com:8030/uploadFiles/uploadImgs/channel86.jpg",
						"action_url": "http://longxuetong.com:8030/monitor.do?MENU_ID=86"
					},
					{
						"cam_text": "正门左侧1",
						"preimg_url": "http://longxuetong.com:8030/uploadFiles/uploadImgs/channel87.jpg",
						"action_url": "http://longxuetong.com:8030/monitor.do?MENU_ID=87"
					},
					{
						"cam_text": "正门左侧3",
						"preimg_url": "http://longxuetong.com:8030/uploadFiles/uploadImgs/channel88.jpg",
						"action_url": "http://longxuetong.com:8030/monitor.do?MENU_ID=88"
					},
					{
						"cam_text": "正门南侧1",
						"preimg_url": "http://longxuetong.com:8030/uploadFiles/uploadImgs/channel89.jpg",
						"action_url": "http://longxuetong.com:8030/monitor.do?MENU_ID=89"
					},
					{
						"cam_text": "正门南侧1",
						"preimg_url": "http://longxuetong.com:8030/uploadFiles/uploadImgs/channel90.jpg",
						"action_url": "http://longxuetong.com:8030/monitor.do?MENU_ID=90"
					},
					{
						"cam_text": "正门南侧二",
						"preimg_url": "http://longxuetong.com:8030/uploadFiles/uploadImgs/channel91.jpg",
						"action_url": "http://longxuetong.com:8030/monitor.do?MENU_ID=91"
					},
					{
						"cam_text": "停车场4",
						"preimg_url": "http://longxuetong.com:8030/uploadFiles/uploadImgs/channel92.jpg",
						"action_url": "http://longxuetong.com:8030/monitor.do?MENU_ID=92"
					},
					{
						"cam_text": "停车场3",
						"preimg_url": "http://longxuetong.com:8030/uploadFiles/uploadImgs/channel93.jpg",
						"action_url": "http://longxuetong.com:8030/monitor.do?MENU_ID=93"
					},
					{
						"cam_text": "停车场2",
						"preimg_url": "http://longxuetong.com:8030/uploadFiles/uploadImgs/channel94.jpg",
						"action_url": "http://longxuetong.com:8030/monitor.do?MENU_ID=94"
					},
					{
						"cam_text": "停车场1",
						"preimg_url": "http://longxuetong.com:8030/uploadFiles/uploadImgs/channel95.jpg",
						"action_url": "http://longxuetong.com:8030/monitor.do?MENU_ID=95"
					},
					{
						"cam_text": "正门口右侧",
						"preimg_url": "http://longxuetong.com:8030/uploadFiles/uploadImgs/channel96.jpg",
						"action_url": "http://longxuetong.com:8030/monitor.do?MENU_ID=96"
					}
				]
			}
		]
	}

	dyRevealCom(jsonList);


	//复学学校信息展现
	// dvSchoolInfos(datassss);
	//复学学校信息滚动
	dvScroll_Height($(".JS_Scroll_H"));
}

//页面展现部分-公共方法
function dyRevealCom(jsonList) {
	//获取所有动态填充div
	$("#theme-" + current + " [DataVirtual]").each(function(i, el) {
		var options = $(el).attr("DataVirtual");
		if (options != null) {
			if (jsonList != null && jsonList.length > 0) {
				for (var it in jsonList) {
					var item = jsonList[it];
					if (item.obj == options) {
						if (item.type != null && item.type != "") {
							//表明获取的数据和页面div匹配
							dvChartData(item.type, el, item.title, item.val, item.val, item.val);
						} else {
							
							//单独添加方法
							if (item.obj == "dvMonitorDynamic") {
								//监测动态-展现
								dvMakeListItems(item.val);
							}else if(item.obj == "dvTimeLine"){
								dvMakeTimeLine($(el), item.val);
							}else if(item.obj == "dvReportSchoolList"){
								//列表信息
								dvInfoList($(el), item.val);
							}else if(item.obj == "dvCamerLists"){
								//测温卡口
								dvTemperatureImgInfos($(el), item.val);
							}else {
								//公共展示方法
								dvSummaryInfo($(el), item.val);
							}
							
						}
					}
				}
			} else {
				console.error("接口返回的值为Null，请联系管理员！！！");
			}
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
		success: function(data) {
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

		},
		error: function(e) {}
	});

}

function dealThemes() {
	var w = -1;
	if (current < total)
		w = current + 1;
	else w = 1;
	gotos(w);
}

function gotos(themeid) {
	var theme = $("#theme-" + themeid);
	if (themeid != current && theme.length > 0) {
		var pre = $("#theme-" + current);
		$("#theme-link-" + current).removeClass("active");
		$("#theme-link-" + themeid).addClass("active");
		pre.addClass(outClass).on(animEndEventName, function() {
			pre.attr("hidden", 1);
			pre.off(animEndEventName);
			pre.removeClass(outClass);
			theme.removeAttr("hidden");

			theme.addClass(inClass).on(animEndEventName, function() {
				theme.off(animEndEventName);
				current = themeid;
				theme.removeClass(inClass);
				//刷新所有echart
				initThemeDataVirtual();
			});
		});
	}
}







function jsonForArray(objJson, property) {
	var array = [];
	for (var item in objJson) {
		array.push(objJson[item][property]);
	}
	return array;
}

function scrollAfterAppends() {
	var parent = $("#watcher");
	var first = parent.find('li:first');
	var height = first.height();
	var li_length = $("#watcher li").length;
	if (li_length > 2) {
		first.animate({
			height: 0
		}, 1000, function() {
			first.remove();
		});
	}
}

function randomNums(minNum, maxNum) {
	switch (arguments.length) {
		case 1:
			return parseInt(Math.random() * minNum + 1, 10);
			break;
		case 2:
			return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
			break;
		default:
			return 0;
			break;
	}
}

//数字翻牌效果
function increase(objTarget) {
	var objTarget = $("#" + objTarget);

	objTarget.text(parseInt(objTarget.text()) + 1);
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
