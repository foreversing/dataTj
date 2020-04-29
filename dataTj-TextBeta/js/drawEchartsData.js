/**
 * 画echarts
 * solid:实心饼图
 * hollow:空心饼图
 * percent:百分比饼图
 * line:折线图
 * area:面积图
 * doubleGuage:双仪表盘
 * nightingaleRoseDiagram:南丁格尔玫瑰图
 * radar:雷达图
 * scatter:散点图
 * waterPolo:水球图
 * pieAndLine:组合图（饼图+折线） -- have a question
 * dom:存放图形的dom对象
 * title:图形标题
 * legend:图例名称
 * data:图形数据
 * */

function dvChartData(flag, dom, title, legend, xAxis, data) {
    var options;
    if (flag == "solid") {
        options = dvSolidPieChart();
        //饼图标题
        options.title.text = title;
        //图例名称
        options.legend.data = legend;
        //饼图数据
        options.series[0].data = data;

    }else if (flag == "hollow") {
        options = dvHollowPieChart();
        options.series.data = data;

    } else if (flag == "percent") {
        options = dvPercentPieChart();
        options.title.text = data[0].value * 100 + '%'
        options.series[0].data = [{value: data[0].value}, {value: 1 - data[0].value}];

    } else if (flag == "line") {
        //折线图数据
        throughTheData_Line(data);
        options = dvLineChart();
        //折线图标题
        options.title.text = title;
        //图例名称
        options.legend.data = jsonForArray(legend, 'name');
        //折线图x轴
        options.xAxis.data = jsonForArray(xAxis, 'xAxis')[0];

    } else if (flag == "area") {
        options = dvAreaChart();
        //面积图x轴
        options.xAxis.data = xAxis;
        //面积图数据
        options.series.data = data[0].value;

    } else if (flag == "doubleGauge") {
        options = dvDoubleGaugeChart();
        //仪表盘1 名称和数据
        options.series[0].name = data[0].name;
        options.series[0].data = [data[0]];
        //仪表盘2 名称和数据
        options.series[1].name = data[1].name;
        options.series[1].data = [data[1]];

    } else if (flag == "nightingaleRoseDiagram") {
        options = dvNightingaleRoseDiagramChart();
        //玫瑰图标题
        options.title.text = title;
        //玫瑰图图例名称
        options.legend.data = jsonForArray(legend, 'name');
        //玫瑰图数据
        options.series[0].name = title;
        options.series[0].data = data;

    } else if (flag == "radar") {
        //雷达图数据
        throughTheData_Radar(data);
        options = dvRadarChart();
        //雷达图图例名称
        options.legend.data = jsonForArray(legend, 'name');

    } else if (flag == "scatter") {
        //散点图数据 需把数据从json转成数组格式[{},{}] ==> [[],[]]
        throughTheData_Scatter(jsonForArray(data, "value"));
        options = dvScatterChart();
        //散点图图例名称
        options.legend.data = jsonForArray(legend, "name");

    } else if (flag == "waterPolo") {
        //json中取值 水球图只需要单数据
        var waterPoloDatas = data[0].value;
        options = dvWaterPoloChart(waterPoloDatas);
    } else if (flag == "pieAndLine") {
        var domProp = $(dom).attr("dvGroupChart");
        //该标签应用自定义属性
        options = dvPieAndLineChart_pie();
        //饼图标题
        //options.title.text = title;
        //饼图数据
        options.series[0].name = "学生就餐类别统计";
        options.series[0].data = data;
        /**
         * .饼图{
         *    width: 157px;
         *    height: 140px;
         *  }
         */
        //折线图
        dvPieAndLineChart_line(dom, domProp, options, data);
    }


    // charts_JSON.push({obj : dom, opt : eval(options)});
    // console.log(JSON.stringify(charts_JSON));
    // console.log("obj:" + JSON.stringify(charts_JSON[0].obj));
    var chartDom = echarts.init(dom);
    chartDom.setOption(options);
}


/**
 * 画概要信息
 * $dom:jquery对象
 * data:传入的json数据
 * */
function dvSummaryInfo($dom, data) {
    $dom.empty();
    var str = "";
    for (var it in data) {
        var obj = data[it];
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
    $dom.append(str);
}


/**
 * 画图片li信息
 * $dom:jquery对象
 * data:传入的json数据
 * */
function dvSpecialItems($dom, data) {
    $dom.empty();
    var str = "";
    for (var it in data) {
        var obj = data[it];
        str += "<div class='col-md sportItem' style='min-width: 0'>" +
                "<div class='sportItemLegend'>" +
                "<img src='" + obj.img + "'>" +
                "</div>" +
                "<div class='imageTextDetail'>" + obj.name + "</div>" +
                "</div>";
    }
    $dom.append(str);
}


/**
 * 画滚动列表内容
 * 添加class = 'JS_Scroll_H'
 * 备注:父节点需要有高度
 *      滚动内容为添加class的div中的内容
 *      有父节点，子节点为滚动内容
 * */
function dvScroll_Height() {
    $(".JS_Scroll_H").each(function (i, el) {
        var li = $(this).parent();
        var li_h = $(li).height();
        var el_h = $(this).height();
        if (li_h < el_h) {
            el.innerHTML += el.innerHTML;
            setInterval(function () {
                if (el_h <= $(li)[0].scrollTop) {
                    $(li)[0].scrollTop -= el_h;
                } else {
                    $(li)[0].scrollTop++;
                }
            }, 30);
        }
    });
}

/**
 * 画滚动列表
 * 页面初始化调用
 * 先回显所有li数据
 * makeListItem为每次新增的数据
 * 获取数据后调用该方法 data.length > 3
 * */
//数据刷新效果
function dvMakeListItems(datas){
    var strs = "";
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
    var parent = $("#watcher");
    parent.children().remove();
    parent.append(strs);
    setTimeout(function () {
        dvScroll_li();
    },1000);
}

function dvScroll_li(){
    scrollAfterAppends();
    increase("today_quality");
    increase("today_shape");
    increase("total_quality");
    increase("total_shape");
    var randomTime=randomNums(1000,10000);
    setTimeout(dvScroll_li,randomTime);
}

/**
 * 画时序图
 * $dom:传入的id timeline
 * data:传入的数据
 * 模版
 * <div id="timeline">
 *  <ul id="dates">
 *  </ul>
 *  <ul id="issues">
 *  </ul>
 * </div>
 * */
function dvMakeTimeLine($dom,data) {
    var dateStr = "";
    var issueStr = "";
    var i = 0;
    for (var it in data) {
        var obj = data[it];
        dateStr += "<li><a href='#tltl-" + i + "'>" + obj.date + "</a></li>";
        issueStr += "<li id='tltl-" + i + "'><h1>" + obj.title + "</h1><p>" + obj.content + "</p></li>";
        i++;
    }

    $dom.children("ul:first-child").html(dateStr);
    $dom.children("ul:last-child").html(issueStr);

    $().timelinr({
        autoPlay: 'true',
        autoPlayDirection: 'forward',
        startAt: 1,
        autoPlayPause: 10000
    })
}

/**
 * 画上报列表信息
 * */
function dvInfoList($dom,data){
    $dom.empty();
    for (let i = 0; i < data.length; i++) {
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
        var str = "<tr>";
        if (i > 2) {
            str += "<td>" + (i + 1) + "</td>";
        } else {
            str += "<td class='prize'><img src='" + img + "'></td>";
        }
        str += "<td>" + data[i].schName + "</td>" +
               "<td>" + data[i].status + "</td>" +
               "<td>" + data[i].reportTime + "</td>" +
               "</tr>";
        $dom.append(str);
    }
}

/**
 * echart 刷新方法
 * */
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