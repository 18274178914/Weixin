// pages/Wode/wode.js
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    schoolname:'',gradename:'',classname:'',name:'',sex:'',code:'',nianlin:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '学生信息' 
    })
    var that=this;
    var uid=options.uId
    console.log(uid)
    wx.showLoading({
      title: '正在加载',
      icon:"loading"
    }),
          //获取学生信息
          wx.request({
            url: 'https://zyservice.xicp.io/PublicInfoStudentBase/selectuId',
            data:{
              uId:uid
            },
            method:"GET",
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (res) {
              console.log(res)
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
    setTimeout(function () {
      wx.hideLoading()
    },1000)
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