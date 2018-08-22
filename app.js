App({
  /* 用于保存事件的数组
   * 数组储存的对象内容
   * {
   *    name:  //事件名称(字符串对象)
   *    startDate: //事件开始日期的日期对象(类型：Date)
   *    finishDate: //事件结束日期的日期对象（类型：Date）
   *    color: //事件在前端表示的颜色，以rgb形式储存(类型：字符串)
   * }
  */
  schedule: [],
  list: [],
  globalData: {
    openid: null,
    session_key: null
  },
  monthdata: {},
  row: 0,
  /*
   *  启动小程序时，从本地缓存中读取事件列表。
   */
  onLaunch: function(){
    var that = this;
    //第一次启动自动登录
    wx.login({
      success: function (res) {
        console.log(res.code)
        //发送请求
        wx.request({
          url: 'http://119.23.210.209/wxlogin.php', //接口地址
          data: { code: res.code },
          header: {
            'content-type': 'application/json' //默认值
          },
          success: function (res) {
            console.log(res.data)
            that.globalData.openid = res.data.openid
            that.globalData.session_key = res.data.session_key
            //初始化时得到云端数据
            wx.request({
              url: 'http://119.23.210.209/getAgenda.php', //接口地址
              data: { openid: that.globalData.openid },
              header: {
                'content-type': 'application/json' //默认值
              },
              success: res => {
                if(res.data.schedule){
                  that.schedule = res.data.schedule
                }
                if(res.data.list){
                  that.list = res.data.list
                  console.log('bug!')
                }
                console.log(that.schedule)
                //网络延迟
                //这里设置回调函数，主要作用是在登录后取消loading遮罩层
                if (that.openidReadyCallback) {
                  that.openidReadyCallback(res.data)
                }
                if(that.loadduty){
                  that.loadduty()
                }  
              }
            })
          }
        })
      }
    })
  },
  /*
   *  当小程序从后台进入前台，从本地缓存中读取事件列表。
   */
  onShow: function(){
    var that = this;
    wx.getStorage({
        key: 'Agenda',
        success: function(res) {
          if(res.data){
            that.schedule = res.data;
            console.log(res.data)
          }
        }
    }); 
    wx.getStorage({
        key: 'duty',
        success: function(res) {
          if(res.data){
            that.list = res.data;
            console.log(res.data)
          }
        }
    }); 
  },
  /*
   *  当小程序从前台进入后台，将列表储存到本地缓存。
   */
  onHide: function(){
    var that = this;
    wx.setStorage({
      key: 'Agenda',
      data: that.schedule
    });
    wx.setStorage({
      key: 'duty',
      data: that.list
    });
    wx.request({
      url: 'http://119.23.210.209/saveAgenda.php', //接口地址
      data: { 
        openid: that.globalData.openid,
        agenda: JSON.stringify(that.schedule), 
        duty: JSON.stringify(that.list) 
      },
      header: {
        'content-type': "application/x-www-form-urlencoded" //默认值
      },
      method: 'POST',
      success: res => {
        console.log(res)
      } 
    })
  }
});