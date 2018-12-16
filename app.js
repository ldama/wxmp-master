//app.js
import api from '/utils/api.js';
import request from '/utils/http.js';
import utils from '/utils/util.js';
import animation from '/utils/animation.js';

const STATUS = {
  OK: 200,
  UN_LOGIN: 401, // 表示会话过期或会话不存在，需要重新登录
  NOT_FOUND: 404,
}

App({

  globalData: {
    userInfo: null
  },

  windowHeight: 0,
  windowWidth: 0,

  isBind: false, // 记录用户是否绑定,false为未绑定
  token: '', // 用户的会话
  wxUserInfo: {}, // 微信授权的用户信息
  userSession: {}, // 用户回话信息，包含openid、sessionKey、unionid
  memberInfo: {}, // 会员信息

  URL: api, // 后台服务接口

  // 全局工具
  utils: {
    /**
     * 用于判断空，Undefined String Array Object
     */
    isBlank: function(param){
      return utils.isBlank(param);
    }
  },

  /**
   * 动画效果
   */
  animation: {
    show: function (params){
      return animation.show(params.name, params.opacity);
    },
    slideUpShow: function(params) {
      return animation.slideUpShow(params.name, params.px, params.opacity);
    },
    slideRightShow: function (params) {
      return animation.slideRightShow(params.name, params.px, params.opacity);
    }
  },

  /**
   * 封装request请求
   */
  request: {
    // 供内部GET,POST调用
    common: function (options, callback){
      var header = {};
      if (options.token && app.token && app.token != '') {
        header = { token: app.token };
      }

      options.header = header;

      var success = res => {
        var isOk = false;
        if (res.statusCode == STATUS.OK && res.data) {
          isOk = true;
        }

        callback && callback({
          isOk: isOk,
          data: res.data
        });
      }

      var fail = res => {
        callback && callback({
          isOk: false,
          data: res.data
        });
      }

      options.success = success;
      options.fail = fail;
      request(options);
    },
    GET: function (options){
      return new Promise((callback) => {
        options.method = "GET";
        app.request.common(options, res => {
          callback && callback(res);
        });
      })
    },
    POST: function (options){
      return new Promise((callback) => {
        options.method = "POST";
        app.request.common(options, res => {
          callback && callback(res);
        });
      })
    }
  },

  /**
   * 判断用户是否授权，授权则重新获取用户信息
   */
  isAuthorized: function (callback){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            lang: 'zh_CN',
            success: function (res) {
              app.wxUserInfo = res.userInfo;
              callback && callback(true, res);
            }
          })
        } else {
          callback && callback(false, res);
        }
      },
      fail: res => {
        callback && callback(false, res);
      }
    })
  },

  /**
   * 小程序运行时执行
   */
  onLaunch: function () {

    console.log("必须执行的代码");
    
    // 会员登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          app.request.GET({
            handlerError: true,
            url: app.URL.wxUserLogin,
            data: { code: res.code }
          }).then((res) => {
            if (res.isOk) {
              var data = res.data;
              if (data ){
                app.isBind = data.bind == 'ok'? true : false;
                if (data.member && data.session){
                  app.token = data.session.sessionKey;
                }
              }

              app.memberInfo = data.member;
            }
          }).catch(()=>{
            console.error("login fail");
          });
        }
      }
    });
  },

});

const app = getApp();