const { $Toast } = require('components/dist/base/index');
const STATUS = {
  OK: 200,
  UN_LOGIN: 401, // 表示会话过期或会话不存在，需要重新登录
  NOT_FOUND: 404,
}

/**
 * 微信request请求
 * 注：需要在指定wxml文件引入<i-toast id="toast" />，才会出现自定义提示信息
 */
var request = function (options){
  if (!options){
    return false;
  }

  if (options.showLoading) {
    $Toast({
      content: '加载中',
      type: 'loading',
      duration: 20
    });
  }
  
  let fail = options.fail;
  let success = options.success;
  let complete = options.complete;

  // 请求成功执行
  options.success = res => {
    var msg = "服务异常,请重试!";
    var toastShow = true;

    if (options.showLoading) {
      $Toast.hide();
    }

    if (res) {
      if (res.statusCode == STATUS.OK) {
        success && success(res);
        toastShow = false;
      } else if (res.statusCode == STATUS.UN_LOGIN) {
        // app.loginModalTip(); //登录提醒
      } else if (res.statusCode == STATUS.NOT_FOUND){
        msg = "请求的服务不存在!";
      }else {
        if (res.data && res.data.message) {
          msg = res.data.message;
        }
      }
    } else {
      fail && fail(res);
      if (res.data && res.data.message) {
        msg = res.data.message;
      }
    }

    if (toastShow){
      $Toast({
        content: msg,
        type: 'warning'
      });
    }
    
  }

  // 请求失败执行
  options.fail = res => {
    
    if (options.showLoading) {
      $Toast.hide();
    }

    $Toast({
      content: '无网络,请检查您的网络!',
      type: 'error'
    });

    fail && fail(res);
  }

  // 请求失败、成功都执行
  options.complete = res => {
    complete && complete(res);
  }

  try{
    wx.request(options)
  }catch(e){
    $Toast({
      content: '无网络,请检查您的网络!',
      type: 'error'
    });
  }
}

module.exports = request;