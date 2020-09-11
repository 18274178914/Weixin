var util=require('../../utils/util.js');
var date=util.formaDate(new Date());
var datetime=util.formatTime(new Date())
var  wxCharts = require('../../utils/wxcharts.js'); // 引入wx-charts.js文件
var answer=require('../../utils/answer.js')
var yuelineChart=null
Page({
  data: {
      winWidth: 0,
      winHeight: 0,
      currentTab: 0,//tab切换
      Jiaoxuejia:[],//今日成绩
      duicuo:[],//答题情况
      duicuosum:[],//柱形图数据
      zhengqulv:[],//总排行
      uname:"",//学生姓名
      duicuozongshu:'',//答题情况总题数
      dui:'',//答题情况正确个数
      cuo:'',//答题情况错误个数
      truetihao:"",//答题情况正确题号
      falsetihao:"",//答题情况错误题号
      uId:'',//接收主页的用户ID
      classId:''
  },
  tishi:function(){//提示信息
    wx.showToast({
      title: '正在加载',
      icon:"loading",
      duration:2500,
      mask:true
    })
  },
  onLoad: function(options) {
      var that = this;
      console.log(options)
      that.setData({
        uId:options.uCode
      })
      that.tishi();
      /**
       * 获取当前设备的宽高
       */
      wx.getSystemInfo( {
          success: function( res ) {
              that.setData( {
                  winWidth: res.windowWidth,
                  winHeight: res.windowHeight
              });
          }
      });
      console.log(that.data.uId)
      var uId=that.data.uId
      wx.request({//根据学生ID  日期 查看该学生今日成绩
      url: 'https://zyservice.xicp.io/selectuIdanswerjia',
    //  url: 'http://localhost:8080/selectuIdanswerjia',

        data:{
          date:date,
          uId:uId
        },
        method:"GET",
        header: {
          'content-type': 'application/json' // 默认值
        }, 
        success (res) {
            let date=res.data.data;
            console.log(date)
            if (date!="") {
              date.forEach(function(item, index){
                console.log(item); //这里的item就是从数组里拿出来的每一个每一组
                 var sj=(util.crtTimeFtt(item.date));
                 item.date=sj;//将时间戳转时间并赋值  
                 var an=(answer.name(item.answer))
                 item.answer=an;
                 console.log(item.u_gender)
                 if(item.u_gender==0){
                   item.u_gender='女'
                 }  
                 if(item.u_gender==1){
                  item.u_gender='男'
                }                                     
              })  
              that.setData({
                Jiaoxuejia:res.data.data,
                uname:res.data.data[0].u_name,
                classId:res.data.data[0]._id
               })      
               var query = wx.createSelectorQuery()
              query.select('#test').boundingClientRect(function(heihgt) {
                that.setData({
                  winHeight:heihgt.height+60
                })
                console.log(heihgt);
              }).exec();
            } else {
              wx.showToast({
                title: '没有数据',
                duration: 2000  
              })
            }
        }
      })
  },
    
//  tab切换逻辑
  swichNav: function(e) {
      var that = this;
      that.setData({
        truetihao:'',
        falsetihao:'' 
      })
      if( this.data.currentTab === e.target.dataset.current ) {
          return false;
      } else {
          that.setData( {
              currentTab: e.target.dataset.current
          })
      }   
  },
  bindChange: function(e) {//tab请求
      var that = this;
      var uId=that.data.uId
      that.setData( { 
          currentTab: e.detail.current 
      });
                if(e.detail.current==1){//第二个tab
                  that.tishi();
                  that.setData({
                    truetihao:'',
                    falsetihao:'' 
                  })
                    wx.request({ //根据学生ID  日期   查看该学生每一题今日对错的数量
                     url: 'https://zyservice.xicp.io/selectuIDcount',
                     // url: 'http://localhost:8080/selectuIDcount',
                      data:{
                        date:date,
                        uId:uId
                    },
                    method:"GET",
                    header: {
                      'content-type': 'application/json' // 默认值
                    }, 
                    success (res) {
                        let date=res.data.data; 
                        console.log(date)
                        if (date!=null) {       
                         
                          let a=date[0].trueCount                    
                          let b=date[0].falseCount
                          let zong=Number(a)+Number(b) 
                          console.log(zong)
                          if(date[0].zongti==0){
                            date[0].zongti=zong
                          }          
                          console.log(date)
                                                                
                              that.setData({
                                duicuozongshu:date[0].zongti,
                                dui:date[0].trueCount,
                                cuo:date[0].falseCount
                              })                                                                               
                        }else{
                          wx.showToast({
                            title: '没有数据',
                            duration: 2000  
                          })
                        }         
                    }
                    }) 
                    wx.request({
                      //url: 'http://localhost:8080/selectuIdSum', 查看该学生今日对错的题号
                      url: 'https://zyservice.xicp.io/selectuIdSum',                   
                      data:{
                        date:date,
                        uId:uId
                      },
                      method:"GET",
                      header: {
                        'content-type': 'application/json' // 默认值
                      }, 
                      success (res) {
                    let date=res.data.data     
                    console.log(date) 
                    console.log(date.dui) 
                    console.log(date.cuo)      
                          if(date.dui=="" && date.cuo==""){
                            wx.showToast({
                              title: '没有数据',
                              duration: 2000  
                            })                            
                          }else{
                            that.setData({
                              truetihao:date.dui,
                              falsetihao:date.cuo
                            })
                          }
                      
                      }
                    })
                }



                  if(e.detail.current==2){//第三个tab
                    that.tishi();
                    that.setData({
                      truetihao:'',
                      falsetihao:'' 
                    })
                      wx.request({//根据学生ID  日期   查看该学生今日对错的总数
                        url: 'https://zyservice.xicp.io/selectuIDcount',
                       // url: 'http://localhost:8080/selectuIDcount',
                        data:{
                          date:date,
                          uId:uId
                        },
                        method:"GET",
                        header: {
                          'content-type': 'application/json' // 默认值
                        }, 
                        success (res) {
                        console.log(res.data.data) 
                        let date=res.data.data
                        if (date==null) {
                          wx.showToast({
                            title: '没有数据',
                            duration: 2000  
                          })                                               
                        }else{
                          let a=date[0].trueCount                    
                          let b=date[0].falseCount
                          let zong=Number(a)+Number(b) 
                          console.log(zong)
                          if(date[0].zongti==0){
                            date[0].zongti=zong
                          }          
                          console.log(date)
                          that.setData({
                            duicuosum:date                                        
                        })
                        that.quxian();
                        }                          
                      }
                   })
                 }

                      if(e.detail.current==3){//第4个tab
                        that.tishi();
                        that.setData({
                          truetihao:'',
                          falsetihao:'' 
                        })
                        console.log(uId)
                              wx.request({//所有学生正确率
                                url:'https://zyservice.xicp.io/selectsuoyoupaimin',
                                //url:'http://localhost:8080/selectsuoyoupaimin',
                                data:{
                                  uId:uId,
                                  date:date
                                },
                                method:"GET",
                                header: {
                                  'content-type': 'application/json'//默认值
                                }, 
                                success (res) {    
                                let date=res.data.data; 
                                console.log(date)
                                var demo=[];   
                                    if(date!=null){
                                      date.forEach(function(item,index){  
                                        var dui=item.trueCount//获取对的值
                                        var cuo=item.falseCount//获取错的值
                                        var name=item.uName
                                        var suan=Number(dui)+Number(cuo)//对错相加
                                        var bai=100/suan //算出百分比
                                        var lev=bai*dui//百分比乘以对
                                        var lo=lev.toFixed(0)                                           
                                        if(item.zongti==0){
                                          item.zongti=suan
                                        }
                                        if(item.zhengquelv==null){
                                          item.zhengquelv=lo
                                        }                                                                                         
                                        if(name==that.data.uname){
                                          item.benxuesheng=1
                                        }
                                      }) 
                                      demo=date;
                                      demo.sort(that.compare("trueCount"))
                                      console.log(demo)
                                      demo.forEach(function(item, index){ 
                                       var paihang=0;
                                       var paihang=index+1 
                                        if(item.paihang==null){
                                         item.paihang=paihang
                                        }
                                        that.setData({
                                          zhengqulv:demo,                 
                                      })
                                        console.log(demo)                                 
                                      })
                                    }else{
                                      wx.showToast({
                                        title: '没有数据',
                                        duration: 2000  
                                      })
                                }                               
                            }
                      })     
               }
  },
  compare: function (property) {//排序
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value2 - value1;
    }
},
  quxian:function(){//柱形图
    var thas=this.data;
    console.log(thas.duicuosum)
    var zongti=new Array()
    var baifenbidui=new Array()
    var baifenbicuo=new Array()
    thas.duicuosum.forEach(function(item, index){
        zongti.push(item.zongti)
        baifenbidui.push(item.trueCount)
        baifenbicuo.push(item.falseCount)
    })
    console.log(zongti)
    console.log(baifenbidui)
    console.log(baifenbicuo)

    //曲线图
    var windowWidth = 220;
    console.log()
    try {
      var res = wx.getSystemInfoSync(); 
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!'); 
    }
        yuelineChart = new wxCharts({ //当月用电折线图配置
          canvasId: 'columnCanvas',
          type: 'column',
          categories:['总题数'], //categories X轴
          animation: true,//是否动画展示
              series: [{
                name: '总题',
                data:[zongti],
                color:'#F3882A'
              },  {
                name: '正确',
                data:baifenbidui,
                color:'green'
              }, {
                name: '错误',
                data:baifenbicuo,
                color:'red'
              }],
              xAxis: {
                disableGrid: true
              },
              yAxis: {
                min: 0
              },
              width: windowWidth,
              height: 200,
              dataPointShape: true,
              extra: {
                column: {
                    width:20 // 柱状图每项的图形宽度，单位为px
                }
            }   
        });
  },
  xuanzhongzhuye:function(){//主页
    wx.reLaunch({
      url: '/pages/index/index',
    })      
  },
  xuanzezixun:function(){//资讯   
      wx.navigateTo({
        url: '/pages/Realtimeinfo/realtimeinfo',
      })
  },
  xuanzewode:function(){//我的
     var that=this;
     var uId=that.data.uId
     console.log(that.data.uId)
     wx.navigateTo({
      url: '/pages/Wode/wode?uId='+uId,
    })
  }
})