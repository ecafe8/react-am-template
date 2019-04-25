import Ajax from 'common/utils/ajax';
import TidaUtils from 'common/utils/tida';

/**
 * @api {get} /getStoreFollowUrl 获取店铺关注链接
 * @apiName getStoreFollowUrl
 * @apiGroup Tida
 * @apiVersion 1.0.0
 * @apiDescription 获取店铺关注链接
 *
 * @apiParam {string} callBackUrl 关注后的回调地址，不传则默认跳转会本页面。（可在关注领券时，跳转到优惠券领券地址）
 * @apiParam {string} tbSellerUid 卖家id，通过CFG获取
 *
 * @apiSuccess {String} url 店铺关注链接
 *
 * @apiSuccessExample {json} 成功返回示例
 * HTTP/1.1 200 OK
 * {
 *  code: 0,
 *  msg: '',
 *  data: {
 *       url: '//www.taobao.com',
 *    }
 * }
 */
export const getStoreFollowUrl = async (params) => await Ajax.req({
  url: 'getStoreFollowUrl',
  params: {
    tbSellerUid: TidaUtils.getTbInfo('sellerId'),
    ...params,
  },
  errorNotice: '获取店铺关注链接失败，请稍后再试。',
});


/**
 * @api {get} /isStoreFollow 是否已关注店铺
 * @apiName isStoreFollow
 * @apiGroup Tida
 * @apiVersion 1.0.0
 * @apiDescription 是否已关注店铺
 *
 * @apiParam {string} fansNick 买家nick，混淆nick
 * @apiParam {string} sellerNick 卖家nick，通过CFG获取
 *
 * @apiSuccess {Bool} result 是否关注店铺
 *
 * @apiSuccessExample {json} 成功返回示例
 * HTTP/1.1 200 OK
 * {
 *  code: 0,
 *  msg: '',
 *  data: {
 *       result: false
 *    }
 * }
 */
export const isStoreFollow = async (params) => await Ajax.req({
  url: 'isStoreFollow',
  params: {
    fansNick: CFG.mixNick,
    sellerNick: TidaUtils.getTbInfo('sellerNick'),
    ...params,
  },
  errorNotice: '获取关注店铺状态失败，请稍后再试。',
});

/**
 * @api {get} /getCartUrl 加购URL获取
 * @apiName getCartUrl
 * @apiGroup Tida
 * @apiVersion 1.0.0
 * @apiDescription 加购URL获取
 *
 * @apiParam {string} callBackUrl 回调地址，需要是EWS域名地址。可不填，默认到购物车页面
 * @apiParam {string} tbSellerUid 卖家id，通过CFG获取
 * @apiParam {string[]} itemIds 商品信息，格式为 商品ID_SKU的ID_数量，多条记录以逗号(,)分割。例如：35865469573_3233126253071_3,35865469573_35039746317_1
 *
 * @apiSuccess {String} result 加购的URL地址
 *
 * @apiSuccessExample {json} 成功返回示例
 * HTTP/1.1 200 OK
 * {
 *  code: 0,
 *  msg: '',
 *  data: {
 *       result: '//www.taobao.com'
 *    }
 * }
 */
export const getCartUrl = async (params) => await Ajax.req({
  url: 'getCartUrl',
  params: {
    tbSellerUid: TidaUtils.getTbInfo('sellerId'),
    ...params,
  },
  errorNotice: '获取加购URL失败，请稍后再试。',
});
