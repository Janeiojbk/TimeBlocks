const app = getApp();
//判断闰年
function runNian(_year) {
  if (_year % 400 === 0 || (_year % 4 === 0 && _year % 100 !== 0)) {
    return true;
  }
  else { return false; }
}
//改变数据
function setDate(date) {
  // timenode对象构造函数
  function timenode() { };
  let now = date;
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let isToday = now.getDate() - 1;
  //日期节点列表
  let day = [];
  //初始化列表
  for (var i = 0; i < 42; i++)
    day[i] = new timenode();
  //月份开始的星期（周几）
  let startWeek = new Date(year,month-1,1).getDay();
  //如果是星期日，到第一个节点
  startWeek == 7 ? startWeek = 0 : 1 == 1;
  //月份对应天数的列表
  let monthList = [31, 28 + runNian(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  //五行有可能容不下所有天分，small开关，true成为六行
  let smallSwitch = false;
  //如果所有天数大于35就开启small模式
  if (startWeek + monthList[month - 1] > 35)
    smallSwitch = true;
  //本月天数
  for (var i = startWeek; i < monthList[month - 1] + startWeek; i++) {
    day[i].day = i - (startWeek - 1);
    //isMonth属性代表是否是本月的日期，用于class控制
    day[i].isMonth = true;
  }
  //lastmonth
  for (var i = startWeek - 1; i >= 0; i--) {
    day[i].day = monthList[month - 2>0?month-2:11] - (startWeek - 1 - i);
    day[i].isMonth = false;
  }
  //nextmonth
  if (!smallSwitch)
    for (var i = monthList[month - 1] + startWeek; i < 35; i++) {
      day[i].day = i - (monthList[month - 1] + startWeek) + 1;
      day[i].isMonth = false
    }
  else
    for (var i = monthList[month - 1] + startWeek; i < 42; i++) {
      day[i].day = i - (monthList[month - 1] + startWeek) + 1;
      day[i].isMonth = false
    }
  let afteryear = year;
  let aftermonth = month + 1;
  let beforeyear = year;
  let beforemonth = month - 1;
  if (aftermonth > 12) {
    aftermonth = 1;
    afteryear++;
  }
  if (beforemonth < 1) {
    beforemonth = 12;
    beforeyear--;
  }
  let today = this.data.nowmonth.isToday;
  let tomonth = this.data.nowmonth.tomonth;
  let toyear = this.data.nowmonth.toyear;
  let dataa = {
    day: day,
    smallSwitch: smallSwitch,
    afteryear: afteryear,
    aftermonth: aftermonth,
    beforeyear: beforeyear,
    beforemonth: beforemonth,
    year: year,
    month: month,
    isToday: today,
    toyear: toyear,
    tomonth: tomonth
  };
  let move = this.data.move;
  let index = this.data.currentTap;
  year = this.data.year;
  month = this.data.month;
  afteryear = year;
  aftermonth = month + 1;
  beforeyear = year;
  beforemonth = month - 1;
  if (aftermonth > 12) {
    aftermonth = 1;
    afteryear++;
  }
  if (beforemonth < 1) {
    beforemonth = 12;
    beforeyear--;
  }
  if(move == 1){
    if(index == 0)
      this.setData({pre: dataa});
    else if(index == 1)
      this.setData({nowmonth: dataa});
    else
      this.setData({post: dataa});
    this.setData({year: afteryear, month: aftermonth})
  }
  else{
    if(index == 0)
      this.setData({post: dataa});
    else if(index == 1)
      this.setData({pre: dataa});
    else
      this.setData({nowmonth: dataa});
    this.setData({year: beforeyear, month: beforemonth})
  }
}
//页面注册函数
Page({
  data: {
    move: 0,
    currentTap: 0,
    year: 0,
    month: 0,
    nowmonth: {
      day: [],
      year: 0,
      month: 0,
      smallSwitch: false,
      isToday: 0,      
      afteryear: 0,
      aftermonth: 0,
      beforeyear: 0,
      beforemonth: 0,
      tomonth: 0,
      toyear: 0
    },
    post: {
      day: [],
      smallSwitch: false,
      year: 0,
      month: 0,
      isToday: 0,      
      afteryear: 0,
      aftermonth: 0,
      beforeyear: 0,
      beforemonth: 0,
      tomonth: 0,
      toyear: 0
    },
    pre: {
      day: [],
      year: 0,
      month: 0,
      smallSwitch: false,
      isToday: 0,      
      afteryear: 0,
      aftermonth: 0,
      beforeyear: 0,
      beforemonth: 0,
      tomonth: 0,
      toyear: 0
    }    
  },
  onLoad: function(){
    // timenode对象构造函数
    function timenode() { };
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let isToday = now.getDate() - 1;
    //日期节点列表
    let day = [];
    //初始化列表
    for (var i = 0; i < 42; i++)
      day[i] = new timenode();
    //月份开始的星期（周几）
    let startWeek = new Date(year,month-1,1).getDay();
    //如果是星期日，到第一个节点
    startWeek == 7 ? startWeek = 0 : 1 == 1;
    //月份对应天数的列表
    let monthList = [31, 28 + runNian(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //五行有可能容不下所有天分，small开关，true成为六行
    let smallSwitch = false;
    //如果所有天数大于35就开启small模式
    if (startWeek + monthList[month - 1] > 35)
      smallSwitch = true;
    //本月天数
    for (var i = startWeek; i < monthList[month - 1] + startWeek; i++) {
      day[i].day = i - (startWeek - 1);
      //isMonth属性代表是否是本月的日期，用于class控制
      day[i].isMonth = true;
    }
    //lastmonth
    for (var i = startWeek - 1; i >= 0; i--) {
      day[i].day = monthList[month - 2>0?month-2:11] - (startWeek - 1 - i);
      day[i].isMonth = false;
    }
    //nextmonth
    if (!smallSwitch)
      for (var i = monthList[month - 1] + startWeek; i < 35; i++) {
        day[i].day = i - (monthList[month - 1] + startWeek) + 1;
        day[i].isMonth = false
      }
    else
      for (var i = monthList[month - 1>0] + startWeek; i < 42; i++) {
        day[i].day = i - (monthList[month - 1] + startWeek) + 1;
        day[i].isMonth = false
      }
    let afteryear = year;
    let aftermonth = month + 1;
    let beforeyear = year;
    let beforemonth = month - 1;
    if(aftermonth > 12){
      aftermonth = 1;
      afteryear++;
    }
    if(beforemonth < 1){
      beforemonth = 12;
      beforeyear--;
    }
    let dataa = {
      day: day,
      smallSwitch: smallSwitch,
      isToday: isToday,
      afteryear: afteryear,
      aftermonth: aftermonth,
      beforeyear: beforeyear,
      beforemonth: beforemonth,
      tomonth: month,
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      toyear: now.getFullYear()
    };
    this.setData({
      year: year,
      month: month,
      nowmonth: dataa
    });
    let tempyear = beforeyear;
    let tempmonth = beforemonth;
     now = new Date();
     year = afteryear;
     month = aftermonth;
    //日期节点列表
     day = [];
    //初始化列表
    for (var i = 0; i < 42; i++)
      day[i] = new timenode();
    //月份开始的星期（周几）
     startWeek = new Date(year,month-1,1).getDay();
    //如果是星期日，到第一个节点
    startWeek == 7 ? startWeek = 0 : 1 == 1;
    //月份对应天数的列表
     monthList = [31, 28 + runNian(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //五行有可能容不下所有天分，small开关，true成为六行
     smallSwitch = false;
    //如果所有天数大于35就开启small模式
    if (startWeek + monthList[month - 1] > 35)
      smallSwitch = true;
    //本月天数
    for (var i = startWeek; i < monthList[month - 1] + startWeek; i++) {
      day[i].day = i - (startWeek - 1);
      //isMonth属性代表是否是本月的日期，用于class控制
      day[i].isMonth = true;
    }
    //lastmonth
    for (var i = startWeek - 1; i >= 0; i--) {
      day[i].day = monthList[month - 2>0?month-2:11] - (startWeek - 1 - i);
      day[i].isMonth = false;
    }
    //nextmonth
    if (!smallSwitch)
      for (var i = monthList[month - 1] + startWeek; i < 35; i++) {
        day[i].day = i - (monthList[month - 1] + startWeek) + 1;
        day[i].isMonth = false
      }
    else
      for (var i = monthList[month - 1>0] + startWeek; i < 42; i++) {
        day[i].day = i - (monthList[month - 1] + startWeek) + 1;
        day[i].isMonth = false
      }
     afteryear = year;
     aftermonth = month + 1;
     beforeyear = year;
     beforemonth = month - 1;
    if(aftermonth > 12){
      aftermonth = 1;
      afteryear++;
    }
    if(beforemonth < 1){
      beforemonth = 12;
      beforeyear--;
    }
     dataa = {
      day: day,
      smallSwitch: smallSwitch,
      isToday: isToday,
      afteryear: afteryear,
      aftermonth: aftermonth,
      beforeyear: beforeyear,
      beforemonth: beforemonth,
      tomonth: now.getMonth() + 1,
      year: year,
      month: month,
      toyear: now.getFullYear()
    };
    this.setData({
      post: dataa
    });
     now = new Date();
     year = tempyear;
     month = tempmonth;
    //日期节点列表
     day = [];
    //初始化列表
    for (var i = 0; i < 42; i++)
      day[i] = new timenode();
    //月份开始的星期（周几）
     startWeek = new Date(year,month-1,1).getDay();
    //如果是星期日，到第一个节点
    startWeek == 7 ? startWeek = 0 : 1 == 1;
    //月份对应天数的列表
     monthList = [31, 28 + runNian(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //五行有可能容不下所有天分，small开关，true成为六行
     smallSwitch = false;
    //如果所有天数大于35就开启small模式
    if (startWeek + monthList[month - 1] > 35)
      smallSwitch = true;
    //本月天数
    for (var i = startWeek; i < monthList[month - 1] + startWeek; i++) {
      day[i].day = i - (startWeek - 1);
      //isMonth属性代表是否是本月的日期，用于class控制
      day[i].isMonth = true;
    }
    //lastmonth
    for (var i = startWeek - 1; i >= 0; i--) {
      day[i].day = monthList[month - 2>0?month-2:11] - (startWeek - 1 - i);
      day[i].isMonth = false;
    }
    //nextmonth
    if (!smallSwitch)
      for (var i = monthList[month - 1] + startWeek; i < 35; i++) {
        day[i].day = i - (monthList[month - 1] + startWeek) + 1;
        day[i].isMonth = false
      }
    else
      for (var i = monthList[month - 1>0] + startWeek; i < 42; i++) {
        day[i].day = i - (monthList[month - 1] + startWeek) + 1;
        day[i].isMonth = false
      }
     afteryear = year;
     aftermonth = month + 1;
     beforeyear = year;
     beforemonth = month - 1;
    if(aftermonth > 12){
      aftermonth = 1;
      afteryear++;
    }
    if(beforemonth < 1){
      beforemonth = 12;
      beforeyear--;
    }
     dataa = {
      day: day,
      smallSwitch: smallSwitch,
      isToday: isToday,
      afteryear: afteryear,
      aftermonth: aftermonth,
      beforeyear: beforeyear,
      beforemonth: beforemonth,
      tomonth: now.getMonth() + 1,
      year: year,
      month: month,
      toyear: now.getFullYear()
    }
    this.setData({
      pre: dataa
    });
  },
  changeDate: function (e){
    var num = e.detail.current - this.data.currentTap;
    let index = this.data.currentTap;
    let year, month;
    if(num == -2 || num == 1) {
      this.setData({move: 1});
      if(index == 0){
         year =  this.data.post.afteryear;
         month =  this.data.post.aftermonth;
       }
      else if(index == 1){
         year =  this.data.pre.afteryear;
         month =  this.data.pre.aftermonth;
       }
      else{
         year =  this.data.nowmonth.afteryear;
         month =  this.data.nowmonth.aftermonth;  
      }      
      setDate.call(this, new Date(year, month - 1, 1));
      console.log(index);
      console.log(year);
      console.log(month);
    } 
    else {
      this.setData({move: -1});
      if(index == 0){
         year =  this.data.pre.beforeyear;
         month =  this.data.pre.beforemonth;
       }
      else if(index == 1){
         year =  this.data.nowmonth.beforeyear;
         month =  this.data.nowmonth.beforemonth;
       }
      else{
         year =  this.data.post.beforeyear;
         month =  this.data.post.beforemonth;
         }        
      setDate.call(this, new Date(year, month - 1, 1));
      console.log(index);
      console.log(year);
      console.log(month);
    }
    this.setData({ currentTap: e.detail.current });
  }
});