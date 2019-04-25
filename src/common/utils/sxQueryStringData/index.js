import { getQueryString } from 'common/utils';
import LZString from 'lz-string';
const { decompressFromBase64 } = LZString;

/**
 * 初始化路径中传递过来的参数
 */
const initQueryStringData = () => {
  let data = {
    sellerNick: '',
    sellerId: '',
    shopId: '',
    shopTitle: '',
    shopLogoUrl: '',
  };
  const qsJson = getQueryString('qs'); // 和 cici 约定，以上数据可以从 window.location.search.substr(1) 里传递。
  if (qsJson) {
    try {
      const qsData = JSON.parse(decompressFromBase64(qsJson));
      data = {
        ...qsData
      };
    } catch (e) {
      console.error(e);
    }
  }

  window.CFG = {
    ...CFG,
    qsData: data,
  };

};

export default initQueryStringData;
