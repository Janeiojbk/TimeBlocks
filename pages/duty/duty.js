var time = 0;
var touchDot = 0;//触摸时的原点
var interval = "";
var flag_hd = true;
var that = this;
const app = getApp();
//agenda对象构造函数
function newAgenda() {
  this.color = "rgb(62,168,244)";
  this.dutyname = "have something bug";
}
function AgendaSize(){
  this.color = "rgb(62,168,244)";
  this.name = "have something bug";
  this.size = 1;
  this.position = 1;
}
Page({

  /**
  * 页面的初始数据
  */
  data: {
    startDate: 0,
    finshDate: 0,
    weekData: {},
    font: "",
    arr: [],
    sysW: null,
    lastDay: null,
    firstDay: null,
    weekArr: ['一', '二', '三', '四', '五', '六'],
    year: null,
    day: null,
    checkindex: 0,
    ballTop: 0,
    ballLeft: 0,
    screenHeight: 0,
    screenWidth: 0,
    text: "没有滑动",
    mHidden: true,
    datelist: getApp().list,
    showDetailStatuse: false,
    showModalStatus: false,
    showChoose: false,
    isFocus: false,
    isChecked: false,
    startDate: 0,
    finshDate: 0,
    chooseColor: 1,
    agendaList: [],
    //注意这里是欧day不是零day，用于设置今天的时间（这个当时必须加，现在有点忘了为什么了）
    Oday: 0,
    //用于用户端显示星期列表
    weeklist: ['一', '二', '三', '四', '五', '六'],
  },

  onShow: function () {
    flag_hd = true; //重新进入页面之后，可以再次执行滑动切换页面代码
    clearInterval(interval); // 清除setInterval
    time = 0;
  },
  changePage: function(e){
    wx.redirectTo({
      url: "../calendar/calendar"
    })
  },
  test: function (event) {

    let pageX = event.touches[0].pageX;
    let pageY = event.touches[0].pageY;
    if (pageX < 30 || pageY < 30)
      return;
    if (pageX > this.data.screenWidth - 30)
      return;
    if (pageY > this.data.screenHeight - 30)
      return;
    this.setData({
      ballTop: event.touches[0].pageY - 30,
      ballLeft: event.touches[0].pageX - 30,
    });

  },
  next: function (res) {

    if (this.data.endDay < this.data.getDate) {

      this.onLoad(res, this.data.year, this.data.month, this.data.endDay, 2)
    }

    else if (this.data.lastDay == this.data.getDate && this.data.endDay != null) {
      this.onLoad(res, this.data.year, Number(this.data.month), 1, 2)
    }
    else if (this.data.lastDay != this.data.endDay) {

      this.onLoad(res, this.data.year, Number(this.data.month - 1), Number(this.data.endDay + 1), 2)
    }
    else {

      this.data.endDay = 0
      this.onLoad(res, this.data.year, Number(this.data.month), 1, 2)
    }
  },
  last: function (res) {
    if (this.data.startDay < 7) {
      this.onLoad(res, this.data.year, this.data.month - 1, this.data.startDay - 1)
    }
    else if (this.data.startDay > this.data.endDay && this.data.font == 1) {
      this.onLoad(res, this.data.year, this.data.month - 2, this.data.startDay)
    }
    else {
      this.onLoad(res, this.data.year, this.data.month - 1, this.data.startDay - 7)
    }
  },
  //获取日历相关参数
  dataTime: function (year, month, day, state) {

    var last = this.data.lastDay
    var date = new Date(year, month, day);
    if (year == null) {
      date = new Date()
    }
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var months = date.getMonth() + 1;

    //获取现今年份
    this.data.year = year;

    //获取现今月份
    this.data.month = months;

    //获取今日日期
    this.data.getDate = date.getDate();

    //最后一天是几号
    var d = new Date(year, months, 0);

    this.data.lastDay = d.getDate();
    //第一天星期几



    let firstDay
    if (state == 1) {

      if (d.getDate() == date.getDate()) {
        if (this.data.startDay == 1) {
          firstDay = new Date(year, Number(month), Number(new Date(year, month - 1, 0).getDate() - 6));
        }
        else if (this.data.startDay <= 7) {

          firstDay = new Date(year, Number(month), Number(new Date(year, month - 1, 0).getDate() - 8));
        }
        else {
          firstDay = new Date(year, Number(month), Number(new Date(year, month - 1, 0).getDate() - 7));
        }

      }
      else if (this.data.startDay >= 6) {

        if (month == 11 && this.data.endDay > this.data.startDay && this.data.startDay != 16 && this.data.startDay != 9) {
          if (this.data.endDay <= 23) {

            firstDay = new Date(year, Number(month + 1), day);
          }
          else {

            firstDay = new Date(year, Number(month), day);
          }

        }
        else if (this.data.startDay == 8) {
          firstDay = new Date(year, Number(month), day - 4);
        }
        else {
          if (this.data.startDay == 6 && this.data.year != 2018 && this.data.month != 4) {
            this.data.month = Number(this.data.month + 1)
            firstDay = new Date(year, Number(month + 1), day);
          }
          else if (this.data.year == 2018 && this.data.month == 4) {
            firstDay = new Date(year, Number(month), day);
          }
          else {
            firstDay = new Date(year, Number(month - 1), day);
          }

        }

      }
      else {
        if (this.data.startDay == 4 && month == 2) {

          firstDay = new Date(year, Number(month - 1), Number(new Date(year, month - 1, 0).getDate() - day + 1));

        }
        else if (month == 1) {

          firstDay = new Date(year, Number(month), Number(new Date(year, month - 1, 0).getDate() - day + 2));
        }

      }
    }
    else if (state == 2) {

      if (this.data.endDay == last && last != null) {

        firstDay = new Date(year, month, 1);

      }
      else {
        firstDay = new Date(year, Number(month), Number(1 + this.data.endDay));
      }
    }
    else {
      firstDay = new Date(year, month, day);
    }
    this.data.firstDay = firstDay.getDay();
    this.setData({
      getWeek: date.getDay()
    })
  },
  touchStart: function (e) {
    touchDot = e.touches[0].pageX; // 获取触摸时的原点
    // 使用js计时器记录时间 
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  // 触摸结束事件
  touchEnd: function (e) {
    var touchMove = e.changedTouches[0].pageX;
    // 向左滑动 
    if (touchMove - touchDot <= -20 && time < 10) {

      //执行切换页面的方法
      this.next()
    }
    // 向右滑动 
    if (touchMove - touchDot >= 20 && time < 10) {

      //执行切换页面的方法
      this.last()
    }
    clearInterval(interval); // 清除setInterval
    time = 0;

  },
  onLoad: function (options, year, month, day, state) {
      if(app.globalData.session_key)
          this.setData({
            datelist: app.list
          })
      else{
          app.loadduty = res => {
            this.setData({
                datelist: app.list
            })
          }
      }
    this.setData({
      weekData: app.monthData
    })
    let realweek = this.data.weekData.day.slice((app.row-1)*7,(app.row-1)*7+7)
    let agendaLi
    let now1 = new Date()
   var startDate = now1.getFullYear() + '-' + ((now1.getMonth() + 1)<10?'0'+(now1.getMonth() + 1):(now1.getMonth() + 1)) + '-' + (now1.getDate()<10?'0'+now1.getDate():now1.getDate());
    var finishDate = now1.getFullYear() + '-' + ((now1.getMonth() + 1)<10?'0'+(now1.getMonth() + 1):(now1.getMonth() + 1)) + '-' + (now1.getDate()<10?'0'+now1.getDate():now1.getDate());
    switch(app.row){
      case 1: agendaLi = this.data.weekData.dutyListFir; break;
      case 2: agendaLi = this.data.weekData.dutyListSec; break;
      case 3: agendaLi = this.data.weekData.dutyListThr; break;
      case 4: agendaLi = this.data.weekData.dutyListFor; break;
      case 5: agendaLi = this.data.weekData.dutyListFiv; break;
      case 6: agendaLi = this.data.weekData.dutyListSix; break;
    }
    this.setData({
      startDate: startDate,
      finshDate: finishDate,
      ['weekData.dutyList']: agendaLi,
      ['weekData.day']: realweek
    })
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth,
          font: ""
        });
      }
    });
    this.dataTime(year, month, day, state);
    var two;

    //根据今天是星期几，几号获得周的日期
    var res = wx.getSystemInfoSync();
    var date = ""
    if (this.data.getWeek == 0) {
      date = this.data.getDate
    }
    else if (this.data.getDate <= this.data.getWeek) {
      two = 1
      date = 1
    }
    else {
      date = this.data.getDate - Number(this.data.getWeek)
    }
    var num = Number(this.data.getDate + (6 - this.data.getWeek));


    if (num > this.data.lastDay) {
      num = this.data.lastDay
    }

    var cha = Number(this.data.lastDay - date)
    var endDay;


    this.data.arr = []
    var startDay = date;
    if (two == 1) {
      this.setData({
        font: 1
      })
      var last = new Date(this.data.year, this.data.month - 1, 1).getDay()
      var start = new Date(this.data.year, this.data.month - 1, 0).getDate()
      var now = start - last + 1
      var newdate = new Date(this.data.year, this.data.month - 1, now)
      startDay = newdate.getDate()
      for (var i = startDay; i <= start; i++) {
        this.data.arr.push(i);
      }
    }

    for (var i = date; i <= num; i++) {

      this.data.arr.push(i);
      endDay = i;
    }

    if (cha < 6) {
      this.setData({
        font: 2
      })
      for (var i = 1; i <= (6 - cha); i++) {
        this.data.arr.push(i);
        endDay = i;
      }
    }


    this.setData({
      sysW: res.windowHeight / 12,//更具屏幕宽度变化自动设置宽度
      marLet: this.data.firstDay,
      arr: this.data.arr,
      year: this.data.year,
      getDate: this.data.getDate,
      month: this.data.month,
      endDay: endDay,
      startDay: startDay
    });


  },



  powerDrawerDetail: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    var day = parseInt(e.currentTarget.dataset.day) - 1;
    //以下用于筛选当天含有的所有日程  
    if (0 <= day && day <= 41) {
      let nowpage = this.data.currentTap;
      if (nowpage == 0)
        nowpage = this.data.nowmonth;
      else if (nowpage == 1)
        nowpage = this.data.post;
      else
        nowpage = this.data.pre;
      let thisDay = nowpage.day[day];
      let now = new Date(thisDay.year, thisDay.month - 1, thisDay.day);
      let agendaList = [];
      for (var i = 0; i < app.schedule.length; i++) {
        let event = app.schedule[i];
        let startDate = event.startDate.split('-');
        let finishDate = event.finishDate.split('-');
        for (let i = 0; i < startDate.length; i++) {
          startDate[i] = parseInt(startDate[i]);
          finishDate[i] = parseInt(finishDate[i]);
        }
        startDate = new Date(startDate[0], startDate[1] - 1, startDate[2]);
        finishDate = new Date(finishDate[0], finishDate[1] - 1, finishDate[2]);
        if (now >= startDate && now <= finishDate)
          agendaList.push(event);
      }
      this.setData({
        agendaList: agendaList,
        Oday: day
      });
    }
    this.utilDetail(currentStatu);
  },
  utilDetail: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData({
          showDetailStatus: false
        });
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData({
        showDetailStatus: true
      });
    }
  },
  //删除方法
  deleteA: function (e) {
    let name = e.currentTarget.dataset.name;
    for (var i = 0; i < app.schedule.length; i++) {
      if (name.name == app.schedule[i].name && name.color == app.schedule[i].color && name.startDate == app.schedule[i].startDate && name.finishDate == app.schedule[i].finishDate) {
        app.schedule.splice(i, 1);
        console.log(name);
        break;
      }
    }
    let day = this.data.Oday;
    let nowpage = this.data.currentTap;
    if (nowpage == 0)
      nowpage = this.data.nowmonth;
    else if (nowpage == 1)
      nowpage = this.data.post;
    else
      nowpage = this.data.pre;
    let thisDay = nowpage.day[day];
    let now = new Date(thisDay.year, thisDay.month - 1, thisDay.day);
    let agendaList = [];
    for (var i = 0; i < app.schedule.length; i++) {
      let event = app.schedule[i];
      let startDate = event.startDate.split('-');
      let finishDate = event.finishDate.split('-');
      for (let i = 0; i < startDate.length; i++) {
        startDate[i] = parseInt(startDate[i]);
        finishDate[i] = parseInt(finishDate[i]);
      }
      startDate = new Date(startDate[0], startDate[1] - 1, startDate[2]);
      finishDate = new Date(finishDate[0], finishDate[1] - 1, finishDate[2]);
      if (now >= startDate && now <= finishDate)
        agendaList.push(event);
    }
    this.setData({
      agendaList: agendaList,
      Oday: day
    });
    loadSche.call(this);
  },

  //add页面开关函数
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    //这个函数用于完成动画效果
    this.util(currentStatu)
  },
  // add页面日程/任务切换开关函数
  changeAdd: function (e) {
    var currentStatu = e.currentTarget.dataset.status;
    if (currentStatu == 'true')
      this.setData({ showChoose: true });
    else
      this.setData({ showChoose: false });
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },

  changecheck: function (e) {
    var id = e.currentTarget.dataset.index;
    app.list[id].check = !app.list[id].check
    var compare = function(prop){
    return function (obj1, obj2) {
          var val1 = obj1[prop];
          var val2 = obj2[prop];
          if (val1 < val2) {
              return -1;
          } else if (val1 > val2) {
              return 1;
          } else {
              return 0;
          }            
      } 
    }
    app.list.sort(compare("check"));
    this.setData({
      datelist: app.list
    })
  },

  remove: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.index;
    var items = getApp().list
    items.splice(id, 1);
    getApp().list = items;
    this.setData({
      datelist: getApp().list,
    })
  },

  //输入框得到焦点开关函数
  getFocus: function () {
    this.setData({ isFocus: true });
  },
  loseFocus: function () {
    this.setData({ isFocus: false });
  },
  // 用于time-picker保存数据
  startDate: function (e) {
    this.setData({ startDate: e.detail.value })
  },
  finshDate: function (e) {
    this.setData({ finshDate: e.detail.value })
  },
  //选择color
  changeColor: function (e) {
    var colorNum = parseInt(e.currentTarget.dataset.color);
    this.setData({ chooseColor: colorNum });
  },
  //保存事件对象到全局列表
  saveEvent: function (e) {
    let agenda = new newAgenda();
    agenda.dutyname = e.detail.value.dutyname;
    agenda.check = false;
    app.list.push(agenda);
    var compare = function(prop){
    return function (obj1, obj2) {
          var val1 = obj1[prop];
          var val2 = obj2[prop];
          if (val1 < val2) {
              return -1;
          } else if (val1 > val2) {
              return 1;
          } else {
              return 0;
          }            
      } 
    }
    app.list.sort(compare("check"));
    this.setData({
      datelist: getApp().list,
    });
  },
  //保存事件对象到全局列表
  saveEventA: function(e){
    console.log('ok')
    console.log(app.schedule)
    let agenda = new newAgenda();
    agenda.name = e.detail.value.name;
    agenda.startDate = e.detail.value.start;
    agenda.finishDate = e.detail.value.finish;
    let color;
    switch(parseInt(this.data.chooseColor)){
      case 1: color = 'rgb(62,168,244)'; break; 
    case 2: color = 'rgb(186,127,208)'; break;
    case 3: color = 'rgb(246,49,62)'; break;
    case 4: color = 'rgb(113,212,73)'; break;
    case 5: color = 'rgb(254,75,0)'; break;
    case 6: color = 'rgb(125,159,195)'; break;
    case 7: color = 'rgb(252,145,162)'; break;
    case 8: color = 'rgb(104,200,185)'; break;
    }
    app.schedule.push(agenda);
    let getrow = function(monthData, row){
                //定义列表
          let rowList = [];
          const app = getApp();
          //app.schedule是全局事件列表对象
          //下面遍历列表，将符合条件的事件写入rowList
          for(let i = 0; i < app.schedule.length; i++){
            let event = app.schedule[i];
            let startDate = event.startDate.split('-');
            let finishDate =event.finishDate.split('-');
            for (let i=0;i<startDate.length;i++){
              startDate[i] = parseInt(startDate[i]);
              finishDate[i] = parseInt(finishDate[i]);
            }
            startDate = new Date(startDate[0],startDate[1]-1,startDate[2]);
            finishDate = new Date(finishDate[0], finishDate[1]-1, finishDate[2]);
            //一点点小优化，可以省去一些不在本月的日程的加载时间
            if(finishDate.getFullYear() < monthData.year){
              continue;
            }
            else{
              if(finishDate.getFullYear == monthData.year && finishDate.getMonth()+1<monthData.month)
                continue;
            }
            if(startDate.getFullYear() > monthData.year)
              continue;
            else{
              if(startDate.getFullYear == monthData.year && startDate.getMonth()+1>monthData.month)
                continue;
            }
            //得到该行第一天，最后一天的数据
            let firstDay, endDay;
            switch(row){
              case 1: 
                firstDay = monthData.day[0];
                endDay = monthData.day[6];
                break; 
              case 2: 
                firstDay = monthData.day[7];
                endDay = monthData.day[13];
                break; 
              case 3: 
                firstDay = monthData.day[14];
                endDay = monthData.day[20];
                break; 
              case 4: 
                firstDay = monthData.day[21];
                endDay = monthData.day[27];
                break; 
              case 5: 
                firstDay = monthData.day[28];
                endDay = monthData.day[34];
                break; 
              case 6: 
                firstDay = monthData.day[35];
                endDay = monthData.day[41];
                break; 
            }
            firstDay = new Date(firstDay.year, firstDay.month-1, firstDay.day);
            endDay = new Date(endDay.year, endDay.month-1, endDay.day);
            //如果事件的开始时间在该行最后一天之前并且事件的结束时间在该行第一天之后，那么符合条件。
            if(startDate<=endDay&&finishDate>=firstDay&&startDate<=finishDate){
              let item = new AgendaSize();
              let position = (startDate - firstDay)/(1000*60*60*24);
              let size;
              let sflag = firstDay >= startDate;
              let fflag = endDay <= finishDate;
              if(sflag&&fflag)
                size = 7;
              else if(sflag&&!fflag)
                size = (finishDate - firstDay)/(1000*60*60*24) + 1;
              else if(!sflag&&fflag)
                size = (endDay - startDate)/(1000*60*60*24) + 1;
              else
                size = (finishDate - startDate)/(1000*60*60*24) + 1;
              let color = event.color;
              let name = event.name;
              if(position<0){
                position = 0;
              }
              item = {
                position: position,
                size: size,
                color: color,
                name: name
              };
              item.flag = true;
              rowList.push(item);
            }
          }
          //开始排序，以便营造出积木效果
          /*
           *  排序方法：先把事件列表按position排序，这样就可以把前面的放在前面，在在这个事件的后面放入能放的，即达到积木的效果
           */
          var compare = function(prop){
            return function (obj1, obj2) {
                  var val1 = obj1[prop];
                  var val2 = obj2[prop];
                  if (val1 < val2) {
                      return -1;
                  } else if (val1 > val2) {
                      return 1;
                  } else {
                      return 0;
                  }            
              } 
            }
            rowList.sort(compare("size"));
          rowList.sort(compare("position"));
          var finalList = [];
          /* 
           * height用于css控制，当高度超过四个的时候，把行高度变大
           */
          var height = 0;
          for(var i=0; i <rowList.length; i++){
            let space = rowList[i].position + rowList[i].size;
            if(rowList[i].flag){
              height++;
              rowList[i].flag = false;
              finalList.push(rowList[i]);
              for(var j = i+1;j<rowList.length; j++){
                if(rowList[j].position>=space&&space<7&&rowList[j].flag){
                  rowList[j].space = space;
                  rowList[j].inde = i;
                  rowList[j].position -= space;
                  space = rowList[j].size + rowList[j].position + space;
                  rowList[j].flag = false;

                  finalList.push(rowList[j]);
                }
              }
              if(space!=7){
                let bug = new newAgenda();
                bug = {name:'', position: 0, size: 7-space, color: '#fff'};
                finalList.push(bug);
              }
            }
          }
          return {list: finalList, height: height};
    }
    var agendaLi = getrow(app.monthData, app.row)
    this.setData({
      ['weekData.dutyList']: agendaLi
    })
    var now = new Date();
    var startDate = now.getFullYear() + '-' + ((now.getMonth() + 1)<10?'0'+(now.getMonth() + 1):(now.getMonth() + 1)) + '-' + (now.getDate()<10?'0'+now.getDate():now.getDate());
    var finishDate = now.getFullYear() + '-' + ((now.getMonth() + 1)<10?'0'+(now.getMonth() + 1):(now.getMonth() + 1)) + '-' + (now.getDate()<10?'0'+now.getDate():now.getDate());
    this.setData({
      startDate: startDate,
      finshDate: finishDate,
      showChoose: true
    });
  }
})

