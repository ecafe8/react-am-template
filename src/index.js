import React, { Fragment } from 'react';
import ReactDom from 'react-dom';
import Layout from './layout';
import './index.less';
import { Helmet } from 'react-helmet';
import Error from 'components/error';

import initReactFastclick from 'react-fastclick';
initReactFastclick();

// import('vconsole').then(VConsole => {
//   new VConsole();
// });


// const ICON_FONT_URL = '//at.alicdn.com/t/font_1135128_pv7wts3a35k.js';
const renderHtmlMeta = () => {
  const metaProps = {
    title: CFG.data.title || '',
    // script: [{
    //   type: 'text/javascript',
    //   charset: 'UTF-8',
    //   src: ICON_FONT_URL,
    //   defer: true,
    // }],
  };
  return <Helmet {...metaProps} />;
};

ReactDom.render(
  <Error>
    {renderHtmlMeta()}
    <Layout />
  </Error>,
  document.getElementById('root')
);


