
import TidaUtils from 'common/utils/tida';

const shopId = TidaUtils.getTbInfo('shopId');


export const TB_DETAIL_LINK = '//item.taobao.com/item.htm/?id=';

export const TB_SHOP_HOME_LINK = shopId ? `//shop${shopId}.taobao.com` : '//m.taobao.com';

export const TB_SHOP_SEARCH_LINK = `https://market.m.taobao.com/app/tb-source-app/shop-auction/pages/auction?shopId=${shopId}&disablePromotionTips=false&shop_navi=allitems&displayShopHeader=true`;
