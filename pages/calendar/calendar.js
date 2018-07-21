const app = getApp();


Page({
  data: {
    year: 0,
    month: 0,
    day: [] 
  },
  onLoad: function(){
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = [];
    this.initdata();
    this.setData({
      year: year,
      month: month,
      day: day
    })
  },
  initdata: function(){
    let 
  }
});