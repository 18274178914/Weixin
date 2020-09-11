//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userxinxi:false,
    gradename:'',
    classstudent:[]
  },
  //事件处理函数
  
  onLoad: function (options) {
    console.log(options.gradeId)
    var gradeid=options.gradeId
    let that=this;
    wx.showLoading({
      title: '正在加载',
      icon:"loading",
      mask:true
    }),
    wx.request({
       url: 'https://zyservice.xicp.io/PublicInfoGrade/SelectClassID',
      method:"GET",
      data:{
        gradeId:gradeid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res){ 
        console.log(res)
        that.setData({ 
          classstudent: res.data.data,
          gradename:res.data.data[0].grade_name
        })
      }
    }),
    setTimeout(function () {
      wx.hideLoading()
    },1000)
  },
  chakanstudent:function(e){//跳转学生页面
    var classId=e.currentTarget.dataset.id
    console.log("班级"+classId)
    wx.navigateTo({
      url: '/pages/Yisheng/yisheng?classId='+classId,
    })
  },
  getUserInfo: function(e) {
  
  }
})
