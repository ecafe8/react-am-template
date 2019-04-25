import { getCartUrl, getStoreFollowUrl, isStoreFollow } from 'api';

export default class TidaUtils {

  // 从CFG中获取一些常用淘宝信息字段
  static getTbInfo(key = 'sellerId') {
    if (!CFG) {
      return undefined;
    }

    return (CFG.qsData && CFG.qsData[key]) || CFG[key];
  }

  static ready(callback = function() {}) {
    Tida.ready({
      module: ['device', 'media', 'server', 'social', 'widget', 'sensor', 'share', 'buy', 'draw', 'im', 'calendar', 'prize'],
      // console: 1,  //  默认关闭, 值为1时打开浮层console.
    }, function() {
      callback();
    });
  }

  static hideTitle() {
    Tida.hideTitle();
  }

  static followStore() {
    // Tida.subscribe.add({
    //   accountId: TidaUtils.getTbInfo('sellerId'),
    // }, function(data) {
    //   callback(data);
    // }, (e) => {
    //   console.log(JSON.stringify(e));
    // });

    getStoreFollowUrl().then((data) => {
      if (data && data.url) {
        Tida.pushWindow(data.url + '&method=replace');
      }
    });
  }

  static cart({itemId, skuId = 0}) {

    Tida.cart({
      sellerNick: TidaUtils.getTbInfo('sellerNick'),
      itemId,
      skuId
    });

    // todo 线上的tida版本有问题，回跳页面不关闭。先用旧版方法。
    // getCartUrl({
    //   itemIds: `${itemId}_${skuId}_1`,
    // }).then((data) => {
    //   if (data && data.result) {
    //     Tida.pushWindow(data.result + '&method=replace');
    //   }
    // });
  }

  static itemFavor({itemId}) {
    Tida.itemFavor({
      itemId: itemId, // 商品ID 注意这里只能用string
      action: 'add',
    }, function(data) {
      if (
        data.data === '该商品已收藏' ||
        data.data === '您已经收藏过了，请不要重复收藏。' ||
        data.errorCode === 'ALREADY_COLLECTION' ||
        (data.WOPC_ERROR && data.WOPC_ERROR.errorCode === 'ALREADY_COLLECTION')
      ) {
        TidaUtils.toast('该商品已收藏');
      }
    });
  }

  static toDetailPage({itemId}) {
    window.location.href = `https://item.taobao.com/item.htm/?id=${itemId}`;
  }

  static backToTB() {
    Tida.popWindow();
  }

  static viewVisibleWatcher(show = () => {}, hidden = () => {}) {
    Tida.pageVisibility.watch(function(result) {
      // ~ visible 1为激活 0为隐藏
      // ~ 移动端按Home键回到桌面js会挂起不执行
      // 所有再次回到页面该方法会先后一起调用，注意区别该值
      if (result.visible === 1) {
        show();
      } else {
        hidden();
      }
    });
  }

  static getAppinfo() {
    return Tida.appinfo;
  }

  static toast(msg = '系统繁忙！') {
    if (Tida.toast) {
      Tida.toast(msg);
    } else {
      alert(msg);
    }
  }

  static getMixNick() {
    Tida.mixNick({}, function(data) {
      if (data && data.data && data.data.mixnick) {
        // console.log('mixnick:', data.data.mixnick);
        CFG.mixNick = data.data.mixnick;
      }
    });
  }
}
