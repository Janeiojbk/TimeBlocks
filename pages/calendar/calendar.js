//得到app全局变量
const app = getApp();
//判断闰年 || 用于日历初始化列表
function runNian(_year){
  	if (_year % 400 === 0 || (_year % 4 === 0 && _year % 100 !== 0)){
    	return true;
  	}
  	else{
  		return false; 
  	}
}
/*
 *	用于设置Date中的monthDate(nowmonth,pre,post)对象
 *	主要用于初始化或在切换页面时改变数据
 *	接收一个Date类型对象（可选）
 */
function setDate(date) {
	//如果没有接收到Date对象，就new为现在的日期对象
  	let now = date || new Date();
  	let year = now.getFullYear();
  	let month = now.getMonth() + 1;
  	let isToday = now.getDate() - 1;
  	//日期节点列表
  	let day = [];
  	//以下计算明年明月昨年昨月的日期
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
  	//初始化列表
  	for (var i = 0; i < 42; i++){
  		//timenode是一个对象，在下面有其构造函数的声明
    	day[i] = new timenode();
  	}
  	//月份开始的星期（周几）
  	let startWeek = new Date(year,month-1,1).getDay();
  	//如果是星期日，到第一个节点
  	//startweek用于定位第一个当月日期在第一行中的星期位置，第一个位置下标是0，所以这里要把7改为0
  	startWeek == 7 ? startWeek = 0 : 1 == 1;
  	//月份对应天数的列表
  	let monthList = [31, 28 + runNian(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  	//五行（hang）有可能容不下所有日期，small开关，true成为六行也就是说用于css样式开关，比如9月就需要6行才容得下
  	let smallSwitch = false;
  	//如果所有天数大于35就开启small模式
  	if (startWeek + monthList[month - 1] > 35)
    	smallSwitch = true;
  	//本月天数
 	for (var i = startWeek; i < monthList[month - 1] + startWeek; i++){
    	day[i].day = i - (startWeek - 1);
    	//isMonth属性代表是否是本月的日期，用于class控制（本月的日期不为灰色）
    	day[i].isMonth = true;
    	//这个日期对应的年月
    	day[i].month = month;
    	day[i].year = year;
  	}
  	//lastmonth
  	for (var i = startWeek - 1; i >= 0; i--) {
    	day[i].day = monthList[month - 2>0?month-2:11] - (startWeek - 1 - i);
    	day[i].isMonth = false;
    	day[i].month = beforemonth;
    	day[i].year = beforeyear;
  	}
  	//nextmonth
  	if (!smallSwitch)
	    for (var i = monthList[month - 1] + startWeek; i < 35; i++) {
	      	day[i].day = i - (monthList[month - 1] + startWeek) + 1;
	      	day[i].isMonth = false;
	      	day[i].month = aftermonth;
	      	day[i].year = afteryear;
	    }
  	else
  		//如果用六行，需要初始化42个日期（6*7 == 42）
	    for (var i = monthList[month - 1] + startWeek; i < 42; i++) {
	      	day[i].	day = i - (monthList[month - 1] + startWeek) + 1;
	      	day[i].isMonth = false;
	      	day[i].month = aftermonth;
	      	day[i].year = afteryear;
	    }
	//以下开始鬼畜。
  	let today, tomonth, toyear;
  	/*
  	 * this.data.move 是用来判断手指滑动方向的，在程序开始move是0，手指向右滑动后为1，向左滑动后为-1
  	 * this.data.currentTap对应着页面，在swiper里，一共有三个页面，0：nowmonth，1: post，2:pre，初始化为1。
  	 */
  	 //这里是为了得到今天的数据，方便进行css控制（今天会有特殊的渲染），if条件是刚刚初始化时的数据，用于判断是不是now
  	if(this.data.move == 0 && this.data.currentTap == 1){
	  	today = isToday;
	  	tomonth = month;
	  	toyear = year;
	}
	//如果不是now，就使用已经初始化好的now数据
	else{
	  	today = this.data.nowmonth.isToday;
	  	tomonth = this.data.nowmonth.tomonth;
	  	toyear = this.data.nowmonth.toyear;		
	}
	//monthdata对象，用于赋值
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
	 //上面的aftermonth之类的是那个页面下的，下面的Aftermonth是相对于今天的
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
  	//以下用于在切换页面时改变数据，三个页面轮播，只需要改变一个页面的数据就可以完成
  	//例如，目前是0，向右滑动，那么只需要把2的数据改为相对1的下一个月份的数据就好了
  	if(move == 1){
    	if(index == 0)
    	  	this.setData({pre: dataa});
    	else if(index == 1)
      		this.setData({nowmonth: dataa});
    	else
      		this.setData({post: dataa});
    	this.setData({year: afteryear, month: aftermonth})
  	}
  	else if(move == 0){
  		if(index == 0)
      		this.setData({pre: dataa});
    	else if(index == 1)
      		this.setData({nowmonth: dataa});
    	else
      		this.setData({post: dataa});
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
/*
 *	用于得到页面下，每一行的事件列表，将事件对象属性如下
 *	{
 *		position:  位置
 *		size: 所占列数
 *		color: 颜色
 *		name: 事件名称（也就是具体事件是什么）
 *	}
 *	以上属性在模板中表现出来
 */
function getRowSche(monthData, row){
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
	 *	排序方法：先把事件列表按position排序，这样就可以把前面的放在前面，在在这个事件的后面放入能放的，即达到积木的效果
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
/*
 *	这个函数目的是初始化每个页面所有的行，主要通过调用getRowSche也就是上一个函数完成
 */
function loadSche(){
	let dutyListFir,dutyListSec,dutyListThr,dutyListFor,dutyListFiv,dutyListSix;

	dutyListFir = getRowSche(this.data.nowmonth, 1);
	dutyListSec = getRowSche(this.data.nowmonth, 2);
	dutyListThr = getRowSche(this.data.nowmonth, 3);
	dutyListFor = getRowSche(this.data.nowmonth, 4);
	dutyListFiv = getRowSche(this.data.nowmonth, 5);
	dutyListSix = getRowSche(this.data.nowmonth, 6);
	this.setData({
		["nowmonth.dutyListFir"]: dutyListFir,
		["nowmonth.dutyListSec"]: dutyListSec,
		["nowmonth.dutyListThr"]: dutyListThr,
		["nowmonth.dutyListFor"]: dutyListFor,
		["nowmonth.dutyListFiv"]: dutyListFiv,
		["nowmonth.dutyListSix"]: dutyListSix
	});
	dutyListFir = getRowSche(this.data.pre, 1);
	dutyListSec = getRowSche(this.data.pre, 2);
	dutyListThr = getRowSche(this.data.pre, 3);
	dutyListFor = getRowSche(this.data.pre, 4);
	dutyListFiv = getRowSche(this.data.pre, 5);
	dutyListSix = getRowSche(this.data.pre, 6);
	this.setData({
		["pre.dutyListFir"]: dutyListFir,
		["pre.dutyListSec"]: dutyListSec,
		["pre.dutyListThr"]: dutyListThr,
		["pre.dutyListFor"]: dutyListFor,
		["pre.dutyListFiv"]: dutyListFiv,
		["pre.dutyListSix"]: dutyListSix
	});
	dutyListFir = getRowSche(this.data.post, 1);
	dutyListSec = getRowSche(this.data.post, 2);
	dutyListThr = getRowSche(this.data.post, 3);
	dutyListFor = getRowSche(this.data.post, 4);
	dutyListFiv = getRowSche(this.data.post, 5);
	dutyListSix = getRowSche(this.data.post, 6);
	this.setData({
		["post.dutyListFir"]: dutyListFir,
		["post.dutyListSec"]: dutyListSec,
		["post.dutyListThr"]: dutyListThr,
		["post.dutyListFor"]: dutyListFor,
		["post.dutyListFiv"]: dutyListFiv,
		["post.dutyListSix"]: dutyListSix
	});
}
// timenode对象构造函数
function timenode(){
	this.day = 0;
	this.month = 0;
	this.year = 0;
	this.isMonth = true;
	this.isChoose = false;
}
//agenda对象构造函数
function newAgenda(){
	this.startDate = "2018-07-26";
	this.finishDate = "2018-07-26";
	this.color = "rgb(62,168,244)";
	this.name = "have something bug";
}
//这个对象是真正用到前端的事件
function AgendaSize(){
	this.color = "rgb(62,168,244)";
	this.name = "have something bug";
	this.size = 1;
	this.position = 1;
}
//月份日期对象构造函
function monthData(){
	this.day = [];
	this.year = 0;
	this.month = 0;
	this.isToday = 0;
	this.tomonth = 0;
	this.toyear = 0;
	this.afteryear = 0;
	this.aftermonth = 0;
	this.beforeyear = 0;
	this.beforemonth = 0;
	this.smallSwitch = false;
	this.dutyListFir = [];
	this.dutyListSec = [];
	this.dutyListThr = [];
	this.dutyListFor = [];
	this.dutyListFiv = [];
	this.dutyListSix = [];
}
//页面注册函数
Page({
  	data: {
	    isLogin: false,
  		//move 主要用于记录页面滚动的方向
	    move: 0,
	    //当前页面的index
	    currentTap: 1,
	    year: 0,
	    month: 0,
	    //这个用于控制添加页面是否展现出现
	    showModalStatus: false,
	    //这个用于控制详情页面是否展现出现
	    showDetailStatuse: false,
	    //这个用于add页面，显示日程还是任务
	    showChoose: true,
	    //用于输入框css样式，输入框聚焦时会高亮
	    isFocus: false,
	    //用于time-picker记录
	    startDate: 0,
	    finshDate: 0,
	    chooseColor: 1,
	    agendaList: [],
	    //注意这里是欧day不是零day，用于设置今天的时间（这个当时必须加，现在有点忘了为什么了）
	    Oday: 0,
	    //用于用户端显示星期列表
	    weeklist: ['一','二','三','四','五','六'],
	    //三个页面对象，nowmonth第一个，post第二个,pre第三个
	    nowmonth: new monthData(),
	    post: new monthData(),
	    pre: new monthData  
  	},
  	//本月，上月份，下月份date列表初始化
  	onLoad: function(){
  		if(app.globalData.session_key)
	      	this.setData({
	        	isLogin: true
	      	})
    	else{
      		app.openidReadyCallback = res => {
	        	this.setData({
	          		isLogin: true
	        	})
	        	loadSche.call(this);
      		}
    	}
  		let now = new Date();
  		//设置nowmonth界面
  		setDate.call(this);
  		app.monthData = this.data.nowmonth;
  		//月份开始的星期（周几）
  		let startWeek = new Date(now.getFullYear(),now.getMonth(),1);
  		startWeek = (startWeek.getDay()==7)?0:startWeek.getDay()
  		app.row = parseInt((now.getDate()+startWeek)/8+1)
  		//设置post界面数据
  		this.setData({ currentTap: 2 });
  		setDate.call(this, new Date(this.data.nowmonth.afteryear, this.data.nowmonth.aftermonth - 1, 1));
   		//设置pre界面数据
  		this.setData({ currentTap: 0 });
  		setDate.call(this, new Date(this.data.nowmonth.beforeyear, this.data.nowmonth.beforemonth - 1, 1));
  		var list = 'nowmonth.dutyListFir'
  		var startDate = now.getFullYear() + '-' + ((now.getMonth() + 1)<10?'0'+(now.getMonth() + 1):(now.getMonth() + 1)) + '-' + (now.getDate()<10?'0'+now.getDate():now.getDate());
  		var finishDate = now.getFullYear() + '-' + ((now.getMonth() + 1)<10?'0'+(now.getMonth() + 1):(now.getMonth() + 1)) + '-' + (now.getDate()<10?'0'+now.getDate():now.getDate());
    	this.setData({
  			month: now.getMonth() + 1,
  			year: now.getFullYear(), 
  			startDate: startDate,
  			finshDate: finishDate
  		});
  		loadSche.call(this);
  	},
  	//切换页面
  	changePage: function(e){
  		wx.redirectTo({
  			url: "../duty/duty"
  		})
  	},
  	//swiper切换页面对第三个未涉及页面改变date列表的回调函数
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
	    }
	    setDate.call(this, new Date(year, month - 1, 1));
	    this.setData({ currentTap: e.detail.current });
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
    	if(currentStatu == 'true')
    		this.setData({showChoose: true});
    	else
    		this.setData({showChoose: false});
  	}, 
  	util: function(currentStatu){  
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
  	//输入框得到焦点开关函数
  	getFocus: function(){
  		this.setData({ isFocus: true });
  	},  
  	loseFocus: function(){
  		this.setData({ isFocus: false });
  	} , 
  	// 用于time-picker保存数据
  	startDate: function(e){
  		this.setData({ startDate: e.detail.value })
  	},
  	finshDate: function(e){
  		this.setData({ finshDate: e.detail.value })
  	},
  	//选择color
  	changeColor: function(e){
  		var colorNum = parseInt(e.currentTarget.dataset.color);
  		this.setData({ chooseColor: colorNum});
  	},
  	//保存事件对象到全局列表
  	saveEvent: function(e){
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
  		agenda.color = color;
  		app.schedule.push(agenda);
  		loadSche.call(this);
  		var now = new Date();
  		var startDate = now.getFullYear() + '-' + ((now.getMonth() + 1)<10?'0'+(now.getMonth() + 1):(now.getMonth() + 1)) + '-' + (now.getDate()<10?'0'+now.getDate():now.getDate());
  		var finishDate = now.getFullYear() + '-' + ((now.getMonth() + 1)<10?'0'+(now.getMonth() + 1):(now.getMonth() + 1)) + '-' + (now.getDate()<10?'0'+now.getDate():now.getDate());
  		this.setData({
  			startDate: startDate,
  			finshDate: finishDate,
  			showChoose: true
  		});
  	},
  	//详情页面开关函数
	powerDrawerDetail: function (e) {  
    	var currentStatu = e.currentTarget.dataset.statu;
    	 var day = parseInt(e.currentTarget.dataset.day)-1;
    	 //以下用于筛选当天含有的所有日程  
    	if(0<=day&&day<=41){	
	    	let nowpage = this.data.currentTap;
	    	if(nowpage == 0)
	    		nowpage = this.data.nowmonth;
	    	else if(nowpage == 1)
	    		nowpage = this.data.post;
	    	else
	    		nowpage = this.data.pre;
	    	let thisDay = nowpage.day[day];
	    	let now = new Date(thisDay.year, thisDay.month-1, thisDay.day);
	    	let agendaList = [];
	    	for(var i=0;i<app.schedule.length;i++){
				let event = app.schedule[i];
				let startDate = event.startDate.split('-');
				let finishDate =event.finishDate.split('-');
				for (let i=0;i<startDate.length;i++){
					startDate[i] = parseInt(startDate[i]);
					finishDate[i] = parseInt(finishDate[i]);
				}
				startDate = new Date(startDate[0],startDate[1]-1,startDate[2]);
				finishDate = new Date(finishDate[0], finishDate[1]-1, finishDate[2]);
				if(now>=startDate&&now<=finishDate)
					agendaList.push(event);
	    	}  
	    	this.setData({
	    		agendaList: agendaList,
	    		Oday: day
	    	});
	    }
    	this.utilDetail(currentStatu);
  	},
  	//详情页面动画
  	utilDetail: function(currentStatu){  
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
  	deleteA: function(e){
  		let name = e.currentTarget.dataset.name;
  		for(var i=0;i<app.schedule.length;i++){
  			if(name.name == app.schedule[i].name&&name.color == app.schedule[i].color&&name.startDate == app.schedule[i].startDate&&name.finishDate == app.schedule[i].finishDate){
  				app.schedule.splice(i, 1);
  				break;
  			}
  		}
  		let day = this.data.Oday;
    	let nowpage = this.data.currentTap;
    	if(nowpage == 0)
    		nowpage = this.data.nowmonth;
    	else if(nowpage == 1)
    		nowpage = this.data.post;
    	else
    		nowpage = this.data.pre;
    	let thisDay = nowpage.day[day];
    	let now = new Date(thisDay.year, thisDay.month-1, thisDay.day);
    	let agendaList = [];
    	for(var i=0;i<app.schedule.length;i++){
			let event = app.schedule[i];
			let startDate = event.startDate.split('-');
			let finishDate =event.finishDate.split('-');
			for (let i=0;i<startDate.length;i++){
				startDate[i] = parseInt(startDate[i]);
				finishDate[i] = parseInt(finishDate[i]);
			}
			startDate = new Date(startDate[0],startDate[1]-1,startDate[2]);
			finishDate = new Date(finishDate[0], finishDate[1]-1, finishDate[2]);
			if(now>=startDate&&now<=finishDate)
				agendaList.push(event);
    	}  
    	this.setData({
    		agendaList: agendaList,
    		Oday: day
    	});
  		loadSche.call(this);
  	},
  	  //保存事件对象到全局列表
  saveEventB: function (e) {
    let agenda = new newAgenda();
    agenda.dutyname = e.detail.value.dutyname;
    agenda.check = false;
    app.list.push(agenda);
    this.setData({
      datelist: getApp().list,
    });
  }
});