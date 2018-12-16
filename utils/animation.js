/**
 * 渐入，渐出实现
 */
const show = function(name, opacity) {
  var animation = wx.createAnimation({
    //持续时间800ms
    duration: 800,
    timingFunction: 'linear',
  });
  //var animation = this.animation
  animation.opacity(opacity).step()
  //将param转换为key
  var json = '{"' + name + '":""}'
  json = JSON.parse(json);
  json[name] = animation.export()
  //返回动画
  return json
}

/**
 * 滑动渐入渐出
 */
const slideUpShow = (name, px, opacity) => {
  var animation = wx.createAnimation({
    duration: 800,
    timingFunction: 'ease',
  });

  animation.translateY(px).opacity(opacity).step()
  //将param转换为key
  var json = '{"' + name + '":""}'
  json = JSON.parse(json);
  json[name] = animation.export();

  //返回动画
  return json
}

/**
 * 向右滑动渐入渐出
 */
const slideRightShow = (name, px, opacity) => {
  var animation = wx.createAnimation({
    duration: 800,
    timingFunction: 'ease',
  });

  animation.translateX(px).opacity(opacity).step()
  //将param转换为key
  var json = '{"' + name + '":""}'
  json = JSON.parse(json);
  json[name] = animation.export()

  //返回动画
  return json;
}

module.exports = {
  show: show,
  slideUpShow: slideUpShow,
  slideRightShow: slideRightShow
}