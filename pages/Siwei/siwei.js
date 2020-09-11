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
  data:{
      u_code:"",//传递过来的卡号参数
      u_id:"",//传递过来的ID参数
      //个人信息
      schoolname:'',gradename:'',classname:'',name:'',sex:'',code:'',nianlin:'',
      //拼图
      pingtu:"拼图",pdScore:"",pdTime:"",pdDate:"",
      //拼板
      pingban:"拼板",pbScore:"",pbTime:"",pbDate:"",
      //感知觉
      ganzhijue:"感知觉",sfCountT:"",sfCountF:"",sfTime:"",sfDate:"",
      //棋类
      qilei:"棋类",jcCollectChess:"",jcContinuousNumber:"",jcAvgTime:"",jcDate:"",
      //注意力
      zhuyili:"注意力",testTypeName:"",rightCountAll:"",rightCountClick:"",drillDate:"",
      //精细动作
      jingxi:"精细动作",fmLevel:"",fmCompleteRate:"",fmNumber:"",fmTime:"",fmDate:"",
      //逻辑狗
      luojigou:"逻辑狗",ldUpdateTopic:"",ldCorrectProbability:"",ldUpdateTime:"",ldTime:"",ldDate:"", 
      //数独
      shudu:"数独",skRudimentDate:"",skUpdateDate:"",skUpdateTime:"",skTime:"",skDate:"",
      //迷宫
      migong:"迷宫",mbMaze:"",mbCompleteRate:"",mbFootCount:"",mbTime:"",mbDate:"",
      //记忆翻翻乐
      jiyifanfnale:"记忆翻翻乐",mhLevel:"",mhCorrectProbability:"",mhCorrectNumber:"",mhAvgTime:"",mhDate:"",
      //区角
      qujiao:"区角",angleCounT:"",angleCounF:"",angleTime:"",angleAvgTime:"",angleDate:"",
       //语文
       chinese:"语文",pairingnum:"",misspellingnum:"",totalduration:"",averageduration:"",chinesetime:"",
       //数学
       mathices:"数学",thatsrightnum:"",miscalculationnum:"",totaldurationsa:"",averagedurationa:"",mathematicstime:"",
       //英语
       english:"英语",singleletternum:"",averagedurations:"",wordnum:"",wordtotaltime:"",englishtime:"",
      //空间记忆
      kongjianjiyi:"空间记忆",cmScore:"",cmMemoryBreadth:"",cmCorrectCount:"",cmErrorCount:"",cmTime:"",cmDate:"",
      //数字记忆
      shuzijiyi:"数字记忆",fbCorrectRate:"",fbCorrectCount:"",fbErrorCount:"",dbAvgReacTime:"",fbTime:"",fbDate:"",
      //听力记忆
      tinglijiyi:"听力记忆",tbScore:"",tbMemoryBreadth:"",tbCorrectCount:"",tbErrorCount:"",tbTime:"",tbDate:"",
       //   感知觉    展示前一天曲线图数据            
       sfCountTT:'',
       //精细动作
       fmTimee:'',
       //逻辑狗
       ldCorrectProbabilityy:'', 
       //数独
       skTimee:'',
       //棋类
       jcCollectChesss:'',
       //迷宫
        mbTimee:'',
        //拼图
        pdScoree:'', 
        //拼板
        pbTimee:'', 
        //空间记忆
        cmScoree:'',
        //数字记忆
         fbCorrectCountt:'',
         //听力记忆
         tbScoree:'',
         //区角
         angleCounTT:'', 
         //语文
         pairingnumm:'',
         //英语
         singleletternumm:'',
         //数学
         totaldurationsaa:'',

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
            var that = this;
            that.setData({
              u_id:options.uId
            })
            var uId=that.data.u_id
            console.log("当前时间"+date+"学生ID"+uId)
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
                      console.log("学生信息"+res)
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
                          //获取思维数据
                          wx.request({
                           url: 'https://zyservice.xicp.io/DrillBalance/eduProgram',                                              
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
                              if(pageData.sfCountT==null){ 
                                pageData.sfCountT=0
                              }
                              if(pageData.fmTime==null){
                                pageData.fmTime=0
                              }
                              if(pageData.ldCorrectProbability==null){
                                pageData.ldCorrectProbability=0
                              }
                              if(pageData.skTime==null){
                                pageData.skTime=0
                              }
                              if(pageData.jcCollectChess==null){
                                pageData.jcCollectChess=0
                              }
                              if(pageData.mbTime==null){
                                pageData.mbTime=0
                              }
                              if(pageData.pdScore==null){
                                pageData.pdScore=0
                              }
                              if(pageData.pbTime==null){
                                pageData.pbTime=0
                              }
                              if(pageData.cmScore==null){
                                pageData.cmScore=0
                              }
                              if(pageData.fbCorrectCount==null){
                                pageData.fbCorrectCount=0
                              }
                              if(pageData.tbScore==null){
                                pageData.tbScore=0
                              }
                              if(pageData.angleCounT==null){
                                pageData.angleCounT=0
                              }
                              if(pageData.pairingnum==null){
                                pageData.pairingnum=0
                              }
                              if(pageData.singleletternum==null){
                                pageData.singleletternum=0
                              }
                              if(pageData.totaldurationsa==null){
                                pageData.totaldurationsa=0
                              }  
                              //展示今天曲线数据赋值                        
                              that.setData({
                                //拼图
                                pdScore:pageData.pdScore,
                                pdTime:pageData.pdTime,
                                pdDate:pageData.pdDate,
                                //拼板
                                pbScore:pageData.pbScore,
                                pbTime:pageData.pbTime,
                                pbDate:pageData.pbDate,
                                //感知觉
                                sfCountT:pageData.sfCountT,
                                sfCountF:pageData.sfCountF,
                                sfTime:pageData.sfTime,
                                sfDate:pageData.sfDate,
                                //棋类
                                jcCollectChess:pageData.jcCollectChess,
                                jcContinuousNumber:pageData.jcContinuousNumber,
                                jcAvgTime:pageData.jcAvgTime,
                                jcDate:pageData.jcDate,
                                //精细动作
                                fmLevel:pageData.fmLevel,
                                fmCompleteRate:pageData.fmCompleteRate,
                                fmNumber:pageData.fmNumber,
                                fmTime:pageData.fmTime,
                                fmDate:pageData.fmDate,
                                //逻辑狗
                                ldUpdateTopic:pageData.ldUpdateTopic,
                                ldCorrectProbability:pageData.ldCorrectProbability,
                                ldUpdateTime:pageData.ldUpdateTime,
                                ldTime:pageData.ldTime,
                                ldDate:pageData.ldDate,
                                //数独
                                skRudimentDate:pageData.skRudimentDate,
                                skUpdateDate:pageData.skUpdateDate,
                                skUpdateTime:pageData.skUpdateTime,
                                skTime:pageData.skTime,
                                skDate:pageData.skDate,
                                //迷宫
                                mbMaze:pageData.mbMaze,
                                mbCompleteRate:pageData.mbCompleteRate,
                                mbFootCount:pageData.mbFootCount,
                                mbTime:pageData.mbTime,
                                mbDate:pageData.mbDate,
                                //记忆翻翻乐
                                mhLevel:pageData.mhLevel,
                                mhCorrectProbability:pageData.mhCorrectProbability,
                                mhCorrectNumber:pageData.mhCorrectNumber,
                                mhAvgTime:pageData.mhAvgTime,
                                mhDate:pageData.mhDate,
                                //空间记忆
                                cmScore:pageData.cmScore,
                                cmMemoryBreadth:pageData.cmMemoryBreadth,
                                cmCorrectCount:pageData.cmCorrectCount,
                                cmErrorCount:pageData.cmErrorCount,
                                cmTime:pageData.cmTime,
                                cmDate:pageData.cmDate,
                                //数字记忆
                                fbCorrectRate:pageData.fbCorrectRate,
                                fbCorrectCount:pageData.fbCorrectCount,
                                fbErrorCount:pageData.fbErrorCount,
                                dbAvgReacTime:pageData.dbAvgReacTime,
                                fbTime:pageData.fbTime,
                                fbDate:pageData.fbDate,
                                //听力记忆
                                tbScore:pageData.tbScore,
                                tbMemoryBreadth:pageData.tbMemoryBreadth,
                                tbCorrectCount:pageData.tbCorrectCount,
                                tbErrorCount:pageData.tbErrorCount,
                                tbTime:pageData.tbTime,
                                tbDate:pageData.tbDate,
                                //注意力
                                testTypeName:pageData.testTypeName,
                                rightCountAll:pageData.rightCountAll,
                                rightCountClick:pageData.rightCountClick,
                                drillDate:pageData.drillDate,
                                //区角
                                angleCounT:pageData.angleCounT,
                                angleCounF:pageData.angleCounF,
                                angleTime:pageData.angleTime,
                                angleAvgTime:pageData.angleAvgTime,
                                angleDate:pageData.angleDate,
                                //语文
                                pairingnum:pageData.pairingnum,
                                misspellingnum:pageData.misspellingnum,
                                totalduration:pageData.totalduration,
                                averageduration:pageData.averageduration,
                                chinesetime:pageData.chinesetime,
                                //数学
                                thatsrightnum:pageData.thatsrightnum,
                                miscalculationnum:pageData.miscalculationnum,
                                totaldurationsa:pageData.totaldurationsa,
                                averagedurationa:pageData.averagedurationa,
                                mathematicstime:pageData.mathematicstime,
                                //英语
                                singleletternum:pageData.singleletternum,
                                averagedurations:pageData.averagedurations,
                                wordnum:pageData.wordnum,
                                wordtotaltime:pageData.wordtotaltime,
                                englishtime:pageData.englishtime
            
                              })                                                  
                            },
            }),

            wx.request({//思维前一天曲线图
              url: 'https://zyservice.xicp.io/DrillBalance/eduProgram', 
              data:{
                date:DATE,
                uId:uId
              },
              method:"GET",
              header: {
                'content-type': 'application/json' 
              },
              success (res) {
                console.log("前一天思维数据"+res.data)
                if(res.data.data.sfCountT==null){
                  res.data.data.sfCountT=0
                }
                if(res.data.data.fmTime==null){
                  res.data.data.fmTime=0
                }
                if(res.data.data.ldCorrectProbability==null){
                  res.data.data.ldCorrectProbability=0
                }
                if(res.data.data.skTime==null){
                  res.data.data.skTime=0
                }
                if(res.data.data.jcCollectChess==null){
                  res.data.data.jcCollectChess=0
                }
                if(res.data.data.mbTime==null){
                  res.data.data.mbTime=0
                }
                if(res.data.data.pdScore==null){
                  res.data.data.pdScore=0
                }
                if(res.data.data.pbTime==null){
                  res.data.data.pbTime=0
                }
                if(res.data.data.cmScore==null){
                  res.data.data.cmScore=0
                }
                if(res.data.data.fbCorrectCount==null){
                  res.data.data.fbCorrectCount=0
                }
                if(res.data.data.tbScore==null){
                  res.data.data.tbScore=0
                }
                if(res.data.data.angleCounT==null){
                  res.data.data.angleCounT=0
                }
                if(res.data.data.pairingnum==null){
                  res.data.data.pairingnum=0
                }
                if(res.data.data.singleletternum==null){
                  res.data.data.singleletternum=0
                }
                if(res.data.data.totaldurationsa==null){
                  res.data.data.totaldurationsa=0
                }
                
                     that.setData({
                      sfCountTT:res.data.data.sfCountT,
                      fmTimee:res.data.data.fmTime,
                      ldCorrectProbabilityy:res.data.data.ldCorrectProbability,
                      skTimee:res.data.data.skTime,
                      jcCollectChesss:res.data.data.jcCollectChess,
                      mbTimee:res.data.data.mbTime,
                      pdScoree:res.data.data.pdScore,
                      pbTimee:res.data.data.pbTime,
                      cmScoree:res.data.data.cmScore,
                      fbCorrectCountt:res.data.data.fbCorrectCount,
                      tbScoree:res.data.data.tbScore,
                      angleCounTT:res.data.data.angleCounT,
                      pairingnumm:res.data.data.pairingnum,
                      singleletternumm:res.data.data.singleletternum,
                      totaldurationsaa:res.data.data.totaldurationsa
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
console.log(thas.totaldurationsa)
try {
  var res = wx.getSystemInfoSync(); 
  windowWidth = res.windowWidth;
} catch (e) {
  console.error('getSystemInfoSync failed!'); 
}
    yuelineChart = new wxCharts({ //当月用电折线图配置
      canvasId: 'yueEle',
      type: 'line',
      categories: ['感知觉', '精细动作', '逻辑狗', '数独', '棋类', '迷宫', '拼图', '拼板', '空间记忆', '数字记忆', '听力记忆', '区角','语文','数学','英语'], //categories X轴
      animation: true,
    //  background: 'red',
          series: [ {
            name: '今天',
            data:[thas.sfCountT,thas.fmTime,thas.ldCorrectProbability,thas.skTime,thas.jcCollectChess,thas.mbTime,thas.pdScore,thas.pbTime,thas.cmScore,thas.fbCorrectCount,thas.tbScore,thas.angleCounT,thas.pairingnum,thas.singleletternum,thas.totaldurationsa],
            color:'red'
          },{
            name: '昨天',
            data:[thas.sfCountTT,
                  thas.fmTimee,
                  thas.ldCorrectProbabilityy,
                  thas.skTimee,
                  thas.jcCollectChesss,
                  thas.mbTimee,
                  thas.pdScoree,
                  thas.pbTimee,
                  thas.cmScoree,
                  thas.fbCorrectCountt,
                  thas.tbScoree,
                  thas.angleCounTT,
                  thas.pairingnumm,
                  thas.singleletternumm,
                  thas.totaldurationsaa],
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