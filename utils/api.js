// 服务端地址
const SERVER_PATH = "https://mp-test.pureh2b.com/api/";

var api = {
  // 用户登录
  wxUserLogin: SERVER_PATH + 'wx/main/login',

  // 解密用户微信信息
  wxUserInfo: SERVER_PATH + "wx/main/info",

  // 解密用户微信手机号
  wxUserPhone: SERVER_PATH + "wx/main/phone",

  // 用户注册
  memberRegister: SERVER_PATH + "member/register",

  // 用户信息
  memberDetail: SERVER_PATH + "member/detail",

  // 推屏商品数据
  indexCommoditys: SERVER_PATH + "recommend/home/prodcut/list",
};

module.exports = api;