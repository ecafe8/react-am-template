import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import css from './index.less';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  // 从error中接收错误并设置 state
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div className={css.wrap}>抱歉，页面出问题了。</div>;
    }

    return this.props.children;
  }
}
