const app = getApp();
//判断闰年
function runNian(_year) {
  if (_year % 400 === 0 || (_year % 4 === 0 && _year % 100 !== 0)) {
    return true;
  }
  else { return false; }
}
Page({
  data: {
    year: 0,
    month: 0,
    day: [],
    smallSwitch: false,
    isToday: 0  
  },
  onLoad: function(){
    // timenode对象构造函数
    function timenode(){};
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let isToday = now.getDate()-1;
    //日期节点列表
    let day = [];
    //初始化列表
    for(var i=0;i<42;i++)
      day[i] = new timenode();
    //月份开始的星期（周几）
    let startWeek = new Date('' + year + ',' + month + ',1').getDay();
    //如果是星期日，到第一个节点
    startWeek == 7? startWeek = 0: 1==1;
    //月份对应天数的列表
    let monthList = [31,28+runNian(year),31,30,31,30,31,31,30,31,30,31];
    //五行有可能容不下所有天分，small开关，true成为六行
    let smallSwitch = false;
    //如果所有天数大于35就开启small模式
    if(startWeek + monthList[month-1] > 35)
      smallSwitch = true;
    //本月天数
    for(var i=startWeek;i<monthList[month-1]+startWeek;i++){
      day[i].day = i - (startWeek - 1);
      //isMonth属性代表是否是本月的日期，用于class控制
      day[i].isMonth = true;
    }
    //lastmonth
    for(var i=startWeek-1;i>=0;i--){
      day[i].day = monthList[month - 2] - (startWeek - 1 - i);
      day[i].isMonth = false;
    }
    //nextmonth
    if(!smallSwitch)
      for (var i = monthList[month - 1] + startWeek;i<35;i++){
        day[i].day = i - (monthList[month - 1] + startWeek) + 1;
        day[i].isMonth = false
      }
    else
      for (var i = monthList[month - 1] + startWeek; i < 42; i++) {
        day[i].day = i - (monthList[month - 1] + startWeek) + 1;
        day[i].isMonth = false
      }
    this.setData({
      year: year,
      month: month,
      day: day,
      smallSwitch: smallSwitch,
      isToday: isToday
    })
  }
});