import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import css from './index.less';
import { TB_DETAIL_LINK } from 'common/const/links';

export default class ItemList extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  renderItem(item) {
    const { pic_url, title, price, item_promo_price, num_iid } = item;
    const props = {
      className: css.item,
      onClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = TB_DETAIL_LINK + num_iid;
      }
    };
    return (
      <div {...props}>
        <div className={css.img}>
          <img src={pic_url} alt={title} />
        </div>
        <div className={css.meta}>
          <div className={css.title}>{title}</div>
          <div className={css.price}>
            <span className={css.symbol}>&yen;</span>
            <span>{item_promo_price || price}</span>
          </div>
        </div>
      </div>
    );
  }

  renderList() {
    if (!CFG.data.itemList || !CFG.data.itemList.length) {
      return <div className={css.empty}>抱歉，暂无相关商品</div>;
    }

    return CFG.data.itemList.map((item, index) => {
      return (
        <Fragment key={index}>
          {this.renderItem(item)}
        </Fragment>
      );
    });
  }

  render() {
    return (
      <div className={css.wrap}>
        {this.renderList()}
      </div>
    );
  }
}
