// pages/Yundong/yundong.js
var  wxCharts = require('../../utils/wxcharts.js'); // 引入wx-charts.js文件
var util=require('../../utils/util.js');
var DATE = util.formaDate1(new Date());
var date=util.formaDate(new Date());
var yuelineChart=null
var daylineChart=null
Page({

  /**
   * 页面的初始数据
   */
  data: {
      u_code:"",//传递过来的卡号参数
      u_id:"",//传递过来的ID参数
    //个人信息
    schoolname:'',gradename:'',classname:'',name:'',sex:'',code:'',nianlin:'',
   //跳远
    tiaoyuan: "跳远", jumpDistance: "",jumpDate: "",
    //拍球
    paiqiu: "拍球", batCount: "",batTest: "",batDate: "",
    //趴地推球
    padituiqiu: "趴地推球", pushCount: "",pushTest: "",pushDate: "",
    //身高体重
    shtzheight: "身高体重", hwHeight: "",hwWeight: "",hwBim: "",hwDate:"",
    //吊环
    diaohuan: "吊环", rsLefPressure: "",rsRighPressure: "",rsTestTime: "",rsDate:"",
    //蹦床
    bengchuang: "蹦床", trCount: "",trData: "",trDate:"",
    //坐位体前屈
    tiqianqu:"坐位体前屈",flBestSocre: "",flFirstSocre: "",flSecondSocre: "",flDate:"",
    //新版脚步器
    onejiaobuqi:"新版脚步器",deTest: "",deCount: "",deSpeed: "",deDate:"",
    //双脚连续跳
    lianxutiao:"双脚连续跳",dfTotalTime: "",dfTotalAvgTime: "",dfReactionTime: "",dfDate:"",
    //平衡木
    pinghengmu:"平衡木",bwTest: "",bwDistance: "",bwData: "",bwDate:"",
    //平衡台
    pinghengtai:"平衡台",baSumAngle: "",baSumAngleL: "",baSumAngleR: "",baTest:"",baDate:"",
    //手眼协调
    shouyanxietiao:"手眼协调",hfScore: "",hfAverageTime1: "",hfAverageTime2: "",hfAverageTime3:"",hfDate:"",
     //老版脚步器
     xinjiaobuqi:"老版脚步器",dlTest: "",dlShortTime: "",dlLongTime: "",dlAvgTime:"",dlNum:"",dlDate:"",
    //折返跑
     zhefangpao:"折返跑",rbRunLong: "",rbTotalTime: "",rbTimeF: "",rbZs:"",rbTimeB:"",rbDate:"",
    //骑行
    qixing:"骑行",startTime: "",endTime: "",number: "",dateTime:"",averageTime:"",testTime:"",
    //曲线图  
    //老板脚步器
    dlTest1:"",
    //新版脚步器
    deTest1:"",
    //手眼协调
    hfScore1:"",
    //跳远
    jumpDistance1:"",
    //平衡台
    baSumAngle1:"",
    //折返跑
    rbTotalTime1:"",
    //吊环
    rsTestTime1:"",
    //拍球
    batCount1:"",
    //趴地推球
    pushCount1:"",
    //平衡木
    bwTest1:"",
    //体前屈
    flBestSocre1:"",
    //双脚连续跳
    dfTotalAvgTime1:"",
    //骑行
    averageTime1:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      u_id:options.uId
    })
    console.log("主页传过来的数据"+options)
    var uId=that.data.u_id
    console.log(uId+date)
    wx.showLoading({
      title: '正在加载',
      icon:"loading",
      mask:true
    }),
        //获取学生信息
        wx.request({
          url: 'https://zyservice.xicp.io/PublicInfoStudentBase/selectuId',
          data:{
            uId:uId
          },
          method:"GET",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success (res) {
            console.log(res.data.data[0].class_name)
            if(res['data']['msg']=="没有该学生"){
                  console.log("思维没有该学生")
            }else{
              that.setData({
                name:res['data']['data'][0]['u_name'],
                gradename:res['data']['data'][0]['grade_name'],
                classname:res['data']['data'][0]['class_name'],
                schoolname:res['data']['data'][0]['school_name'],
                sex:res['data']['data'][0]['u_gender'],
                code:res['data']['data'][0]['u_code'],
                nianlin:res['data']['data'][0]['u_birthday']
              })
            }    
          }
  }),
    //获取运动数据
    wx.request({
      url: 'https://zyservice.xicp.io/DrillBalance/sportProgram',
      data:{
        date:date,
        uId:uId
      },
      method:"GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        let pageData = res.data.data;
        console.log(pageData)
        if(pageData.dlTest==null){
          pageData.dlTest=0
        }
        if(pageData.deTest==null){
          pageData.deTest=0
        }
        if(pageData.hfScore==null){
          pageData.hfScore=0
        }
        if(pageData.jumpDistance==null){
          pageData.jumpDistance=0
        }
        if(pageData.baSumAngle==null){
          pageData.baSumAngle=0
        }
        if(pageData.rbTotalTime==null){
          pageData.rbTotalTime=0
        }
        if(pageData.rsTestTime==null){
          pageData.rsTestTime=0
        } 
        if(pageData.batCount==null){
          pageData.batCount=0
        }
        if(pageData.pushCount==null){
          pageData.pushCount=0
        }
        if(pageData.bwTest==null){
          pageData.bwTest=0
        }
        if(pageData.flBestSocre==null){
          pageData.flBestSocre=0
        }
        if(pageData.dfTotalAvgTime==null){
          pageData.dfTotalAvgTime=0
        }
        if(pageData.averageTime==null){
          pageData.averageTime=0
        }
        that.setData({
          //跳远
            jumpDistance:pageData.jumpDistance,
            jumpDate:pageData.jumpDate,
            //拍球
            batCount:pageData.batCount,
            batTest:pageData.batTest,
            batDate:pageData.batDate,
            //趴地推球
            pushCount:pageData.pushCount,
            pushTest:pageData.pushTest,
            pushDate:pageData.pushDate,
            //身高体重
            hwHeight:pageData.hwHeight,
            hwWeight:pageData.hwWeight,
            hwBim:pageData.hwBim,
            hwDate:pageData.hwDate,
            //吊环
            rsLefPressure:pageData.rsLefPressure,
            rsRighPressure:pageData.rsRighPressure,
            rsTestTime:pageData.rsTestTime,
            rsDate:pageData.rsDate,
            //蹦床
            trCount:pageData.trCount,
            trData:pageData.trData,
            trDate:pageData.trDate,
            //体前屈
            flBestSocre:pageData.flBestSocre,
            flFirstSocre:pageData.flFirstSocre,
            flSecondSocre:pageData.flSecondSocre,
            flDate:pageData.flDate,
            //新版脚步器
            deTest:pageData.deTest,
            deCount:pageData.deCount,
            deSpeed:pageData.deSpeed,
            deDate:pageData.deDate,
            //双脚连续跳
            dfTotalTime:pageData.dfTotalTime,
            dfTotalAvgTime:pageData.dfTotalAvgTime,
            dfReactionTime:pageData.dfReactionTime,
            dfDate:pageData.dfDate,
            //平衡木
            bwTest:pageData.bwTest,
            bwDistance:pageData.bwDistance,        
            bwData:pageData.bwData,
            bwDate:pageData.bwDate,
            //平衡台
            baSumAngle:pageData.baSumAngle,
            baSumAngleL:pageData.baSumAngleL,
            baSumAngleR:pageData.baSumAngleR,
            baTest:pageData.batTest,
            baDate:pageData.baDate,
            //手眼协调
            hfScore:pageData.hfScore,
            hfAverageTime1:pageData.hfAverageTime1,
            hfAverageTime2:pageData.hfAverageTime2,
            hfAverageTime3:pageData.hfAverageTime3,
            hfDate:pageData.hfDate,
            //老版脚步器
            dlTest:pageData.dlTest,
            dlShortTime:pageData.dlShortTime,
            dlLongTime:pageData.dlLongTime,
            dlAvgTime:pageData.dlAvgTime,
            dlNum:pageData.dlNum,
            dlDate:pageData.dlDate,
            //折返跑
            rbRunLong:pageData.rbRunLong,
            rbTotalTime:pageData.rbTotalTime,
            rbTimeF:pageData.rbTimeF,
            rbZs:pageData.rbZs,
            rbTimeB:pageData.rbTimeB,
            rbDate:pageData.rbDate,
            //骑行
            startTime:pageData.startTime,
            endTime:pageData.endTime,
            number:pageData.number,
            dateTime:pageData.dateTime,
            averageTime:pageData.averageTime,
            testTime:pageData.testTime
        }) 
      }
    }),
          wx.request({//运动前一天曲线图
            url: 'https://zyservice.xicp.io/DrillBalance/sportProgram', 
            data:{
              date:DATE,
              uId:uId
            },
            method:"GET",
            header: {
              'content-type': 'application/json' 
            },
            success (res) {
              console.log(res.data)
              if(res.data.data.dlTest==null){
                res.data.data.dlTest=0
              }
              if(res.data.data.deTest==null){
                res.data.data.deTest=0
              }
              if(res.data.data.hfScore==null){
                res.data.data.hfScore=0
              }
              if(res.data.data.jumpDistance==null){
                res.data.data.jumpDistance=0
              }
              if(res.data.data.baSumAngle==null){
                res.data.data.baSumAngle=0
              }
              if(res.data.data.rbTotalTime==null){
                res.data.data.rbTotalTime=0
              }
              if(res.data.data.rsTestTime==null){
                res.data.data.rsTestTime=0
              }
              if(res.data.data.batCount==null){
                res.data.data.batCount=0
              }
              if(res.data.data.pushCount==null){
                res.data.data.pushCount=0
              }
              if(res.data.data.bwTest==null){
                res.data.data.bwTest=0
              }
              if(res.data.data.flBestSocre==null){
                res.data.data.flBestSocre=0
              }
              if(res.data.data.dfTotalAvgTime==null){
                res.data.data.dfTotalAvgTime=0
              }
              if(res.data.data.averageTime==null){
                res.data.data.averageTime=0
              }
                  that.setData({
                    dlTest1:res.data.data.dlTest,
                    deTest1:res.data.data.deTest,
                    hfScore1:res.data.data.hfScore,
                    jumpDistance1:res.data.data.jumpDistance,
                    baSumAngle1:res.data.data.baSumAngle,
                    rbTotalTime1:res.data.data.rbTotalTime,
                    rsTestTime1:res.data.data.rsTestTime,
                    batCount1:res.data.data.batCount,
                    pushCount1:res.data.data.pushCount,
                    bwTest1:res.data.data.bwTest,
                    flBestSocre1:res.data.data.flBestSocre,
                    dfTotalAvgTime1:res.data.data.dfTotalAvgTime,
                    averageTime1:res.data.data.averageTime
                  })
                  that.demo();
            }
          })
    setTimeout(function () {
      wx.hideLoading()
    },5000)
  },
demo:function(){
    var thas=this.data;
//曲线图
var windowWidth = 320;
console.log(thas.dlTest)
try {
  var res = wx.getSystemInfoSync();
  windowWidth = res.windowWidth;
} catch (e) {
  console.error('getSystemInfoSync failed!'); 
}
    yuelineChart = new wxCharts({ //当月用电折线图配置
      canvasId: 'yueEle',
      type: 'line',
      categories: ['老版脚步器','新版脚步器', '手脚协调', '跳远', '平衡台', '折返跑', '吊环', '拍球', '趴地推球', '平衡木', '坐位体前屈', '双脚连续跳', '骑行'], //categories X轴
      animation: true,
    //  background: 'red',
          series: [{
            name: '今天',
            data:[thas.dlTest,
                  thas.deTest,
                  thas.hfScore,
                  thas.jumpDistance,
                  thas.baSumAngle,
                  thas.rbTotalTime,
                  thas.rsTestTime,
                  thas.batCount,
                  thas.pushCount,
                  thas.bwTest,
                  thas.flBestSocre,
                  thas.dfTotalAvgTime,
                  thas.averageTime],
            color:'red'
          },{
            name: '昨天',
            data:[thas.dlTest1,
                  thas.deTest1,
                  thas.hfScore1,
                  thas.jumpDistance1,
                  thas.baSumAngle1,
                  thas.rbTotalTime1,
                  thas.rsTestTime1,
                  thas.batCount1,
                  thas.pushCount1,
                  thas.bwTest1,
                  thas.flBestSocre1,
                  thas.dfTotalAvgTime1,
                  thas.averageTime1],
            color:'green'
          }],
          xAxis: {
            disableGrid: true
          },
          yAxis: {
            max: 100,
            min: 0
          },
          width: windowWidth,
          height: 200,
          dataLabel: false,
          dataPointShape: true,
          extra: {
            lineStyle: 'curve'
          }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})