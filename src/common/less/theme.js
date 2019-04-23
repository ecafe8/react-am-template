const path = require('path'); // eslint-disable-line
const srcPath = path.resolve(process.cwd(), './src');

/**
 * ！！注意：修改后重启服务生效！！
 */
const sxLessVar = {
  'font-family': '-apple-system, BlinkMacSystemFont, "SF UI Text", "Helvetica Neue", STHeiti, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", "WenQuanYi Zen Hei", Tahoma,Simsun, sans-serif',

};


 /* eslint-disable */
// 官方提供的 less 样式入口文件  用于查看可覆盖定义的less变量
// less 里如需使用antd的变量，需要 @import "~antd-mobile/lib/style/themes/default.less";
// 变量名查看：https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
const theme = {
  'brand-primary': '#e92b45',
  'brand-primary-tap': '#f55363',
  'brand-important': '#c21935',
  'brand-wait': '#e92b45',
  ...sxLessVar,
};

module.exports = theme;
