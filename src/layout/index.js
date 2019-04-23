import React from 'react';
import classnames from 'classnames';
import css from './index.less';
import Head from 'components/head';
import Footer from 'components/footer';

class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0,
    };

    this.scrollerRef = React.createRef();
  }

  componentDidMount() {
  }

  render() {
    const cls = classnames([css.layout]);
    return (
      <div className={cls}>
        <Head />

        <div style={{flex: 1, padding: 16, textAlign: 'center'}}>
          中间内容
        </div>

        <Footer />
      </div>
    );
  }
}
export default Layout;
