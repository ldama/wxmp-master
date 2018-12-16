//index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0, //屏幕高度
    windowWidth: 0, // 屏幕宽度
    swiperIndex: 0,
    commodityList: [],
    current: 0,
    checked: true,
    loginBoxShow: false, // 显示登录框
    contentShow: false,
  },

  /**
   * 轮播监听事件
   */
  autoplay: function (e) {
    this.setData({
      current: e.detail.current
    });
  },

  /**
   * 禁用IOS弹性效果
   */
  preventTouchMove: function () {
    return false;
  },

  /**
   * 扫码按钮
   */
  scanCode: function () {
    app.scanCode();
  },

  /**
   * 跳转首页
   */
  gotoMain: function () {
    wx.switchTab({
      url: '/pages/main/main',
    })
  },

  /**
   * 跳转商品详情
   */
  gotoDetail: function (e) {
    var commodityNo = e.currentTarget.dataset.commodityNo;
    var goodsNo = e.currentTarget.dataset.goodsNo;
    app.gotoDetail(commodityNo, goodsNo);
  },

  /**
   * 左右滑触发事件
   */
  bindchange: function (e) {
    //console.log(e.detail.current);
    this.setData({
      swiperIndex: e.detail.current
    })
  },

  /**
   * 获取页面数据
   */
  queryList: function () {

    app.request.GET({
      showLoading: true,
      handlerError: true,
      url: app.URL.indexCommoditys,
    }).then((res) => {
      if(res.isOk){
        this.setData({
          commodityList: res.data
        });
      }
    })
  },

  /**
   * checked-box控制事件
   */
  changeBox: function () {
    var checked = true;
    if (this.data.checked) {
      checked = false;
    }

    this.setData({
      checked: checked
    });
  },

  /**
   * 获取用户信息
   */
  onGotUserInfo: function (e) {

    if (e.detail.errMsg == "getUserInfo:ok") {

      this.queryList();
      app.wxUserInfo = e.detail.userInfo;

      this.setData({
        loginBoxShow: false,
        contentShow: true,
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight,
      windowWidth: wx.getSystemInfoSync().windowWidth,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    app.isAuthorized((isOk, res) => {
      if (!isOk) {
        this.setData({
          loginBoxShow: true,
        });
      } else {
        this.queryList();

        this.setData({
          contentShow: true,
        });
      }
    });

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