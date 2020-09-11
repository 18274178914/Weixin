var time = 1;
var timer;  
var util=require('../../utils/util.js');
var date=util.formaDate(new Date());
var datetime=util.formatTime(new Date())
var answer=require('../../utils/answer.js')
var wxCharts = require('../../utils/wxcharts.js'); // 引入wx-charts.js文件
var yuelineChart=null

var yuelineChart1=null
Page({
  data: {
      winWidth: 0,
      winHeight: 0,
      currentTab: 0,
      classId:'',
      classPwd:'',
      Jiaoxue:[],//所有学生成绩
      Sudu:[],//答题速度
      tihao:'',
      duicuo:[],//接收每题对错柱形图数据
      duicuosum:[],//接收今日对错总数柱形图数据
      zongpaihan:[],//柱形图数据
      onekeshi:[],//柱形图数据
      twokeshi:[],//柱形图数据
      threekeshi:[],//柱形图数据
      fourkeshi:[],//柱形图数据
      fivekeshi:[],//柱形图数据
      sixkeshi:[],//柱形图数据
      sevenkeshi:[],//柱形图数据
      eightkeshi:[],//柱形图数据
      keshi:[],
      chutihezi:false,//出题弹框
      tinum:[],
      diyikeshi:[],//课时成绩模块
      keshichengjicanshu:'',//课时成绩参数
      gerenchengji:[],//学生个人成绩
      gerenhezi:false,
      gerensudu:[],
      gerensuduhezi:false,
      tiid:'',
      yichuti:[],
      yichutihezi:false,
      shuxingtuhezi:false,
      datipaihangtitie:true,
      datipaihanghezi:true,
      tihaopanduan:[],
      tongjiname:""

  },
  onLoad: function(options) {
      var that = this;
      that.setData({
        classId:options.uCode,
        classPwd:options.ucode
      })
      /**
       * 获取当前设备的宽高
       */
      wx.getSystemInfo({
          success: function( res ) {
              that.setData( {
                  winWidth: res.windowWidth,
                  winHeight: res.windowHeight
              });
          }
      });
      that.tishi(); 
      that.yuancheng();
  
  },
  
  tishi:function(){//提示信息
    wx.showToast({
      title: '正在加载',
      icon:"loading",
      duration:4000,
      mask:true
    })
  },
  pause:function(){//定时器结束
    if(timer!= null){
      clearTimeout(timer)
      }
  },
  yuancheng:function(){//定时器开始
    var thar=this;
  
 
    timer = setTimeout(function () {
      console.log("time:"+time);
      time++;
      //发送请求
      wx.request({
        //url:'http://localhost:8080/selectClassId',
         url:'https://zyservice.xicp.io/selectClassId',//查询所有学生成绩
      data:{
        password:thar.data.classPwd, 
          date:datetime
        }, 
        method:"GET", 
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {     
          let date=res.data.data;
          console.log(date)
          if (date!= "" && date!=null) {
            date.forEach(function(item, index){
              console.log(item); //这里的item就是从数组里拿出来的每一个每一组
               var sj=(util.crtTimeFtt(item.date));
               var an=(answer.name(item.answer))
               item.answer=an;
               item.date=sj;//将时间戳转时间并赋值                                        
            })         
              thar.setData({
                Jiaoxue:date
            })
              var query = wx.createSelectorQuery()
              query.select('#test').boundingClientRect(function (heihgt) {
                thar.setData({
                  winHeight:heihgt.height+60
                })
                console.log(heihgt);
              }).exec();
             
              thar.yuancheng();  //获取数据后重新开启定时器发送请求
          } else {
            wx.showToast({
              title: '没有数据',
              duration: 2000  
            })
          }
        }
      })
    }, 5000);
  },

//  tab切换逻辑
  swichNav: function( e ) {
      var that = this;
      if( this.data.currentTab === e.target.dataset.current ) {
          return false;
      } else {
          that.setData( {
              currentTab: e.target.dataset.current
          })
      }
  },
  bindChange: function( e ) {
      var that = this;
      console.log(e.detail.current)
      that.setData( { currentTab: e.detail.current });
      if(e.detail.current==0){//第一个tab
        console.log(e.detail.current)
        console.log("启动了")
        that.yuancheng(); 
      }

            if(e.detail.current==1){
              console.log(e.detail.current)
              console.log(that.data.classPwd)
              that.pause();
              that.setData({
                chutihezi:false,
                yichutihezi:false,
                gerenhezi:false,
                gerensuduhezi:false,
                shuxingtuhezi:false
              })
              wx.showToast({
                title: '选择课时',
                duration:2000,
                mask:true
              })
            }

                  if(e.detail.current==2){//哪一题答题速度排行
                    console.log(e.detail.current)
                    that.setData({
                      chutihezi:false,
                      yichutihezi:false,
                      gerenhezi:false,
                      gerensuduhezi:false,
                      shuxingtuhezi:false
                    })
                    that.pause();
                    that.tishi();
                    wx.request({
                     url:'https://zyservice.xicp.io/selectZongpaihang',                  
                     data:{
                       date:datetime,
                       password:that.data.classPwd
                     },
                     method:"GET",
                     header: {
                       'content-type': 'application/json' // 默认值
                     }, 
                     success (res) {
                      let date=res.data.data; 
                      console.log(date)
                      if(date!= "" && date!=null){
                       date.forEach(function(item, index){    //这里的item就是从数组里拿出来的每一个每一组
                        var paihang=0;
                        var paihang=index+1
                        console.log(index);                 
                        if(item.paihang==null){
                          item.paihang=paihang
                        }         
                            that.setData({
                              Sudu:res.data.data,
                              tihao:res.data.data[0].topicNumber,
                            })  
                            var query = wx.createSelectorQuery()
                            query.select('#sudu').boundingClientRect(function (heihgt) {
                              that.setData({
                                winHeight:heihgt.height+60
                              })
                              console.log(heihgt);
                            }).exec();
                       })                        
                      }else                  {
                       wx.showToast({
                         title: '没有数据',
                         duration:2000,
                         mask:true
                       })
                      } 
                     
                     }
                   })
                  }

                        if(e.detail.current==3){
                          that.setData({
                            chutihezi:false,
                            yichutihezi:false,
                            winHeight:500,
                            gerenhezi:false,
                            gerensuduhezi:false,
                            shuxingtuhezi:false
                          })
                      
                          that.tishi();
                          that.pause();
                          wx.request({//获取今日每题对错总数 
                           url: 'https://zyservice.xicp.io/selectDateID',  
                              //  url: 'http://localhost:8080/selectDateID',                      
                            data:{
                              date:datetime,
                              password:that.data.classId
                            },
                            method:"GET",
                            header: { 
                              'content-type': 'application/json' // 默认值
                            }, 
                            success (res) {
                              console.log(res)   
                              if(res.data.data!=""){
                                that.setData({
                                  duicuo:res.data.data
                                })
                                that.quxian();//课题柱形图
                              }else{
                                wx.showToast({
                                  title: '没有数据',
                                  duration: 2000  
                                })       
                              }          
                             
                            }
                          })                    
                        }
                              if(e.detail.current==4){
                                that.setData({
                                 chutihezi:false,
                                 yichutihezi:false,
                                 gerenhezi:false,
                                 gerensuduhezi:false,
                                 shuxingtuhezi:false
                                })
                                that.tishi();
                                that.pause();//定时器停止
                                wx.request({
                                  url:'https://zyservice.xicp.io/selectbaifenbi',  //排行榜
                                  //url:'http://localhost:8080/selectbaifenbi',                                           
                                 data:{
                                   date:datetime,
                                   password:that.data.classPwd
                                 },   
                                 method:"GET",
                                 header: {
                                   'content-type': 'application/json' // 默认值
                                 }, 
                                 success (res) {
                                  var date=res.data.data; 
                                  console.log(res)
                                  console.log(res.data)
                                  console.log(date)                                
                                 if(date!=""){
                                   var demo=[];                             
                                    date.forEach(function(item, index){    //这里的item就是从数组里拿出来的每一个每一组                           
                                    var dui=item.trueCount//获取对的值
                                    var cuo=item.falseCount//获取错的值
                                    var suan=Number(dui)+Number(cuo)//对错相加
                                    var bai=100/suan //算出百分比
                                    var lev=bai*dui//百分比乘以对
                                    var lo=lev.toFixed(0)                                           
                                    if(item.zongti==null){
                                      item.zongti=suan
                                    }
                                    if(item.zhengquelv==null){
                                      item.zhengquelv=lo
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
                                      zongpaihan:demo,
                                     })
                                     console.log(demo)
                                     var query = wx.createSelectorQuery()
                                     query.select('#paihang').boundingClientRect(function (heihgt) {
                                       that.setData({
                                         winHeight:heihgt.height+60
                                       })
                                       console.log(heihgt);
                                     }).exec();
                                   })
                                  } else{
                                    wx.showToast({
                                      title: '没有数据',
                                      duration:2000,
                                      mask:true
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

  quxian:function(){//每题柱形图
    var thas=this.data;
    var topic_number=new Array()
    var baifenbidui=new Array()
    var baifenbicuo=new Array()
    var zong=new Array()
    console.log("11111111111111111")
    console.log(thas.duicuo)
if(thas.duicuo==null){
  wx.showToast({
    title: '没有数据',
    duration:2000,
    mask:true
  })
}else{
  thas.duicuo.forEach(function(item, index){
    console.log(item)
      topic_number.push(item.topicnumber)
      baifenbidui.push(item.trueCount)
      baifenbicuo.push(item.falseCount)
      zong.push(Number(item.falseCount)+Number(item.trueCount))
  })
}
    console.log(topic_number)
    console.log(baifenbidui)
    console.log(baifenbicuo)
    var windowWidth = 220;
    console.log()
    try {
      var res = wx.getSystemInfoSync(); 
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!'); 
    }
        yuelineChart = new wxCharts({ //
          canvasId: 'columnCanvas',
          type: 'column',
          categories:topic_number, //categories X轴
          animation: true,//是否动画展示
              series: [ {
                name: '总题',
                data:zong,
                color:'#F3882A'
              },{
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
  keshizhuxing:function(){//对错总数柱形图
    var thas=this.data;
    console.log(thas.duicuosum)
var onetrue=thas.duicuosum.onetrue;
var onefalse=thas.duicuosum.onefalse;
var twotrue=thas.duicuosum.twotrue;
var twofalse=thas.duicuosum.twofalse;
var threetrue=thas.duicuosum.threetrue;
var threefalse=thas.duicuosum.threefalse;
var fourtrue=thas.duicuosum.fourtrue;
var fourfalse=thas.duicuosum.fourfalse;
var fivetrue=thas.duicuosum.fivetrue;
var fivefalse=thas.duicuosum.fivefalse;
var sixtrue=thas.duicuosum.sixtrue;
var sixfalse=thas.duicuosum.sixfalse;
var seventrue=thas.duicuosum.seventrue;
var sevenfalse=thas.duicuosum.sevenfalse;
var eighttrue=thas.duicuosum.eighttrue;
var eightfalse=thas.duicuosum.eightfalse;
var zong=Number(onetrue)+Number(twotrue)+Number(threetrue)+Number(fourtrue)+Number(fivetrue)+
Number(sixtrue)+Number(seventrue)+Number(eighttrue)+Number(onefalse)+Number(twofalse)
+Number(threefalse)+Number(fourfalse)+Number(fivefalse)+Number(sevenfalse)+Number(sevenfalse)+Number(eightfalse);
var zongdui=Number(onetrue)+Number(twotrue)+Number(threetrue)+Number(fourtrue)+Number(fivetrue)+Number(sixtrue)+Number(seventrue)+Number(eighttrue);
var zongcuo=Number(onefalse)+Number(twofalse)+Number(threefalse)+Number(fourfalse)+Number(fivefalse)+Number(sevenfalse)+Number(sevenfalse)+Number(eightfalse);
var zongone=Number(onetrue)+Number(onefalse);var zongtwo=Number(twotrue)+Number(twofalse);var zongthree=Number(threetrue)+Number(threefalse);
var zongfour=Number(fourtrue)+Number(fourfalse);
var zongfive=Number(fivetrue)+Number(fivefalse);var zongsix=Number(sixtrue)+Number(sixfalse);
var zongseven=Number(seventrue)+Number(sevenfalse);var zongeight=Number(eighttrue)+Number(eightfalse);
     //曲线图
     var windowWidth = 220;
     console.log()
     try {
       var res = wx.getSystemInfoSync(); 
       windowWidth = res.windowWidth;
     } catch (e) {
       console.error('getSystemInfoSync failed!'); 
     }
     yuelineChart1 = new wxCharts({ //当月用电折线图配置
      canvasId: 'columnCanvas1',
      type: 'column',
      categories:['总题数', '第一课时', '第二课时', '第三课时', '第四课时', '第五课时', '第六课时', '第七课时', '第八课时'], //categories X轴
      animation: true,//是否动画展示
          series: [{
            name: '总题',
            data:[zong,zongone,zongtwo,zongthree,zongfour,zongfive,zongsix,zongseven,zongeight],
            color:'#F3882A'
          },  {
            name: '正确',
            data:[zongdui,onetrue,twotrue,threetrue,fourtrue,fivetrue,sixtrue,seventrue,eighttrue],
            color:'green'
          }, {
            name: '错误',
            data:[zongcuo,onefalse,twofalse,threefalse,fourfalse,fivefalse,sixfalse,sevenfalse,eightfalse],
            color:'red'
          }],
          xAxis: {
            disableGrid: true
          },
          yAxis: {
            min: 0,
            max:0,
            disabled:false,
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
  xuanzewode:function(){//出题
    var that=this;
    let pwd=that.data.classPwd
    that.setData({
      chutihezi:true
    })
    wx.request({ 
      url: 'https://zyservice.xicp.io/AnswerTeacher/selectAnswerTeacherToc',
      //url: 'http://localhost:8080/AnswerTeacher/selectAnswerTeacherToc',
      data:{
        date:datetime,
        password:pwd
      },
      method:"GET", 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function (res) {   
        let date=res.data.data  
        console.log(date)
        if(date!=""){
          that.setData({
            tinum:date
          })
        }
         if(date==null || date==""){
          wx.showToast({
            title: '没有录题',
            duration:2000,
            mask:true
          })
        }                            
      }
 })
},
chuti:function(e){
  let that=this;
  that.setData({
    tiid:e.currentTarget.dataset.id
  })
  wx.request({
    url: 'https://zyservice.xicp.io/AnswerTeacher/updateDate',
    data:{
     id:e.currentTarget.dataset.id
   },
   method:"GET", 
   header: {
     'content-type': 'application/json' // 默认值
   },
   success: function (res) {  
     console.log(res.data)
     if(res.data==1){
       that.yichuti();
      that.yuancheng(); 
     }else{
       wx.showToast({
         title: '出题失败',
         duration:2000,
         mask:true
       })
     }
   }
  })
},
yichuti:function(){
 let that=this;
 console.log(this.data.tiid);
 wx.request({
  url: 'https://zyservice.xicp.io/AnswerTeacher/selectTeacheId',
   //url: 'http://localhost:8080/AnswerTeacher/selectTeacheId',
   data:{
     Id:this.data.tiid
   },
   method:"GET", 
   header: {
     'content-type': 'application/json' // 默认值
   },
   success: function (res) {  
     console.log(res.data.data)
     that.setData({
       yichuti:res.data.data,
       yichutihezi:true
     })
     console.log(that.data.yichuti)
   }
 }) 
},
diyikeshi:function(){//课时成绩第一课时
  let thar=this;
  wx.request({
    url:'https://zyservice.xicp.io/selectClassId',//查询所有学生成绩
      data:{
        password:thar.data.classPwd, 
          date:datetime
        }, 
        method:"GET", 
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {    
               let date=res.data.data
               if (date!= "" && date!=null) {
                date.forEach(function(item, index){
                  console.log(item); //这里的item就是从数组里拿出来的每一个每一组
                   var sj=(util.crtTimeFtt(item.date));
                   let an=(answer.name(item.answer))
            
                   item.answer=an;
                   item.date=sj;//将时间戳转时间并赋值                                        
                })  
                  thar.setData({
                    diyikeshi:date
                })
                  var query = wx.createSelectorQuery()
                  query.select('#test1').boundingClientRect(function (heihgt) {
                    thar.setData({
                      winHeight:heihgt.height+50
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
diyikeshi:function(){//课时成绩第一课时
  var keshichengji=' 08:45:00'
  let thar=this;
  thar.setData({
    keshichengjicanshu:keshichengji
  })
  thar.tishi();
  thar.keshichengjifangff();
},
dierkeshi:function(){//课时成绩第二课时
  var keshichengji=' 09:15:00'
  let thar=this;
  thar.setData({
    keshichengjicanshu:keshichengji
  })
  thar.tishi();
  thar.keshichengjifangff();
},
disankeshi:function(){//课时成绩第三课时
  var keshichengji=' 09:45:00'
  let thar=this;
  thar.setData({
    keshichengjicanshu:keshichengji
  })
  thar.tishi();
  thar.keshichengjifangff();
},
disikeshi:function(){//课时成绩第四课时
  var keshichengji=' 10:15:00'
  let thar=this;
  thar.setData({
    keshichengjicanshu:keshichengji
  })
  thar.tishi();
  thar.keshichengjifangff();
},
diwukeshi:function(){//课时成绩第五课时
  var keshichengji=' 10:45:00'
  let thar=this;
  thar.setData({
    keshichengjicanshu:keshichengji
  })
  thar.tishi();
  thar.keshichengjifangff();
},
diliukeshi:function(){//课时成绩第六课时
  var keshichengji=' 14:15:00'
  let thar=this;
  thar.setData({
    keshichengjicanshu:keshichengji
  })
  thar.tishi();
  thar.keshichengjifangff();
},
diqikeshi:function(){//课时成绩第七课时
  var keshichengji=' 14:45:00'
  let thar=this;
  thar.setData({
    keshichengjicanshu:keshichengji
  })
  thar.tishi();
  thar.keshichengjifangff();
},
dibakeshi:function(){//课时成绩第八课时
  var keshichengji=' 15:15:00'
  let thar=this;
  thar.setData({
    keshichengjicanshu:keshichengji
  })
  thar.tishi();
  thar.keshichengjifangff();
},
keshichengjifangff:function(){//课时成绩方法
  let thar=this;
  wx.request({
    url:'https://zyservice.xicp.io/selectClassId',//查询所有学生成绩
      data:{
        password:thar.data.classPwd, 
        date:date+thar.data.keshichengjicanshu//date+thar.data.keshichengjicanshu,
        }, 
        method:"GET", 
        header: {
          'content-type': 'application/json' // 默认值
        }, 
        success: function (res) {    
               let date=res.data.data
               if (date!= "" && date!=null) {
                date.forEach(function(item, index){
                  console.log(item); //这里的item就是从数组里拿出来的每一个每一组
                   var sj=(util.crtTimeFtt(item.date));
                   let an=answer.name(item.answer)
                   item.answer=an;
                   item.date=sj;//将时间戳转时间并赋值           

                })  
                  thar.setData({
                    diyikeshi:date
                })
                  var query = wx.createSelectorQuery()
                  query.select('#test1').boundingClientRect(function (heihgt) {
                    thar.setData({
                      winHeight:heihgt.height+50
                    })
                    console.log(heihgt);
                  }).exec();            
              } else {
                wx.showToast({
                  title: '没有数据',
                  duration: 1000  
                })
              }
        }
  })
},
yonghuId:function(e){
  let thar=this
 console.log(e.currentTarget.dataset.id)
 thar.setData({
   gerenhezi:true
 })
 thar.tishi();
 thar.pause();
 wx.request({
  url:'https://zyservice.xicp.io/selectuIdanswer',//查询单个学生课时总成绩
  // url:'http://localhost:8080/selectuIdanswer',
   data:{
      uId:e.currentTarget.dataset.id,
      date:datetime  
      }, 
      method:"GET", 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {    
             let date=res.data.data
             console.log(date)

             if (date!= "" && date!=null) {
              date.forEach(function(item, index){
                console.log(item); //这里的item就是从数组里拿出来的每一个每一组
                 var sj=(util.crtTimeFtt(item.date));
                 let an=answer.name(item.answer)
                 item.answer=an;
                 item.date=sj;//将时间戳转时间并赋值                                        
              })  
                thar.setData({
                  gerenchengji:date
              })
                           
            } else {
              wx.showToast({
                title: '没有数据',
                duration: 2000  
              })
            }
      }
})
},
guanbigeren:function(){//个人成绩盒子关闭
  let that=this;
  that.setData({
    gerenhezi:false
  })
  that.yuancheng();
},
guanbigerensudu:function(){//题号速度排行关闭
  let that=this;
  that.setData({
    gerensuduhezi:false
  })
},
tucnumpberId:function(e){
  var thar=this;
  thar.setData({
    gerensuduhezi:true
  })
   console.log(e.currentTarget.dataset.id)
   wx.request({
    url:'https://zyservice.xicp.io/countPaihang',//查询某一题答题速度
      data:{
        topicNumber:e.currentTarget.dataset.id,//thar.data.classPwd, 
        date:datetime  ,
        password:thar.data.classPwd, 
        }, 
        method:"GET", 
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {    
               let date=res.data.data
               if (date!= "" && date!=null) {
                date.forEach(function(item, index){
                  console.log(item); //这里的item就是从数组里拿出来的每一个每一组
                  var paihang=0;
                  var paihang=index+1
                  console.log(index);                 
                  if(item.paihang==null){
                    item.paihang=paihang
                  }         
                })  
                  thar.setData({
                    gerensudu:date
                })
                             
              } else {
                wx.showToast({
                  title: '没有数据',
                  duration: 2000  
                })
              }
        }
  })
},
chutiguanbi:function(){
  let that=this;
  that.setData({
    chutihezi:false
  })
},
yichutiguanbi:function(){
  let that=this;
  that.setData({
    yichutihezi:false
  })
},
shuxingtu:function(e){
  console.log(e.currentTarget.dataset.id)
  let that=this
  that.setData({
    shuxingtuhezi:true,
    datipaihangtitie:false,
    datipaihanghezi:false
  })
  wx.request({
      url: 'https://zyservice.xicp.io/selectClassIDateSum',//学生每个课时答题总数
     //url: 'http://localhost:8080/selectClassIDateSum',
      data:{
           date:date,
           uId:e.currentTarget.dataset.id
         },
         method:"GET",
         header: {
           'content-type': 'application/json' // 默认值
         }, 
         success (res) {
           console.log(res)    
           let date=res.data.data;
          if(date!=""){
                if(date.onetrue==null){
                  date.onetrue=0
                }
                if(date.onefalse==null){
                  date.onefalse=0
                }
                if(date.twotrue==null){
                  date.twotrue=0
                }
                if(date.twofalse==null){
                  date.twofalse=0
                }
                if(date.threetrue==null){
                  date.threetrue=0
                }
                if(date.threefalse==null){
                  date.threefalse=0
                }
                if(date.fourtrue==null){
                  date.fourtrue=0
                }
                if(date.fourfalse==null){
                  date.fourfalse=0
                }
                if(date.fivetrue==null){
                  date.fivetrue=0
                }
                if(date.fivefalse==null){
                  date.fivefalse=0
                }
                if(date.sixtrue==null){
                  date.sixtrue=0
                }
                if(date.sixfalse==null){
                  date.sixfalse=0
                }
                if(date.seventrue==null){
                  date.seventrue=0
                }
                if(date.sevenfalse==null){
                  date.sevenfalse=0
                }
            
                if(date.eighttrue==null){
                  date.eighttrue=0
                }
                if(date.eightfalse==null){
                  date.eightfalse=0
                }        
              that.setData({
                duicuosum:date,
                tongjiname:date.name,winHeight:300
              })
             that.keshizhuxing();
            }else{
              wx.showToast({
                title: '没有数据',
                duration: 2000  
              })
            }
         }
    })
},
shuxingtuhuangbi:function(){
  var that=this;
  that.setData({
    shuxingtuhezi:false,
    datipaihangtitie:true,
    datipaihanghezi:true
  })
},
onUnload: function() {

  
  let that = this;
  that.pause();
  }
})