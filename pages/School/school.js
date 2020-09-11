//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userxinxi:false,
    schoolname:'',
    Schoolgrade:[]
  },
  //事件处理函数
  
  onLoad: function (options) {
    let that=this;
    var liaisonsPhone=options.code
    wx.showLoading({
      title: '正在加载',
      icon:"loading",
      mask:true
    }),
    wx.request({
       url: 'https://zyservice.xicp.io/PublicInfoSchool/SelectGrade',
      method:"GET",
      data:{
        liaisonsPhone:liaisonsPhone
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res){ 
        console.log(res)
        that.setData({ 
          Schoolgrade: res.data.data,
          schoolname:res.data.data[0].school_name,
        })
      }
    }),
    setTimeout(function () {
      wx.hideLoading()
    },2000)
  },
  chakan:function(e){
    var gradeId=e.currentTarget.dataset.id
    console.log("班级"+gradeId)
    wx.navigateTo({
      url: '/pages/Banji/banji?gradeId='+gradeId,
    })
   
  }
})
