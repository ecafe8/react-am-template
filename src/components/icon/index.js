import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import css from './index.less';
import classnames from 'classnames';

const SIZE_MAP = {
  xxs: 15,
  xs: 18,
  sm: 21,
  md: 22,
  lg: 36,
};


/**
 * SVG Icon 组件
 *
 * 例如:
 * import svgHome from 'assets/icons/home-fill.svg';
 * <Icon type={svgHome} />
 */
export default class Icon extends PureComponent {

  static propTypes = {
    type: PropTypes.object, // svg 文件对象
    className: PropTypes.string,
    size: PropTypes.oneOf(['xxs', 'xs', 'sm', 'md', 'lg']),
  };

  static defaultProps = {
    size: 'md',
  };

  render() {
    const { type, className, size, ...restProps } = this.props;
    return (
      <svg
        className={classnames(css.icon, className)}
        style={{
          width: SIZE_MAP[size],
          height: SIZE_MAP[size],
        }}
        {...restProps}
      >
        <use xlinkHref={`#${type.id}`} />
      </svg>
    );
  }
}
