const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 用于判断空，Undefined String Array Object
 */
const isBlank = param => {
  var call = Object.prototype.toString.call(param);
  if (call === '[object Undefined]') {//空
    return true
  } else if ( call === '[object String]' || call === '[object Array]') { //字条串或数组
    return param.length == 0 ? true : false
  } else if (call === '[object Object]') {
    return JSON.stringify(param) == '{}' ? true : false
  } else {
    return true
  }
}

module.exports = {
  formatTime: formatTime,
  isBlank: isBlank
}
