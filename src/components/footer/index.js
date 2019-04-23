import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import css from './index.less';
import { TB_SHOP_HOME_LINK, TB_SHOP_SEARCH_LINK } from 'common/const/links';

export default class Footer extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    const links = [
      {
        title: '店铺首页',
        link: TB_SHOP_HOME_LINK,
      },
      {
        title: '全部商品',
        link: TB_SHOP_SEARCH_LINK,
      }
    ];
    return (
      <div className={css.footer}>
        <div className={css.links}>
          {
            links.map((item, index) => {
              const props = {
                key: index,
                href: item.link,
              };
              return (
                <a {...props}>{item.title}</a>
              );
            })
          }
        </div>
        <div className={css.support}>
          本页面由 成都盛夏科技 提供技术支持
        </div>
      </div>
    );
  }
}
