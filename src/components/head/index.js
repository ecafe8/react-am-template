import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import { TB_SHOP_HOME_LINK } from 'common/const/links';
import { NavBar } from 'antd-mobile';
import Icon from 'components/icon';
import svgHome from 'assets/icons/home-fill.svg';
import svgStar from 'assets/icons/star.svg';
import css from './index.less';
import TidaUtils from 'common/utils/tida';

export default class Head extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  renderRightContent() {
    const props = {
      className: css.fav,
      onClick: () => {
        TidaUtils.followStore();
      }
    };
    return (
      <div {...props}>
        <div><Icon type={svgStar} /></div>
        <div>关注店铺</div>
      </div>
    );
  }

  renderLeftContent() {
    const logoUrl = TidaUtils.getTbInfo('shopLogoUrl');
    if (logoUrl) {
      return (
        <div className={css.logo}>
          <img src={logoUrl} />
        </div>
      );
    }
    return (
      <Icon type={svgHome} className={css.txt} />
    );
  }

  render() {
    const shopTitle = TidaUtils.getTbInfo('shopTitle');
    const props = {
      className: css.head,
      mode: 'light',
      onLeftClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = TB_SHOP_HOME_LINK;
      },
      leftContent: this.renderLeftContent(),
      rightContent: this.renderRightContent(),
    };
    return (
      <NavBar {...props}>
        {shopTitle || '欢迎访问本店'}
      </NavBar>
    );
  }
}
