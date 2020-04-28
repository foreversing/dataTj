function makeLegendFromData(objArr,property){
    var legend=[];
    for(var item in objArr){
        legend.push(objArr[item][property]);
    }
    return legend;
}
///////datas-----------------------------datas------------///////

var meanHeightAndweight={
    height:129,weight:73
}

var dvMeanHeightAndweight  = {
    series: [
      {
        name: '平均身高',
        type: 'gauge',
        data: [{value: meanHeightAndweight.height, name: '平均身高'}],
        radius: '70%',
        center: ['24%', '53%'],
        min: 70,
        max: 200,
        splitNumber:4,
    
        axisLine: {
            show: true,
            lineStyle: {
                width:8,
              color: [
                [1,new echarts.graphic.LinearGradient(0, 0, 1, 0, [
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
            show:false   
          
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
          formatter:'{value} cm',
          fontSize: 24,
          color:'#fff',
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
      },{
        name: '平均体重',
        type: 'gauge',
        data: [{value: meanHeightAndweight.weight, name: '平均体重'}],
        radius: '70%',
        center: ['76%', '53%'],
        min: 40,
        max: 220,
        splitNumber:4,
    
        axisLine: {
            show: true,
            lineStyle: {
                width:8,
              color: [
                [1,new echarts.graphic.LinearGradient(0, 0, 1, 0, [
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
            show:false            
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
            formatter:'{value} 斤',
            fontSize: 24,
            color:'#fff',
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

var monitorCoverRate=[
    {value:0.73, name:'已监测',selected:true},
    {value:0.27, name:'未监测',selected:false},
];

var dvMonitorCoverRate={
    legend: {
        orient: 'horizontal',
        bottom: '0px',
        itemGap:23,
        padding:15,
        itemWidth:15,
        itemHeight:15,
        textStyle:{
            color:'#8ba3be',
            fontSize:13
        },
        data: makeLegendFromData(monitorCoverRate,"name"),
        formatter: function(name){
            for (var item in monitorCoverRate) {
                if (monitorCoverRate[item].name == name) {
                    return name+" "+monitorCoverRate[item].value*100+"%";
                }
            }
            return "";
        }
    },
    color:[ '#f9b725','#0877db'],
    series : [
        {
            name: '监测覆盖率',
            type: 'pie',
            radius : '88%',
            center: ['48%', '48%'],
            data:monitorCoverRate,
            label:{show:false},
        }
    ]
};

var growthAbnormal=[
    
    {value:5, name:'营养不良'},
    {value:10, name:'超重'},
    {value:40, name:'营养过剩'},
    {value:40, name:'视力异常'},
    {value:30, name:'驼背'},
    {value:40, name:'其他'}
];

var dvGrowthAbnormal={
    title : {
        text: '发育异常',
        textStyle:{
            color:'#fff'
        },
        x:'center',
        y:'center'
    },
    color:[ '#0179e5','#35d15f','#00c7fe','#8a01e0','#f3960d','#5e55ff'],
    legend: {
        x : 'center',
        y : 'bottom',
        textStyle:{
            color:'#8ba3be',
            fontSize:11
        },
        width:'332',
        align:'left',
        itemWidth:15,
        itemHeight:15,
        data: makeLegendFromData(growthAbnormal,"name"),
        formatter: function(name){
            for (var item in growthAbnormal) {
                if (growthAbnormal[item].name == name) {
                    return name+"("+growthAbnormal[item].value+")";
                }
            }
            return "";
        }
    },
    series : [
        {
            name:'半径模式',
            type:'pie',
            radius : [55, 118],
            center : ['48%', '48%'],
            roseType : 'radius',
            label: {
                show: false
            },
            data:growthAbnormal
        }
    ]
};

var standardReachingRate = 0.30;
var dvStandardReachingRate = {
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
                fontSize:25
            }
        }]
    }],
    series: [{
        type: 'liquidFill',
        radius: '84%',
        center: ['50%', '50%'],
        data: [standardReachingRate,standardReachingRate],
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
                shadowBlur:0,
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

 
 



var comprehensiveRadar=[
    { 
        value: [96, 56, 88, 46, 53, 29],
        name: '本校'
    },{ 
        value: [44, 55, 66, 22, 15, 56],
        name: '国家平均'
    }
];
var comprehensiveRadarColors=['#4A99FF','#4BFFFC'];
var dvComprehensiveRadar = {
    color: comprehensiveRadarColors,
    legend: {
        orient:'horizontal',
        data: makeLegendFromData(comprehensiveRadar,"name"),
        bottom:35,
        right:40,
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
        indicator:  [{
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
                shadowColor:'#ffff',
                shadowColor:'#ffff',
                shadowBlur:20
            }
        },
        splitLine: {
            lineStyle: {
                color: '#0e4765', 
                width: 1,
                shadowColor:'#ffff',
                shadowBlur:20
            }
        },
    },
    series: [{
        type: 'radar',
        symbolSize: 8,
        data: (function(){
            var dataArr=[];
            for(var it in comprehensiveRadar){      
                var thisobj=comprehensiveRadar[it];
                var thiscolor=comprehensiveRadarColors[it];
                var obj={
                    value:thisobj.value,
                    name:thisobj.name,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                color: thiscolor,
                            },
                            shadowColor:thiscolor,
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
                dataArr.push(obj);
            }
            return dataArr;

        })()
    }]
};





var everyGradeWeightStandardReachingRate= [
    [
        {value:335,name:"一年级"},
        {value:310,name:"二年级"},
        {value:234,name:"三年级"},
        {value:154,name:"四年级"},
        {value:335,name:"五年级"},
        {value:335,name:"六年级"}
     ],
     [
        {value:335,name:"一年级"},
        {value:310,name:"二年级"},
        {value:234,name:"三年级"},
        {value:154,name:"四年级"},
        {value:335,name:"五年级"},
        {value:335,name:"六年级"}
     ]
 ];


var dvEveryGradeWeightStandardReachingRate = {
    title :[{
        text: '男生体重\n达标占比',
        textStyle:{
            color:'#fff',
            fontSize:17,
            lineHeight:21
        },
        x:'15%',
        y:'39%'
    },
    {
        text: '女生体重\n达标占比',
        textStyle:{
            color:'#fff',
            fontSize:17,
            lineHeight:21
        },
        x:'57%',
        y:'39%'
    }],
    color:["#ea6c46","#fbb721","#0e75d7","#ee9824","#55df60","#5ddedd"],
    legend: {
        orient: 'vertical',
        right:'0',
        align:'left',
        top:'middle',
        textStyle: {
            color:'#8ba3be'
        },
        itemWidth:15,
        itemHeight:15,
    },
    series: [{
            name:'男生体重占比',
            type:'pie',
            center: ['22%', '51%'],
            radius: ['58%', '85%'],
            avoidLabelOverlap: false,
            label: {
                show:false
            },
            data:everyGradeWeightStandardReachingRate[0]
        },
        {
            name:'女生体重占比',
            type:'pie',
            center: ['64%', '51%'],
            radius: ['58%', '85%'],
            avoidLabelOverlap: false,
            label: {
                show:false
            },
            data:everyGradeWeightStandardReachingRate[1]
            }
    ]
};


var everyGradeHeightStandardReachingRate= [
    [
        {value:335,name:"一年级"},
        {value:310,name:"二年级"},
        {value:234,name:"三年级"},
        {value:154,name:"四年级"},
        {value:335,name:"五年级"},
        {value:335,name:"六年级"}
     ],
     [
        {value:335,name:"一年级"},
        {value:310,name:"二年级"},
        {value:234,name:"三年级"},
        {value:154,name:"四年级"},
        {value:335,name:"五年级"},
        {value:335,name:"六年级"}
     ]
 ];


var dvEveryGradeHeightStandardReachingRate = {
    title :[{
        text: '男生身高\n达标占比',
        textStyle:{
            color:'#fff',
            fontSize:17,
            lineHeight:21
        },
        x:'15%',
        y:'39%'
    },
    {
        text: '女生身高\n达标占比',
        textStyle:{
            color:'#fff',
            fontSize:17,
            lineHeight:21
        },
        x:'57%',
        y:'39%'
    }],
    color:["#ea6c46","#fbb721","#0e75d7","#ee9824","#55df60","#5ddedd"],
    legend: {
        orient: 'vertical',
        right:'0',
        align:'left',
        top:'middle',
        textStyle: {
            color:'#8ba3be'
        },
        itemWidth:15,
        itemHeight:15,
    },
    series: [{
            name:'男生身高达标占比',
            type:'pie',
            center: ['22%', '51%'],
            radius: ['58%', '85%'],
            avoidLabelOverlap: false,
            label: {
                show:false
            },
            data:everyGradeHeightStandardReachingRate[0]
        },
        {
            name:'女生身高达标占比',
            type:'pie',
            center: ['64%', '51%'],
            radius: ['58%', '85%'],
            avoidLabelOverlap: false,
            label: {
                show:false
            },
            data:everyGradeHeightStandardReachingRate[1]
            }
    ]
};


var heightAndWeightScatter=[
    [
        [161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
        [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
        [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0],
        [147.2, 49.8], [168.2, 49.2], [175.0, 73.2], [157.0, 47.8], [167.6, 68.8],
        [159.5, 50.6], [175.0, 82.5], [166.8, 57.2], [176.5, 87.8], [170.2, 72.8],
        [174.0, 54.5], [173.0, 59.8], [179.9, 67.3], [170.5, 67.8], [160.0, 47.0],
        [154.4, 46.2], [162.0, 55.0], [176.5, 83.0], [160.0, 54.4], [152.0, 45.8],
        [162.1, 53.6], [170.0, 73.2], [160.2, 52.1], [161.3, 67.9], [166.4, 56.6],
        [168.9, 62.3], [163.8, 58.5], [167.6, 54.5], [160.0, 50.2], [161.3, 60.3],
        [167.6, 58.3], [165.1, 56.2], [160.0, 50.2], [170.0, 72.9], [157.5, 59.8],
        [167.6, 61.0], [160.7, 69.1], [163.2, 55.9], [152.4, 46.5], [157.5, 54.3],
        [168.3, 54.8], [180.3, 60.7], [165.5, 60.0], [165.0, 62.0], [164.5, 60.3],
        [156.0, 52.7], [160.0, 74.3], [163.0, 62.0], [165.7, 73.1], [161.0, 80.0],
        [162.0, 54.7], [166.0, 53.2], [174.0, 75.7], [172.7, 61.1], [167.6, 55.7],
        [151.1, 48.7], [164.5, 52.3], [163.5, 50.0], [152.0, 59.3], [169.0, 62.5],
        [164.0, 55.7], [161.2, 54.8], [155.0, 45.9], [170.0, 70.6], [176.2, 67.2],
        [170.0, 69.4], [162.5, 58.2], [170.3, 64.8], [164.1, 71.6], [169.5, 52.8],
        [163.2, 59.8], [154.5, 49.0], [159.8, 50.0], [173.2, 69.2], [170.0, 55.9],
        [161.4, 63.4], [169.0, 58.2], [166.2, 58.6], [159.4, 45.7], [162.5, 52.2],
        [159.0, 48.6], [162.8, 57.8], [159.0, 55.6], [179.8, 66.8], [162.9, 59.4],
        [161.0, 53.6], [151.1, 73.2], [168.2, 53.4], [168.9, 69.0], [173.2, 58.4],
        [171.8, 56.2], [178.0, 70.6], [164.3, 59.8], [163.0, 72.0], [168.5, 65.2],
        [166.8, 56.6], [172.7, 105.2], [163.5, 51.8], [169.4, 63.4], [167.8, 59.0],
        [159.5, 47.6], [167.6, 63.0], [161.2, 55.2], [160.0, 45.0], [163.2, 54.0],
        [162.2, 50.2], [161.3, 60.2], [149.5, 44.8], [157.5, 58.8], [163.2, 56.4],
        [172.7, 62.0], [155.0, 49.2], [156.5, 67.2], [164.0, 53.8], [160.9, 54.4],
        [162.8, 58.0], [167.0, 59.8], [160.0, 54.8], [160.0, 43.2], [168.9, 60.5],
        [158.2, 46.4], [156.0, 64.4], [160.0, 48.8], [167.1, 62.2], [158.0, 55.5],
        [167.6, 57.8], [156.0, 54.6], [162.1, 59.2], [173.4, 52.7], [159.8, 53.2],
        [170.5, 64.5], [159.2, 51.8], [157.5, 56.0], [161.3, 63.6], [162.6, 63.2],
        [160.0, 59.5], [168.9, 56.8], [165.1, 64.1], [162.6, 50.0], [165.1, 72.3],
        [166.4, 55.0], [160.0, 55.9], [152.4, 60.4], [170.2, 69.1], [162.6, 84.5],
        [170.2, 55.9], [158.8, 55.5], [172.7, 69.5], [167.6, 76.4], [162.6, 61.4],
        [167.6, 65.9], [156.2, 58.6], [175.2, 66.8], [172.1, 56.6], [162.6, 58.6],
        [160.0, 55.9], [165.1, 59.1], [182.9, 81.8], [166.4, 70.7], [165.1, 56.8],
        [177.8, 60.0], [165.1, 58.2], [175.3, 72.7], [154.9, 54.1], [158.8, 49.1],
        [172.7, 75.9], [168.9, 55.0], [161.3, 57.3], [167.6, 55.0], [165.1, 65.5],
        [175.3, 65.5], [157.5, 48.6], [163.8, 58.6], [167.6, 63.6], [165.1, 55.2],
        [165.1, 62.7], [168.9, 56.6], [162.6, 53.9], [164.5, 63.2], [176.5, 73.6],
        [168.9, 62.0], [175.3, 63.6], [159.4, 53.2], [160.0, 53.4], [170.2, 55.0],
        [162.6, 70.5], [167.6, 54.5], [162.6, 54.5], [160.7, 55.9], [160.0, 59.0],
        [157.5, 63.6], [162.6, 54.5], [152.4, 47.3], [170.2, 67.7], [165.1, 80.9],
        [172.7, 70.5], [165.1, 60.9], [170.2, 63.6], [170.2, 54.5], [170.2, 59.1],
        [161.3, 70.5], [167.6, 52.7], [167.6, 62.7], [165.1, 86.3], [162.6, 66.4],
        [152.4, 67.3], [168.9, 63.0], [170.2, 73.6], [175.2, 62.3], [175.2, 57.7],
        [160.0, 55.4], [165.1, 104.1], [174.0, 55.5], [170.2, 77.3], [160.0, 80.5],
        [167.6, 64.5], [167.6, 72.3], [167.6, 61.4], [154.9, 58.2], [162.6, 81.8],
        [175.3, 63.6], [171.4, 53.4], [157.5, 54.5], [165.1, 53.6], [160.0, 60.0],
        [174.0, 73.6], [162.6, 61.4], [174.0, 55.5], [162.6, 63.6], [161.3, 60.9],
        [156.2, 60.0], [149.9, 46.8], [169.5, 57.3], [160.0, 64.1], [175.3, 63.6],
        [169.5, 67.3], [160.0, 75.5], [172.7, 68.2], [162.6, 61.4], [157.5, 76.8],
        [176.5, 71.8], [164.4, 55.5], [160.7, 48.6], [174.0, 66.4], [163.8, 67.3]
    ],[
        [174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
        [181.5, 74.8], [184.0, 86.4], [184.5, 78.4], [175.0, 62.0], [184.0, 81.6],
        [180.0, 76.6], [177.8, 83.6], [192.0, 90.0], [176.0, 74.6], [174.0, 71.0],
        [184.0, 79.6], [192.7, 93.8], [171.5, 70.0], [173.0, 72.4], [176.0, 85.9],
        [176.0, 78.8], [180.5, 77.8], [172.7, 66.2], [176.0, 86.4], [173.5, 81.8],
        [178.0, 89.6], [180.3, 82.8], [180.3, 76.4], [164.5, 63.2], [173.0, 60.9],
        [183.5, 74.8], [175.5, 70.0], [188.0, 72.4], [189.2, 84.1], [172.8, 69.1],
        [170.0, 59.5], [182.0, 67.2], [170.0, 61.3], [177.8, 68.6], [184.2, 80.1],
        [186.7, 87.8], [171.4, 84.7], [172.7, 73.4], [175.3, 72.1], [180.3, 82.6],
        [182.9, 88.7], [188.0, 84.1], [177.2, 94.1], [172.1, 74.9], [167.0, 59.1],
        [169.5, 75.6], [174.0, 86.2], [172.7, 75.3], [182.2, 87.1], [164.1, 55.2],
        [163.0, 57.0], [171.5, 61.4], [184.2, 76.8], [174.0, 86.8], [174.0, 72.2],
        [177.0, 71.6], [186.0, 84.8], [167.0, 68.2], [171.8, 66.1], [182.0, 72.0],
        [167.0, 64.6], [177.8, 74.8], [164.5, 70.0], [192.0, 101.6], [175.5, 63.2],
        [171.2, 79.1], [181.6, 78.9], [167.4, 67.7], [181.1, 66.0], [177.0, 68.2],
        [174.5, 63.9], [177.5, 72.0], [170.5, 56.8], [182.4, 74.5], [197.1, 90.9],
        [180.1, 93.0], [175.5, 80.9], [180.6, 72.7], [184.4, 68.0], [175.5, 70.9],
        [180.6, 72.5], [177.0, 72.5], [177.1, 83.4], [181.6, 75.5], [176.5, 73.0],
        [175.0, 70.2], [174.0, 73.4], [165.1, 70.5], [177.0, 68.9], [192.0, 102.3],
        [176.5, 68.4], [169.4, 65.9], [182.1, 75.7], [179.8, 84.5], [175.3, 87.7],
        [184.9, 86.4], [177.3, 73.2], [167.4, 53.9], [178.1, 72.0], [168.9, 55.5],
        [157.2, 58.4], [180.3, 83.2], [170.2, 72.7], [177.8, 64.1], [172.7, 72.3],
        [165.1, 65.0], [186.7, 86.4], [165.1, 65.0], [174.0, 88.6], [175.3, 84.1],
        [185.4, 66.8], [177.8, 75.5], [180.3, 93.2], [180.3, 82.7], [177.8, 58.0],
        [177.8, 79.5], [177.8, 78.6], [177.8, 71.8], [177.8, 116.4], [163.8, 72.2],
        [188.0, 83.6], [198.1, 85.5], [175.3, 90.9], [166.4, 85.9], [190.5, 89.1],
        [166.4, 75.0], [177.8, 77.7], [179.7, 86.4], [172.7, 90.9], [190.5, 73.6],
        [185.4, 76.4], [168.9, 69.1], [167.6, 84.5], [175.3, 64.5], [170.2, 69.1],
        [190.5, 108.6], [177.8, 86.4], [190.5, 80.9], [177.8, 87.7], [184.2, 94.5],
        [176.5, 80.2], [177.8, 72.0], [180.3, 71.4], [171.4, 72.7], [172.7, 84.1],
        [172.7, 76.8], [177.8, 63.6], [177.8, 80.9], [182.9, 80.9], [170.2, 85.5],
        [167.6, 68.6], [175.3, 67.7], [165.1, 66.4], [185.4, 102.3], [181.6, 70.5],
        [172.7, 95.9], [190.5, 84.1], [179.1, 87.3], [175.3, 71.8], [170.2, 65.9],
        [193.0, 95.9], [171.4, 91.4], [177.8, 81.8], [177.8, 96.8], [167.6, 69.1],
        [167.6, 82.7], [180.3, 75.5], [182.9, 79.5], [176.5, 73.6], [186.7, 91.8],
        [188.0, 84.1], [188.0, 85.9], [177.8, 81.8], [174.0, 82.5], [177.8, 80.5],
        [171.4, 70.0], [185.4, 81.8], [185.4, 84.1], [188.0, 90.5], [188.0, 91.4],
        [182.9, 89.1], [176.5, 85.0], [175.3, 69.1], [175.3, 73.6], [188.0, 80.5],
        [188.0, 82.7], [175.3, 86.4], [170.5, 67.7], [179.1, 92.7], [177.8, 93.6],
        [175.3, 70.9], [182.9, 75.0], [170.8, 93.2], [188.0, 93.2], [180.3, 77.7],
        [177.8, 61.4], [185.4, 94.1], [168.9, 75.0], [185.4, 83.6], [180.3, 85.5],
        [174.0, 73.9], [167.6, 66.8], [182.9, 87.3], [160.0, 72.3], [180.3, 88.6],
        [167.6, 75.5], [186.7, 101.4], [175.3, 91.1], [175.3, 67.3], [175.9, 77.7],
        [175.3, 81.8], [179.1, 75.5], [181.6, 84.5], [177.8, 76.6], [182.9, 85.0],
        [177.8, 102.5], [184.2, 77.3], [179.1, 71.8], [176.5, 87.9], [188.0, 94.3],
        [174.0, 70.9], [167.6, 64.5], [170.2, 77.3], [167.6, 72.3], [188.0, 87.3],
        [174.0, 80.0], [176.5, 82.3], [180.3, 73.6], [167.6, 74.1], [188.0, 85.9],
        [180.3, 73.2], [167.6, 76.3], [183.0, 65.9], [183.0, 90.9], [179.1, 89.1],
        [170.2, 62.3], [177.8, 82.7], [179.1, 79.1], [190.5, 98.2], [177.8, 84.1],
        [180.3, 83.2], [180.3, 83.2]
    ]
];

var dvHeightAndWeightScatter= {
    color:['#4A99FF','#4BFFFC'],
    grid: {
        left: '0',
        right: '6%',
        bottom: '1%',
        top:'32',
        containLabel: true
    },

    legend: {
        data: ['女生','男生'],
        left: 'right',
        textStyle:{
            color:'#8ba3be'
        }
    },
    xAxis : [
        {
            type : 'value',
            scale:true,
            axisLabel : {
                formatter: '{value} cm',         
                textStyle:{
                    color:'#8ba3be'
                }
            },
            splitLine: {
                lineStyle: {
                    color:'#45607e',
                    shadowBlur:3,
                    shadowColor:'#fff'
                },       
            },
            axisLine:{
                lineStyle: {
                    color:'#395575',
                    shadowBlur:3,
                    shadowColor:'#fff'
                }
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            scale:true,
            axisLabel : {
                formatter: '{value} kg',
                textStyle:{
                    color:'#8ba3be'
                }
            },
            splitLine: {
                lineStyle: {
                    color:'#213c5a',
                    shadowBlur:3,
                    shadowColor:'#fff'
                }
            },
            axisLine:{
                lineStyle: {
                    color:'#395575',
                    shadowBlur:3,
                    shadowColor:'#fff'
                }
            }
        }
    ],
    series : [
        {
            name:'女生',
            type:'scatter',
            data:heightAndWeightScatter[0],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        },
        {
            name:'男生',
            type:'scatter',
            data: heightAndWeightScatter[1],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        }
    ]
};

var heightGrowthTrend=[
    { 
        value: [110, 112, 121, 154, 134, 120, 114, 121, 154, 134,120, 114],
        name: '一年级' 
    },{ 
        value: [130, 112, 114, 134, 124, 130, 110, 114, 134, 124, 130, 110],
        name: '二年级'
    },{ 
        value: [44, 55, 66, 22, 15, 56],
        name: '三年级'
    },{ 
        value: [44, 55, 66, 22, 15, 56],
        name: '四年级'
    },{ 
        value: [44, 55, 66, 22, 15, 56],
        name: '五年级'
    },{ 
        value: [44, 55, 66, 22, 15, 56],
        name: '六年级'
    }
];

var dvHeightGrowthTrend = {
      grid: {
        right: 10,
        top: 30,
        left: 30,
        height:153
      },
      color:['#f8712b','#00e18e','#e6b532','#029bf3','#00e5e2','#7d65d4'],
      legend: {
        icon:'rect',
        itemWidth: 15,
        itemHeight: 15,
        itemGap: 13,
        top:3,
        right:0,
        textStyle: {
          color: "#8ba3be"
        },
        data: ["一年级","二年级","三年级","四年级","五年级","六年级"]
      },
      xAxis: {
        type: "category",
        boundaryGap: true,
        axisLine: {
            lineStyle: {
                color:'#395575',
                shadowBlur:3,
                shadowColor:'#fff'
            }
        },
        nameRotate: 45,
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
            color:'#8ba3be'
        },
        data: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十一月","十二月"]       
      },
      yAxis: {
        axisLine: {
          show: false,
          lineStyle: {
            color: "#fff"
          }
        },
        axisLabel: {
            color:'#8ba3be'
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color:'#213c5a',
            shadowBlur:1,
            shadowColor:'#fff'
          }
        },
        type: "value",
        min:70,
        max:190
      },
      series: (function(){
        var dataArr=[];
        for(var it in heightGrowthTrend){      
            var thisobj=heightGrowthTrend[it];
            var obj={
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

var weightAbnormalRate= [
    {value:335,name:"一年级",abnormalRate:0.3},
    {value:310,name:"二年级",abnormalRate:-0.3},
    {value:234,name:"三年级",abnormalRate:0.3},
    {value:154,name:"四年级",abnormalRate:-0.3},
    {value:335,name:"五年级",abnormalRate:0.3},
    {value:335,name:"六年级",abnormalRate:0.3}
 ];

var dvWeightAbnormalRate={
    title :{
        text: '体重异常\n    占比',
        textStyle:{
            color:'#fff',
            fontSize:17,
            lineHeight:21
        },
        x:'38%',
        y:'39%'
    },
    color:["#ea6c46","#fbb721","#0e75d7","#ee9824","#55df60","#5ddedd"],
    series: [{
            name:'体重异常占比',
            type:'pie',
            center: ['56%', '48%'],
            radius: ['54%', '80%'],
            avoidLabelOverlap: false,
            label: {
                show:false
            },
            data:weightAbnormalRate
        }
    ]
};

function makeWeightAbnormalLegend()
{
    var kv=[];
    var total=0;
    for(var it in weightAbnormalRate)
    {
        var str="";
        var color=dvWeightAbnormalRate.color[it];
        var obj=weightAbnormalRate[it];
        var arrow="";
        total+=obj.value;
        if(obj.abnormalRate>0)
            arrow="<small class='text-success'>↑</small>";
        else if(obj.abnormalRate<0)
            arrow="<small class='text-danger'>↓</small>";
        else 
            arrow="<small>-</small>";
        str+="<div class='legend'>"+
                "<div class='example'><div class='rect' style='background-color:"+(color?color:"red")+";'></div>"+obj.name+"(@@@%)</div><div class='rate'>"+Math.abs(obj.abnormalRate)*100+"%"+arrow+"</div>"+
             "</div>";
        kv.push({value:obj.value,str:str});         
    }
    
    for(var it in kv)
    {
        var obj=kv[it];
        var rate=Math.floor(obj.value*100/total);
        $("#legendBody").append(obj.str.replace("@@@",rate));
    }
}

var weightAbnormalTrend=[820, 932, 901, 934, 1290, 1330, 1320];
var dvWeightAbnormalTrend = {
    grid:{
        top:'3',
        left:'-19',
        right:'-21',
        bottom:'4'
    },
    xAxis: {
        type: 'category',
        show : false,
        axisLabel:{
            show:false
        }
    },  
    yAxis: {
       show : false,
        type: 'value',
        max:'dataMax',
        min:'dataMin',
        axisLabel:{
            show:false
        }
    },
    series: [{
        symbolSize: 6,
        data:weightAbnormalTrend ,
        type: 'line',
        smooth: 0.2,
        itemStyle:{
            color:'#34ae70',
            shadowBlur:1,
            shadowColor :'#fff'
        },
        lineStyle:{
            shadowBlur:10,
            shadowColor :'#fff'
        }
    }]
};



var averageBMI=23;

var dvAverageBMI  = {
series: [{
        type: "gauge",
        radius: "90%",
        center:["57%","54%"],
        startAngle: "225",
        endAngle: "-45",
        splitNumber: "120",
        pointer: {
            show: false,
        },
        detail: {
            show: false,
        },
        data: [{
            value: 133,
        }, ],
        axisLine: {
            show: true,
            lineStyle: {
                color: [
                    [1, "#00FFFF"]
                ],
                width: 2,
                opacity: 1,
            },
        },
        axisTick: {
            show: false
        },
        splitLine: {
            show: false
        },
        axisLabel: {
            show: false,
            formatter: function(v) {
                return v.toFixed(0);
            },
        },
    },
    {
        type: "gauge",
        radius: "83%",
        center:["57%","54%"],
        startAngle: "225",
        endAngle: "-45",
        pointer: {
            show: false
        },
        data: [0],
        detail: {
            show:false
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: [[1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#5CF9FE", 
                },
                {
                    offset: 0.17,
                    color: "#468EFD", 
                },
                {
                    offset: 0.9,
                    color: "#468EFD", 
                },
                {
                    offset: 1,
                    color: "#5CF9FE", 
                },
                ])]],
                width: 8,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                opacity: 1,
            },
        },
        axisTick: {
            show: false,
        },
        splitLine: {
            show: false,
            length: 25,
            lineStyle: {
                color: "#00377a",
                width: 2,
                type: "solid",
            },
        },
        axisLabel: {
            show: false,
            formatter: function(v) {
                return v.toFixed(0);
            },
        }
    },
    {
        type: "gauge",
        z: 2,
        center:["57%","54%"],
        radius: "68%",
        min: 10,
        max: 40,
        startAngle: "225",
        endAngle: "-45",
        axisLine: {
            lineStyle: {
                color: [
                    [1, "#018DFF"]
                ],
                fontSize: 20,
                width: 2,
                opacity: 1, 
            },
        },
        splitLine: {
            show: false,
        },
        axisLabel: {
            show: false
        },
        pointer: {
            show: false,
        },
        axisTick: {
            show: false,
        },
        detail: {
            show: false,
        },
        data:1
    },
    {
        name:"平均BMI",
        type: "gauge",
        center:["57%","54%"],
        radius: "68%",
        startAngle: 225, 
        endAngle: -45,      
        min: 10,
        max: 40,
        splitNumber: 4,
        z: 4,
        axisTick: {
            show: false,
        },
        splitLine: {
            length: 10, 
            lineStyle: {
                width: 2,
                color: "#018DFF",
            }, 
        },
        axisLabel: {
            color: "rgba(255,255,255,8)",
            fontSize: 13,
            formatter: function(v) {
                return v.toFixed(0);
            },
        }, 
        pointer: {
            show: true
        },
        itemStyle:{
            color:'#43bcbf'
        },
        axisLine: {
            lineStyle: {
                opacity: 0,
            },
        },
        detail:{
            offsetCenter:['0','72%'],
            fontSize:22,
            color:'#36c0df'
        },
        title:{
            show:true,
            color:"#fff",
            offsetCenter:['0','108%'],
            fontSize:19
        },
        data:  [{
            value: averageBMI,
            name:'平均BMI'
        }],
        animationDuration: 4000
    },
    {
        type: "pie",
        radius: "25%",
        center:["57%","54%"],
        z: 1,
        itemStyle: {
            normal: {
                color: new echarts.graphic.RadialGradient(
                    0.5,
                    0.5,
                    0.8,
                    [{
                            offset: 0,
                            color: "#4978EC",
                        },
                        {
                            offset: 0.5,
                            color: "#1E2B57",
                        },
                        {
                            offset: 1,
                            color: "#c6c6c6",
                        },
                    ],
                    false,
                ),
                label: {
                    show: false,
                },
                labelLine: {
                    show: false,
                },
            },
        },
        hoverAnimation: false,
        label: {
            show: false,
        },

        tooltip: {
            show: false,
        },
        data: [0],
        animationType: "scale",
    },
],
}

var BMIStandard=[
    {name:"偏瘦",up:-1,color:"#2ea2f4"},
    {name:"正常",up:18.5,color:"#3dbd5f"},
    {name:"偏胖",up:24,color:"#ffaf2a"},
    {name:"肥胖",up:27,color:"#db6b7c"},
    {name:"重度肥胖",up:30,color:"#e486f3"}
];
function makeBMIStandard(){
    var str="";
    for(var it in BMIStandard)
    {
        var obj =BMIStandard[it];
        var up="";
        if(obj.up>0) up="<div class='value'>"+obj.up+"</div>";
        str+="<div class='standard'>"+
                "<div class='rect' style='background-color:"+obj.color+"'>"+obj.name+"</div>"+up+
             "</div>";
    }
    $("#BMIStandard").append(str);

}





var myopicDistribution= [
    {value:335,name:"一年级",abnormalRate:0.3,averageMyopic:4.0,trend:[33,44,35,35,35,37]},
    {value:310,name:"二年级",abnormalRate:-0.3,averageMyopic:4.3,trend:[44,32,43,21,3,21]},
    {value:234,name:"三年级",abnormalRate:0.3,averageMyopic:5.0,trend:[33,44,35,35,35,37]},
    {value:154,name:"四年级",abnormalRate:-0.3,averageMyopic:5.1,trend:[43,44,35,21,35,37]},
    {value:335,name:"五年级",abnormalRate:0.3,averageMyopic:5.2,trend:[33,66,43,22,35,37]},
    {value:335,name:"六年级",abnormalRate:0.3,averageMyopic:5.3,trend:[33,44,35,55,22,37]}
 ];

var dvMyopicDistribution={
    title :{
        text: '近视分布',
        textStyle:{
            color:'#fff',
            fontSize:17,
            lineHeight:21
        },
        x:'38%',
        y:'42%'
    },
    color:["#ea6c46","#fbb721","#0e75d7","#ee9824","#55df60","#5ddedd"],
    series: [{
            name:'近视分布占比',
            type:'pie',
            center: ['56%', '48%'],
            radius: ['54%', '80%'],
            avoidLabelOverlap: false,
            label: {
                show:false
            },
            data:myopicDistribution
        }
    ]
};


function makeMyopicDistributionLegend()
{
    
    for(var it in myopicDistribution)
    {
        var str="";
        var color=dvMyopicDistribution.color[it];
        var obj=myopicDistribution[it];
        var arrow="";
        var ids="myopicTrend"+it;
        var dvs="dvGradeMyopicTrend"+it;
        if(obj.abnormalRate>0)
            arrow="<small class='text-success'>↑</small>";
        else if(obj.abnormalRate<0)
            arrow="<small class='text-danger'>↓</small>";
        else 
            arrow="<small>-</small>";
        str+="<div class='d-table-row'>"+
                "<div class='d-table-cell'><div class='rect' style='background-color:"+(color?color:"red")+"'></div></div>"+
                "<div class='d-table-cell'>"+obj.name+"</div>"+
                "<div class='d-table-cell rowDtrend' id='"+ids+"'></div>"+
                "<div class='d-table-cell'>"+obj.averageMyopic+"</div>"+
                "<div class='d-table-cell'>"+Math.abs(obj.abnormalRate)*100+"%"+arrow+"</div>"+
            "</div>";
        $("#MyopicLegendBody").append(str);

        if(!dvMap[dvs]){
            var options = {
                grid:{
                    top:'3',
                    left:'-8',
                    right:'-8',
                    bottom:'4'
                },
                xAxis: {
                    type: 'category',
                    show : false,
                    axisLabel:{
                        show:false
                    }
                },  
                yAxis: {
                   show : false,
                    type: 'value',
                    max:'dataMax',
                    min:'dataMin',
                    axisLabel:{
                        show:false
                    }
                },
                series: [{
                    symbolSize: 6,
                    data:obj.trend ,
                    type: 'line',
                    smooth: 0.2,
                    itemStyle:{
                        color:color,
                        shadowBlur:1,
                        shadowColor :'#fff'
                    },
                    lineStyle:{
                        shadowBlur:10,
                        shadowColor :'#fff'
                    }
                }]
            };

            var domObj=document.getElementById(ids);
            var chartobj=echarts.init(domObj);  
            chartobj.setOption(options);
            dvMap[dvs]={domObj:domObj,jsonOption:options};
        }  

    }
}

var eyeryDayMontionTime=3.5;


var dvEyeryDayMontionTime = {
    title: {
        text: eyeryDayMontionTime+'H',
        x: 'center',
        y: 'center',
        textStyle: {
            fontWeight: 'normal',
            color: '#fff',
            fontSize: '15'
        }
    },
    color: ['#d09721','#355672'], 
    series: [{
        name: '每日运动时间',
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
            value: eyeryDayMontionTime
            
        }, {
            value: 16-8-eyeryDayMontionTime
        }]
    }]
}




var montionRisk=80;


var dvMontionRisk = {
    title: [{
        text:montionRisk,
        x: 'center',
        y: '34%',
        textStyle: {
            fontWeight: 'normal',
            color: '#fff',
            fontSize: '15'
        }
    },{
        text:(function(){
            if(montionRisk>=90) return "优秀";
            else if(montionRisk>=80 && montionRisk<90) return "低风险";
            else if(montionRisk>=60 && montionRisk<80) return "一般性风险";
            else if(montionRisk<60) return "高风险";
        })(),
        x: 'center',
        y: '48%',
        textStyle: {
            fontWeight: 'normal',
            color: '#fff',
            fontSize: '15'
        }
    }],
    color: ['#8ecb5a','#355672'], 
    series: [{
        name: '运动风险评估',
        type: 'pie',
        radius: ['69%', '88%'],
        itemStyle: {
            normal: {             
                labelLine: {
                    show: false
                }
            }
        },
        hoverAnimation: false, 
        data: [{
            value: montionRisk   
        }, {
            value: 100-montionRisk
        }]
    }]
}

var todayScore=[
    {name:'一分钟跳绳',totalNum:422,compareCurrentMonthAgo:0.33,max:11,min:9,average:10},
    {name:'仰卧起坐',totalNum:33,compareCurrentMonthAgo:0.33,max:11,min:9,average:10},
    {name:'坐位体前屈',totalNum:22,compareCurrentMonthAgo:0.33,max:11,min:9,average:10},
    {name:'50米跑',totalNum:211,compareCurrentMonthAgo:0.33,max:11,min:9,average:10},
    {name:'50×8往返跑',totalNum:123,compareCurrentMonthAgo:0.33,max:11,min:9,average:10}
];
function updateTodayScore()
{
    var str="";
    for(var it in todayScore){
        var obj=todayScore[it];
        var updown=Math.abs(obj.compareCurrentMonthAgo)*100+"% ";
        if(obj.compareCurrentMonthAgo>0) updown+="↑";
        else if(obj.compareCurrentMonthAgo<0) updown+="↓";
        else updown+="-";
        str+="<div class='col'>"+
                "<div  class='card-num'>"+obj.totalNum+"</div>"+
                "<div>"+obj.name+"<small>"+updown+"</small></div>"+
                "<div class='card-detail'>最高 "+obj.max+" 最低 "+obj.min+" 平均 "+obj.average+"</div>"+
            "</div>";
        
    }
    $("#todayScore").append(str);
}


var physicalQualityComprehensiveRadar=[
    { 
        value: [96, 56, 88, 46, 53],
        name: '本校'
    },{ 
        value: [44, 55, 66, 22, 15],
        name: '国家平均'
    }
];

var dvPhysicalQualityComprehensiveRadar = {
  
    color:  comprehensiveRadarColors,
    legend: {
        orient:'horizontal',
        data: makeLegendFromData(physicalQualityComprehensiveRadar,"name"),
        bottom:35,
        right:40,
        itemWidth: 14, 
        itemHeight: 14,
        itemGap: 21, 
        textStyle: {
            fontSize: 14,
            color: '#8ba3be',
        }
    },
    radar: {
        radius:"70%",
        name: {
            textStyle: {
                color: '#fff',
                fontSize: 16
            },
        },
        indicator:  [{
                text: '1分钟跳绳',
                max: 100,
            },
            {
                text: '仰卧起坐',
                max: 100
            },
            {
                text: '坐位体前屈',
                max: 100
            },
            {
                text: '50×8往返跑',
                max: 100,
            },
            {
                text: '50米跑',
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
                shadowColor:'#ffff',
                shadowColor:'#ffff',
                shadowBlur:20
            }
        },
        splitLine: {
            lineStyle: {
                color: '#0e4765', 
                width: 1,
                shadowColor:'#ffff',
                shadowBlur:20
            }
        },
    },
    series: [{
        type: 'radar',
        symbolSize: 8,
        data: (function(){
            var dataArr=[];
            for(var it in physicalQualityComprehensiveRadar){      
                var thisobj=physicalQualityComprehensiveRadar[it];
                var thiscolor=comprehensiveRadarColors[it];
                var obj={
                    value:thisobj.value,
                    name:thisobj.name,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                color: thiscolor,
                            },
                            shadowColor:thiscolor,
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
                dataArr.push(obj);
            }
            return dataArr;

        })()
    }]
};

var specialItems=[
    {name:"篮球运球",img:"images/lanqiu.png"},
    {name:"足球运球",img:"images/zuqiu.png"},
    {name:"排球垫球",img:"images/paiqiudianqiu.png"},
    {name:"踢毽子",img:"images/jianzi.png"},
    {name:"跳高",img:"images/tiaogao.png"},
    {name:"跳远",img:"images/tiaoyuan.png"}
];

function showSpecialItems()
{
    var str="";
    for(var it in specialItems){
        var obj=specialItems[it];
        str+="<div class='col-2 sportItem'>"+
                "<div class='sportItemLegend'>"+
                    "<img src='"+obj.img+"'>"+
                "</div>"+
                "<div class='imageTextDetail'>"+obj.name+"</div>"+
            "</div>";      
    }
    $("#specialItems").append(str);
}


  function makeDvPhsicalItemStandardReachingRate(phsicalItemStandardReachingRate,name)
  {
      return {
        
        series: [
          {
            title:{
                color:"#fff",
                offsetCenter:[0, '40%'],
                fontSize:12
            },
            type: 'gauge',
            radius: '100%',
            center: ['50%', '60%'],
            splitNumber: 0, //刻度数量
            startAngle: 225,
            endAngle: -45,
            axisLine: {
              show: true,
              lineStyle: {
                width: 10,
                color: [
                  [
                    phsicalItemStandardReachingRate, new echarts.graphic.LinearGradient(
                    0, 0, 1, 0, [{
                    offset: 0,
                    color: '#003dff'
                  },
                    {
                      offset: 1,
                      color: '#017fff'
                    }
                  ]
                    )
                  ],
                  [
                    1, '#25259e'
                  ]
                ]
              }
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {
              show: false
            },
            detail: {
              show: true,
              offsetCenter: [0, 0],
              color: '#30e6e4',
              fontSize:19,
              formatter: function(params) {
                    return (params * 100).toFixed(1)+"%";
                }
          },
          data: [{value:phsicalItemStandardReachingRate,name:name}]
        }
        ]
      };

  }


 

  var phsicalItemAnysis=[
    {name:'一分钟跳绳',standardReachingRate:0.36,trend:[33,44,35,35,35,37],gradeAnysis:[
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9}
    ]},
    {name:'50×8往返跑',standardReachingRate:0.36,trend:[33,44,35,35,35,37],gradeAnysis:[
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9}
    ]},
    {name:'50米跑',standardReachingRate:0.36,trend:[33,44,35,35,35,37],gradeAnysis:[
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9}
    ]},
    {name:'坐位体前屈',standardReachingRate:0.36,trend:[33,44,35,35,35,37],gradeAnysis:[
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9}
    ]},
    {name:'仰卧起坐',standardReachingRate:0.36,trend:[33,44,35,35,35,37],gradeAnysis:[
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9},
        {grade:1,max:11,min:9,average:10,gradeStandardReachingRate:0.59,compareLastMonthGrow:true,standard:8.9}
    ]}
];
function showPhsicalItemAnysis()
{
    for(var it in phsicalItemAnysis){
        var obj=phsicalItemAnysis[it];
        var ids1="phsicalItemStandardReachingRate"+it;
        var dvs1="dvPhsicalItemStandardReachingRate"+it;
        var ids2="phsicalItemTrend"+it;
        var dvs2="dvPhsicalItemTrend"+it;
        var str="<li>"+
                    "<div class='itemVirtual'>"+
                        "<div class='flex-fill' id='"+ids1+"'></div>"+
                        "<div class='graphic1' id='"+ids2+"'></div>"+
                    "</div>"+
                    "<div class='flex-fill h-100'>"+
                        "<table class='table itemtable'>"+
                            "<thead>"+
                                "<tr><th>年级</th><th>最高</th><th>最低</th><th>平均</th><th>及格率</th><th>国家标准</th></tr>"+
                            "</thead>"+
                            "<tbody>";
                             
                            if(obj.gradeAnysis){
                                for(i in obj.gradeAnysis){
                                    var grade=obj.gradeAnysis[i];
                                    var isgrow="";
                                    if(grade.compareLastMonthGrow==true) isgrow="<small class='text-success'>↑</small>";
                                    else if(grade.compareLastMonthGrow==false) isgrow="<small class='text-danger'>↓</small>";
                                    else if(grade.compareLastMonthGrow==0) isgrow="<small>-</small>";

                                    str+="<tr><td>"+grade.grade+"年级</td><td>"+grade.max+"</td><td>"+grade.min+"</td><td>"+grade.average+"</td><td>"+grade.gradeStandardReachingRate+"%"+isgrow+"</td><td>"+grade.standard+"</td></tr>";

                                }
                            }
                     str+="</tbody>"+
                        "</table>"+
                    "</div>"+
                "</li>";  

        $("#phsicalItemAnysis").append(str);  
        
        if(!dvMap[dvs1]){
            var options=makeDvPhsicalItemStandardReachingRate(obj.standardReachingRate,obj.name);        
            var domObj=document.getElementById(ids1);
            var chartobj=echarts.init(domObj);  
            chartobj.setOption(options);
            dvMap[dvs1]={domObj:domObj,jsonOption:options};
        }
        
        if(!dvMap[dvs2]){
            var options=dvWeightAbnormalTrend;
            options.series[0].data=obj.trend;
            options.grid.left=-12;
            options.grid.right=-9;
            options.grid.top=5;
            var domObj=document.getElementById(ids2);
            var chartobj=echarts.init(domObj);  
            chartobj.setOption(options);
            dvMap[dvs2]={domObj:domObj,jsonOption:options};
        }
        
        
    }
}





var deviceOccupating = 0.83;
var dvDeviceOccupating = { 
    title: {
        text: `${deviceOccupating*100}%`,
        subtext: '监测设备\n综合利用率',
        left: 'center',
        top: '38%', 
        textStyle: {
            color: '#fff',
            fontSize: 38,
        },
        subtextStyle: {
            color: '#fff',
            fontSize: 24
        },
        itemGap: 12
    },
    xAxis: {
        splitLine: {
            show: false
        },
        axisLabel: {
            show: false
        },
        axisLine: {
            show: false
        }
    },
    yAxis: {
        splitLine: {
            show: false
        },
        axisLabel: {
            show: false
        },
        axisLine: {
            show: false
        }
    },
    series: [
        {
            type: 'pie',
            radius: ['0', '63%'],
            center: ['50%', '50%'],
            z: 0,
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#00f8ff'
                        },
                        {
                            offset: 1,
                            color: '#b200ed'
                        }
                    ]),
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                },
            },
            label: {
                normal: {
                    position: "center",

                }
            },
            data: [100],
        },
        {
            type: 'pie',
            clockWise: true,
            radius: ["73%", "87%"],
            data: [{
                    value: deviceOccupating,
                    itemStyle: {
                        normal: {
                            borderWidth: 10,
                            borderColor: {
                                colorStops: [{
                                    offset: 0,
                                    color: '#7940FE' || '#00cefc'
                                }, {
                                    offset: 1,
                                    color: '#2A69EC' || '#367bec' 
                                }]
                            },
                            color: { 
                                colorStops: [{
                                    offset: 0,
                                    color: '#7940FE' || '#00cefc'
                                }, {
                                    offset: 1,
                                    color: '#2A69EC' || '#367bec'
                                }]
                            },
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                        },
                    }
                },
                {
                    name: 'gap',
                    value: 1 - deviceOccupating,
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            color: 'rgba(0, 0, 0, 0)',
                            borderColor: 'rgba(0, 0, 0, 0)',
                            borderWidth: 0,
                        }
                    },
                }
            ]
        },       
        {
            type: "pie",
            radius: ["0%", "73%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: "center"
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        fontWeight: "bold"
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0.05,
                            color: "rgba(32,36,107, 0.2)"
                        }, {
                            offset: 0.5,
                            color: "rgba(32,36,107,0.3)"
                        }, {
                            offset: 0.95,
                            color: "rgba(32,36,107, 0.2)"
                        }]
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [{
                value: 3235
            }]
        },   
        {
            type: "pie",
            radius: ["0%", "97%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
                normal: {
                    show: false,
                    position: "center"
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        fontWeight: "bold"
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0.05,
                            color: "rgba(21,24,65, 0.2)"
                        }, {
                            offset: 0.5,
                            color: "rgba(21,24,65, 0.3)"
                        }, {
                            offset: 0.95,
                            color: "rgba(21,24,65, 0.2)"
                        }]
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [{
                value: 3235
            }]
        }
    ]
};



var phsicalDevices=[
    {name:"跳绳测试仪",num:2},
    {name:"短跑测试仪",num:2},
    {name:"往返跑测试仪",num:2},
    {name:"仰卧起坐测试仪",num:2},
    {name:"体前屈测试仪",num:2}
];

function showPhsicalDevices()
{
    var str="";
    for(var it in phsicalDevices){
        var obj=phsicalDevices[it];
        str+="<div class='col sportItem'>"+
                "<div class='sportItemLegend'>"+
                    "<img src='images/ceshiyi.png'>"+
                "</div>"+
                "<div class='imageTextDetail'>"+obj.name+"×"+obj.num+"</div>"+
            "</div>";      
    }
    $("#phsicalDevices").html(str);
}



 
 
   
  
  



  var devicesBeUsed=[
    {value:335, name:'走廊A',rate:0.31},
    {value:310, name:'走廊西',rate:0.31},
    {value:234, name:'走廊B',rate:0.31},
    {value:135, name:'走廊西1',rate:0.31},
    {value:233, name:'走廊西2',rate:0.31},
    {value:11, name:'2楼A',rate:0.31},
    {value:158, name:'2楼B',rate:0.31},
    {value:318, name:'3楼A',rate:0.31}
]; 

 

  var dvDevicesBeUsed= {
     
    title:[{
      show: true,
      text:'➤  设备使用次数',
      textStyle:{
        color:"#1aa6ba",
        fontSize:15 
      },
      top:11,
      left:-5,        
    },{
        show: true,
        text:'➤  设备使用占比',
        textStyle:{
          color:"#1aa6ba",
          fontSize:15 
        },
        top:11,
        left:"55%",
           
      }],
    legend:{
        show:true,
        bottom:0,
        right:0,
        width:"52%",
        itemWidth:15,
        itemHeight:15,
        textStyle:{
            color:'#8ba3be',
            fontSize:13           
        },
        formatter: function(name){
            for (var item in devicesBeUsed) {
                if (devicesBeUsed[item].name == name) {
                    return name+"("+devicesBeUsed[item].rate*100+"%)";
                }
            }
            return "";
        }
    },
    grid: {
      borderWidth: 0,
      x:88,
      y:30,
      width:"29%",
      height:"236",
      containLabel:true
    }
,
    color: ["#63e2e2","#a0e8b6","#f7e05a","#ffa07f","#fb7392","#e6bdf2","#95c0ff","#2ec8e9"],
    yAxis: [{
      type: 'category',
      inverse: true,
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false,
        inside: false
      }
    },{
        type: 'category',
        inverse: true,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false,
          inside: false
        }
      }],
    xAxis:[{
      type: 'value',
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },{
        show:false
    }],
    series: [{
      type: 'bar',
      zlevel: 2,
      barWidth: '10px',
      data:devicesBeUsed,
      animationDuration: 1500,
      interval:8,
      itemStyle: {
        normal: {
          show: true,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
            offset: 0,
            color: "#ff602c"
          }, {
            offset: 1,
            color: "#edc443"
          }], false),
          barBorderRadius: 10
        },
        emphasis: {
          shadowBlur: 15,
          shadowColor: 'rgba(0, 0, 0, 0.1)'
        }
      },
      label: {
        normal: {
          color: '#35b6d3',
          show: true,
          position: 'right',
          textStyle: {
            fontSize: 14
          },
          formatter: function (a, b) {
            if(a.value==0) return "";
            else
            return a.value
          }
        }
      }
    },{
            
            type: 'bar',
            xAxisIndex: 1, 
            barGap: '-100%',
            barWidth: '10%',
            itemStyle: {
                normal: {
                    barBorderRadius: 200,
                    color: 'transparent'
                }
            },
            label: {
                normal: {
                    show: true,
                    position: [-64, -2],
                    textStyle: {
                        fontSize:14,
                        color: '#35b6d3',
                        
                    },formatter: function (a) {                         
                        return devicesBeUsed[a.dataIndex].name;
                    }
                }
            },
            data: makeLegendFromData(devicesBeUsed,"value")
        },{
            type: 'pie',
            radius : '55%',
            center: ['75%', '44%'],
            data:devicesBeUsed,
            label:{
                show:false
            }
        }],
    animationEasing: 'cubicOut'
  }

var monitoringTimeScatter=[220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122];

 var  dvMonitoringTimeScatter = {

    grid: {
        left: '1%',
        right: '3%',
        top:'17%',
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
            show:true,
            lineStyle: {
                color: '#0e4765'
            }
        },
        data: ['8:30', '9:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30']
    }],
    yAxis: [{
        type: 'value',
        name: '单位（次）',
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
        data: monitoringTimeScatter
    }
};





 
  