const app = getApp()

Page({
  data: {
    userxinxi:false,
    schoolname:'',
    classname:'',
    gradename:'',
    Schooluser:[]
  },
  //事件处理函数
  
  onLoad: function (options) {
    var that=this;
    var classid=options.classId
    console.log(classid)
    wx.showLoading({
      title: '正在加载',
      icon:"loading",
      mask:true
    }),
    wx.request({
       url: 'https://zyservice.xicp.io/PublicInfoClass/StudentClassID',
      method:"GET",
      data:{
        _id:classid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res){ 
         if(res.statusCode==500){
          wx.showToast({
            title: '该班级没有学生',
            icon: 'success',
            duration: 1000
          })
         }else{
          that.setData({ 
            Schooluser: res.data.data,
            classname:res.data.data[0].class_name 
          })
         }     
      }
    })
    setTimeout(function () {
      wx.hideLoading()
    },2000)
  },
  siwei:function(e){//思维
    var uId=e.currentTarget.dataset.id
    console.log("思维"+uId)
    if(uId!=null){
      wx.navigateTo({
        url: '/pages/Siwei/siwei?uId='+uId,
      })
    }    
  },
  yundong:function(e){//运动
    var uId=e.currentTarget.dataset.id
    console.log("运动"+uId)
    if(uId!=null){
      wx.navigateTo({
        url: '/pages/Yundong/yundong?uId='+uId,
      })
    }    
  },
  sousuo:function(e){//搜索
    var uId=e.currentTarget.dataset.id
    console.log("搜索"+uId)
    if(uId!=null){
      wx.navigateTo({
        url: '/pages/Select/select?uId='+uId,
      })
    }    
  }
})
