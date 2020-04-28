var app = new Vue({
    el: '#app'
});

//主题过渡效果
total = 3,
    current = 1,
    animEndEventNames = {
        'WebkitAnimation': 'webkitAnimationEnd',
        'OAnimation': 'oAnimationEnd',
        'msAnimation': 'MSAnimationEnd',
        'animation': 'animationend'
    },
    animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];

var outClass = "pt-page-moveToLeft";
var inClass = "pt-page-moveFromRight";

function goto(themeid) {
    var theme = $("#theme-" + themeid);
    if (themeid != current && theme.length > 0) {
        var pre = $("#theme-" + current);
        $("#theme-link-" + current).removeClass("active");
        $("#theme-link-" + themeid).addClass("active");
        pre.addClass(outClass).on(animEndEventName, function () {
            pre.attr("hidden", 1);
            pre.off(animEndEventName);
            pre.removeClass(outClass);
            theme.removeAttr("hidden");

            theme.addClass(inClass).on(animEndEventName, function () {
                theme.off(animEndEventName);
                current = themeid;
                theme.removeClass(inClass);
                initThemeDataVirtual();
                scroll_Height();
            });

        });
    }


}

function dealTheme() {
    var w = -1;
    if (current < total)
        w = current + 1;
    else w = 1;
    goto(w);
}


//数据刷新效果

function makeListItem(schoolname, classname, name, temp, time) {
    return "<li>" +
        "<div class='list-flag'></div>" +

        "<div class='list-textarea'>" +
        "<div class='list-text1'>" + schoolname + "</div>" +
        "<div class='list-text2'>" + "  " + classname + "-" + name + " " + temp + "℃（体温正常）" + "</div>" +
        "<div class='list-text3'>" + time + "</div>" +
        "</div>" +
        "</li> ";


}

function makeListItem(schoolname, classname, name, temp, time, status, flag) {
    return "<li>" +
        "<div class='" + flag + "'></div>" +

        "<div class='list-textarea'>" +
        "<div class='list-text1'>" + schoolname + "</div>" +
        "<div class='list-text2'>" + "  " + classname + "-" + name + " " + temp + "℃（" + status + "）" + "</div>" +
        "<div class='list-text3'>" + time + "</div>" +
        "</div>" +
        "</li> ";
}

function scrollAfterAppend(str) {
    var parent = $("#watcher");
    var first = parent.find('li:first');
    var height = first.height();
    first.animate({height: 0}, 1000, function () {
        //first.css('height', height).appendTo(parent);
        first.remove();
        parent.append(str);
    });

}


function dataFresher() {
    scrollAfterAppend(makeListItem("哈尔滨市德强学校", "三年二班", "张德新", "36.4", "04-11 09:18"));
    increase("today_quality");
    increase("today_shape");
    increase("total_quality");
    increase("total_shape");
    var randomTime = randomNum(1000, 10000);
    // setTimeout(dataFresher,randomTime);

}

function randomNum(minNum, maxNum) {
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

    setTimeout(function () {
        objTarget.addClass('is-increment-visible');
    }, 100);

    setTimeout(function () {
        objTarget.removeClass('is-increment-hide');
        objTarget.removeClass('is-increment-visible');
    }, 200);
};

function initThemeDataVirtual() {
    $("#theme-" + current + " [DataVirtual]").each(function (i, el) {

        var options = $(el).attr("DataVirtual");
        if (!dvMap[options]) {
            var chartobj = echarts.init(el);
            var jsonOption = eval(options);
            chartobj.setOption(jsonOption);
            setTimeout(function () {
                chartobj.setOption(jsonOption, {
                    notMerge: false,
                    lazyUpdate: false,
                    silent: false
                });
            }, 1000);
            dvMap[options] = {domObj: el, jsonOption: jsonOption};
            var doneEvent = $(el).attr("DataVirtualDone");
            if (doneEvent) eval(doneEvent);
        }

    });
    $("#theme-" + current + " [DataVirtualReady]").each(function (i, el) {
        var loadedEvent = $(el).attr("DataVirtualReady");
        if (!dvReady[loadedEvent]) {
            if (loadedEvent) {
                eval(loadedEvent);
                dvReady[loadedEvent] = loadedEvent;
            }
        }


    });
}

function makeSimpleNumberCard(arr, objid) {
    $("#" + objid).empty();
    var str = "";
    for (var it in arr) {
        var obj = arr[it];
        str += "<div class='col-md' style='min-width: 0'>" +
            "<div class='card-num'>" + obj.value + "</div>" +
            "<div class='s-text'>" + obj.name + "</div>" +
            "</div>";
    }
    $("#" + objid).append(str);
}

function makeComplexNumberCard(arr, objid) {
    $("#" + objid).empty();
    var str = "";
    for (var it in arr) {
        var obj = arr[it];
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
    $("#" + objid).append(str);
}

//复学学校信息滚动
function scroll_Height() {
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


//加载所有可视化图表
var dvMap = {};
var dvReady = {};
$(document).ready(function () {

    initThemeDataVirtual();

    dataFresher();
    setInterval(dealTheme, 180000);

});


