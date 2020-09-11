// pages/Select/select.js
var util=require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '选择日期',
    hiddenName:false,
    //个人信息
    schoolname:'',gradename:'',classname:'',name:'',sex:'',code:'',nianlin:'',
    //运动能力数据
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
    bengchuang: "蹦床", trCount: "",trLAve: "",trRAve: "",trDate:"",
    //坐位体前屈
    tiqianqu:"坐位体前屈",flBestSocre: "",flFirstSocre: "",flSecondSocre: "",flDate:"",
    //新版脚步器
    onejiaobuqi:"新版脚步器",deTest: "",deCount: "",deSpeed: "",deDate:"",
    //双脚连续跳
    lianxutiao:"双脚连续跳",dfTotalTime: "",dfTotalAvgTime: "",dfReactionTime: "",dfDate:"",
    //平衡木
    pinghengmu:"平衡木",bwTest: "",bWSumAngleL: "",bwSumAngleR: "",bwDistance:"",bwDate:"",
    //平衡台
    pinghengtai:"平衡台",baSumAngle: "",baSumAngleL: "",baSumAngleR: "",baTest:"",baDate:"",
    //手眼协调
    shouyanxietiao:"手脚协调",hfScore: "",hfAverageTime1: "",hfAverageTime2: "",hfAverageTime3:"",hfDate:"",
     //老版脚步器
     xinjiaobuqi:"老版脚步器",dlTest: "",dlShortTime: "",dlLongTime: "",dlAvgTime:"",dlNum:"",dlDate:"",
    //折返跑
     zhefangpao:"折返跑",rbRunLong: "",rbTotalTime: "",rbTimeF: "",rbZs:"",rbTimeB:"",rbDate:"",
       //骑行
    qixing:"骑行",startTime: "",endTime: "",number: "",dateTime:"",averageTime:"",testTime:"",
    //思维能力数据
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      u_id:options.uId
    })
    var uId=that.data.u_id
    console.log(uId)
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
  })
  },

  bindDateChange: function(e) {//选择日期
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date:e.detail.value
    })
  },
  
  chaxun:function(e){//进行查询
    console.log("点击了查询按钮")
    let that = this;
    var uId=that.data.u_id
    var date=that.data.date
    console.log(uId+date)
    if(date=="选择日期"){
      wx.showToast({
        title: '选择日期',
        icon:"success",
        duration:1000
      })
    }else{
      wx.showLoading({
        title: '正在加载',
        icon:"loading",
        mask:true 
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
              trLAve:pageData.trLAve,
              trRAve:pageData.trRAve,
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
              bWSumAngleL:pageData.bWSumAngleL,
              bwSumAngleR:pageData.bwSumAngleR,
              bwDistance:pageData.bwDistance,
              bwDate:pageData.bwDate,
              //平衡台
              baSumAngle:pageData.baSumAngle,
              baSumAngleL:pageData.baSumAngleL,
              baSumAngleR:pageData.baSumAngleR,
              baTest:pageData.batTest,
              baDate:pageData.baDate,
              //平衡台
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
      //获取思维数据
      wx.request({
        url: 'https://zyservice.xicp.io/DrillBalance/eduProgram', 
        data:{
          date:date,
          uId:uId
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res)
          var pageData = res.data.data;
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
             englishtime:pageData.englishtime,
              hiddenName:!that.data.hiddenName.true
          }) 
        }
      }),
      setTimeout(function () {
        wx.hideLoading() 
      },2000)
    }
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