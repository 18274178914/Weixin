//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    u_code:"",//根据卡号查询
    u_code1:"",//远程教学登录
    jiaoxueclassId:"",
    uId:"",//将登录信息的ID传递到思维报告
    classId:"",
    schoolName:false,
    jxName:false,
  
    //轮播图片
    "bnrUrl": [{
      currentTab: 0,
      "url": "/static/img/1.jpg"
    }, {
        "url": "/static/img/3.jpg"
    }, {
        "url": "/static/img/2.jpg"
    }, {
        "url": "/static/img/4.jpg"
    }]
  },
  u_code:function(e){//获取登录卡号参数
       this.setData({
        u_code:e.detail.value
       })
  },
  u_code1:function(e){//获取登录卡号参数
    this.setData({
     u_code1:e.detail.value
    })
},
login1:function(){//远程教学
    var that=this;
    var uCode=that.data.u_code1
    if(uCode.length==9 || uCode.length==10){
          wx.request({
         //url: 'http://localhost:8080/answer',
         url: 'https://zyservice.xicp.io/answer',
            data:{
              uCode:uCode
            },  
            method:"GET", 
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res){
            console.log(res.data)
            if(res.data==1 || res.data==""){
              wx.showToast({
                title: '没有该学生',
                icon: 'success',
                duration: 1000
              })
            }else if(res.data==3 || res.data==""){
              wx.showToast({
                title: '不在远程教学',
                icon: 'success',
                duration: 1000
              })
            }else if(res.data==2 || res.data==""){
              wx.showToast({
                title: '没有该老师',
                icon: 'success',
                duration: 1000
              })
            }else if(res.data!=""){          
              that.setData({
                jiaoxueclassId:res.data,
                jxName:false,
              })
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 1000
              })
            }
          }
        })
    }else if(uCode.length==""){//
      wx.showToast({
        title: '请输入',
        icon: 'success',
        duration: 1000
      })
    }else{
      wx.showToast({
        title: '请查看提示信息',
        icon: 'success',
        duration: 1000
      })
    }
    
},
  login:function(){//小程序登录
    var thar=this;
    var u_code=thar.data.u_code
    var classId=thar.data.classId
    var schoolName=thar.data.schoolName
    if(u_code.length==10){
      console.log("家长")
      wx.request({
        url: 'https://zyservice.xicp.io/PublicInfoStudentBase/selectSchoolGradeClassByUCode',
        data:{
          uCode:u_code     
        },  
        method:"GET",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res){
          console.log(res)
          if(res['data']['msg']=="没有该学生"){
            wx.showToast({
              title: '登录失败',
              image:'/static/img/error1.png',
              duration: 1000
            })
            console.log("失败")
          }else{
           console.log("登录成功")
            thar.setData({
              uId:res.data.data.uId,
              schoolName:false,
            }),
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 1000
            })
          }
        }
      })
    }else if(u_code.length==8){
      console.log("班级"+u_code)
        classId=u_code
        thar.setData({
          schoolName:false
        })
      console.log(classId) 
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1000
      })
    }else if(u_code==""){
      wx.showToast({
        title: '请输入',
        icon: 'success',
        duration: 1000
      })
    }else{
      wx.showToast({
        title: '请查看提示信息',
        icon: 'success',
        duration: 1000
      })
    }
  },
  gunabilogin:function(){//小程序登录退出
        var that=this;
        console.log("点击了"+that.data.schoolName)
        that.setData({
          schoolName:false
        })
  },
  gunabilogin1:function(){//小程序登录退出
    var that=this;
    console.log("点击了"+that.data.jxName)
    that.setData({
      jxName:false 
    })
},
  goTochinese:function(){//医生登录
    var that=this;
    var code=that.data.u_code
    console.log(code+"-----------")
    if(code.length==8){
      console.log("主页传过去的参数"+code)
      wx.navigateTo({
        url: '/pages/School/school?code='+code
      })
    }
    if(code.length==10){
      wx.showToast({
        title: '非教师无法登陆',
        icon: 'success',
        duration: 1000
      })
    }
    if(code.length==""){
      wx.showToast({
        title: '请登录',
        icon: 'success',
        duration: 1000
      })
      that.setData({
        schoolName:true
      })
    }
  },
  goToSelect: function () {//个人信息
    var that=this;
    var uId=that.data.uId
    var code=that.data.u_code
    console.log(code+"-----------"+uId)
    if(code.length==10){
      if(uId==""){
        wx.showToast({
          title: '请登录',
          icon: 'success',
          duration: 1000
        })
        that.setData({
          schoolName:true
        })
      }else{
        wx.navigateTo({
          url: '/pages/Select/select?uId='+uId,
        })
      }
    }
     if(code.length==8){
      wx.navigateTo({
        url: '/pages/School/school?code='+code
      })
    }
    if(code.length==""){
      wx.showToast({
        title: '请登录',
        icon: 'success',
        duration: 1000
      })
      that.setData({
        schoolName:true
      })
    }
  },
  goTocepin: function () {//测评
    wx.navigateTo({
      url: '/pages/Cepin/cepin',
   })
  },
  goToyundon:function(){//运动
    var that=this;
    var uId=that.data.uId
    var code=that.data.u_code
    console.log(code+"-----------"+uId)
    if(code.length==10){
      if(uId==""){
        wx.showToast({
          title: '请登录',
          icon: 'success',
          duration: 1000
        })
        that.setData({
          schoolName:true
        })
      }else{
        wx.navigateTo({
          url: '/pages/Yundong/yundong?uId='+uId,
        })
      }
    }
     if(code.length==8){
      wx.navigateTo({
        url: '/pages/School/school?code='+code
      })
    }
    if(code.length==""){
      wx.showToast({
        title: '请登录',
        icon: 'success',
        duration: 1000
      })
      that.setData({
        schoolName:true
      })
    }
    
  },  
  goTosiwei: function () {//思维能力
    var that=this;
    var uId=that.data.uId
    var code=that.data.u_code
    console.log(code+"-----------"+uId)
    if(code.length==10){
      if(uId==""){
        wx.showToast({
          title: '请登录',
          icon: 'success',
          duration: 1000
        })
        that.setData({
          schoolName:true
        })
      }else{
        wx.navigateTo({
          url: '/pages/Siwei/siwei?uId='+uId,
        })
      } 
    }
    if(code.length==8){
      console.log("主页传过去的参数"+code)
      wx.navigateTo({
        url: '/pages/School/school?code='+code
      })
    }
    if(code.length==""){
      wx.showToast({
        title: '请登录',
        icon: 'success',
        duration: 1000
      })
      that.setData({
        schoolName:true
      })
    }
   
  }, 
  goTojiaoxue:function(){//远程教学
    var that=this;
    var uCode=that.data.jiaoxueclassId
    var ucode=that.data.u_code1
    console.log("教师"+uCode)
    console.log("家长"+ucode)
    if(ucode.length==9){
      wx.navigateTo({
         url: '/pages/Jiaoxue/jiaoxue?uCode='+uCode+'&ucode='+ucode,
       })
    }else if(ucode.length==10){
      wx.navigateTo({
         url:'/pages/Yuanchenjia/yuanchenjia?uCode='+uCode,
       })
    }else{
      wx.showToast({
        title: '请登录',
        icon: 'success',
        duration: 1000
      }) 
      that.setData({
        jxName:true
      })
     }
     
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
  xuanzewode: function () {//我的
    var that=this;
    var uId=that.data.uId
    var code=that.data.u_code
    console.log(code+"-----------"+uId)
    if(code.length==10){
      if(uId==""){
        wx.showToast({
          title: '请登录',
          icon: 'success',
          duration: 1000
        })
        that.setData({
          schoolName:true
        })
      }else{
        wx.navigateTo({
          url: '/pages/Wode/wode?uId='+uId,
        })
      } 
    }
    if(code.length==8){
      wx.showToast({
        title: '非学生无法查看',
        icon: 'success',
        duration: 1000
      })
    }
    if(code.length==""){
      wx.showToast({
        title: '请登录',
        icon: 'success',
        duration: 1000
      })
      that.setData({
        schoolName:true
      })
    }
   


  },
  onLoad: function (options) {//
            if (app.globalData.userInfo) {
              console.log(app.globalData.userInfo)
              this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
              })
              } else if (this.data.canIUse){
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              app.userInfoReadyCallback = res => {
                console.log(res.userInfo)
                this.setData({
                  userInfo: res.userInfo,
                  hasUserInfo: true
                })
              }
              } else {
              // 在没有 open-type=getUserInfo 版本的兼容处理
              wx.getUserInfo({
                success: res => {
                  app.globalData.userInfo = res.userInfo
                  this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                  })
                }
              })
              }
  }
})
