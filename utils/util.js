var NewApiRootUrl = 'https://admin.tengweiyun.com/api/test20180815/';

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function crtTimeFtt(val, row) {
  if (val != null) {
      var date = new Date(val);
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  }
}

const formaDate = date => {//获取今天
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-') 
}

const formaDate1 = date => {//获取前一天时间
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()-1
  return [year, month, day].map(formatNumber).join('-') 
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}



module.exports = {
  formatTime: formatTime,
  formaDate:formaDate,
  formaDate1:formaDate1,
  crtTimeFtt:crtTimeFtt
}
