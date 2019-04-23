import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Timer from './timer';

const DEFAULT_END_REACHED_THRESHOLD = 500;
const DEFAULT_SCROLL_CALLBACK_THROTTLE = 50;
const FULL_WIDTH = 750;
const STYLE_NODE_ID = 'sx-scroll-view-style';

/**
 * 修改自：https://github.com/raxjs/rax-scrollview/blob/master/src/index.js
 * 去掉了weex环境依赖，增加了项目所需的部分get方法。
 */
class ScrollView extends React.Component {
  static propTypes = {
    horizontal: PropTypes.bool,
    onEndReached: PropTypes.func,
    onScroll: PropTypes.func,

    style: PropTypes.object,
    className: PropTypes.string,
    contentClassName: PropTypes.string,
  };

  static defaultProps = {
    scrollEventThrottle: DEFAULT_SCROLL_CALLBACK_THROTTLE,
    onEndReachedThreshold: DEFAULT_END_REACHED_THRESHOLD,
    showsHorizontalScrollIndicator: true,
    showsVerticalScrollIndicator: true,
    horizontal: false,
  };

  lastScrollDistance = 0;
  lastScrollContentSize = 0;

  constructor(props) {
    super(props);

    this.scrollerRef = React.createRef();
  }

  get element() {
    return this.scrollerRef.current;
  }


  set scrollTop(y) {
    this.element.scrollTop = y;
  }

  get scrollTop() {
    return this.element.scrollTop;
  }


  handleScroll = (e) => {
    e.persist();
    if (this.props.onScroll && e.target) {
      // e.nativeEvent = {
      //   ...e.nativeEvent,
      //   get contentOffset() {
      //     return {
      //       x: e.target.scrollLeft,
      //       y: e.target.scrollTop
      //     };
      //   },
      //   get contentSize() {
      //     return {
      //       width: e.target.scrollWidth,
      //       height: e.target.scrollHeight
      //     };
      //   }
      // };
      this.props.onScroll(e);
    }

    if (this.props.onEndReached) {
      if (!this.element) {
        this.scrollerNodeSize = this.props.horizontal ? this.element.offsetWidth : this.element.offsetHeight;
      }

      // NOTE：in iOS7/8 offsetHeight/Width is is inaccurate （ use scrollHeight/Width ）
      let scrollContentSize = this.props.horizontal ? this.element.scrollWidth : this.element.scrollHeight;
      let scrollDistance = this.props.horizontal ? this.element.scrollLeft : this.element.scrollTop;
      let isEndReached = scrollContentSize - scrollDistance - this.scrollerNodeSize < this.props.onEndReachedThreshold;

      let isScrollToEnd = scrollDistance > this.lastScrollDistance;
      let isLoadedMoreContent = scrollContentSize !== this.lastScrollContentSize;

      if (isEndReached && isScrollToEnd && isLoadedMoreContent) {
        this.lastScrollContentSize = scrollContentSize;
        this.props.onEndReached(e);
      }

      this.lastScrollDistance = scrollDistance;
    }
  };

  resetScroll = () => {
    this.lastScrollContentSize = 0;
    this.lastScrollDistance = 0;
  };

  scrollTo = (options) => {
    let x = parseInt(options.x);
    let y = parseInt(options.y);
    let animated = options && typeof options.animated !== 'undefined' ? options.animated : true;

    let pixelRatio = document.documentElement.clientWidth / FULL_WIDTH;
    let scrollView = this.element;
    let scrollLeft = scrollView.scrollLeft;
    let scrollTop = scrollView.scrollTop;

    if (animated) {
      let timer = new Timer({
        duration: 400,
        easing: 'easeOutSine',
        onRun: (e) => {
          if (x >= 0) {
            scrollView.scrollLeft = scrollLeft + e.percent * (x * pixelRatio - scrollLeft);
          }
          if (y >= 0) {
            scrollView.scrollTop = scrollTop + e.percent * (y * pixelRatio - scrollTop);
          }
        }
      });
      timer.run();
    } else {
      if (x >= 0) {
        this.element.scrollLeft = pixelRatio * x;
      }

      if (y >= 0) {
        this.element.scrollTop = pixelRatio * y;
      }
    }
  };


  render() {
    let {
      id,
      scrollEventThrottle,
      showsHorizontalScrollIndicator,
      showsVerticalScrollIndicator,
      children,
    } = this.props;

    const contentContainerStyle = [
      this.props.horizontal && styles.contentContainerHorizontal,
      this.props.contentContainerStyle,
    ];

    // bugfix: fix scrollview flex in ios 78
    if (!this.props.horizontal) {
      contentContainerStyle.push(styles.containerWebStyle);
    }

    if (this.props.style) {
      let childLayoutProps = ['alignItems', 'justifyContent']
        .filter((prop) => this.props.style[prop] !== undefined);

      if (childLayoutProps.length !== 0) {
        console.warn(
          'ScrollView child layout (' + JSON.stringify(childLayoutProps) +
          ') must be applied through the contentContainerStyle prop.'
        );
      }
    }

    let contentChild;

    contentChild = children;

    const contentContainer =
      (<div
        className={classnames('sx-scroll-view-content', this.props.contentClassName)}
        style={contentContainerStyle}>
        {contentChild}
      </div>);

    const baseStyle = this.props.horizontal ? styles.baseHorizontal : styles.baseVertical;

    const scrollerStyle = {
      ...baseStyle,
      ...this.props.style
    };

    let showsScrollIndicator = this.props.horizontal ? showsHorizontalScrollIndicator : showsVerticalScrollIndicator;

    let handleScroll = this.handleScroll;
    if (scrollEventThrottle) {
      handleScroll = throttle(handleScroll, scrollEventThrottle);
    }
    if (!showsScrollIndicator && typeof document !== 'undefined' && !document.getElementById(STYLE_NODE_ID)) {
      let styleNode = document.createElement('style');
      styleNode.id = STYLE_NODE_ID;
      document.head.appendChild(styleNode);
      styleNode.innerHTML = `.${this.props.className}::-webkit-scrollbar{display: none;}`;
    }

    scrollerStyle.WebkitOverflowScrolling = 'touch';
    scrollerStyle.overflow = 'scroll';

    let webProps = {
      // ...this.props,
      id,
      ref: this.scrollerRef,
      style: scrollerStyle,
      onScroll: handleScroll,
      className: classnames('sx-scroll-view', this.props.className),
    };

    return (
      <div {...webProps}>
        {contentContainer}
      </div>
    );
  }
}

function throttle(func, wait) {
  let ctx;
  let args;
  let rtn;
  let timeoutID;
  let last = 0;

  function call() {
    timeoutID = 0;
    last = +new Date();
    rtn = func.apply(ctx, args);
    ctx = null;
    args = null;
  }

  return function throttled() {
    ctx = this;
    args = arguments;
    let delta = new Date() - last;
    if (!timeoutID)
      if (delta >= wait) call();
      else timeoutID = setTimeout(call, wait - delta);
    return rtn;
  };
}

const styles = {
  baseVertical: {
    flex: 1,
    flexDirection: 'column',
  },
  baseHorizontal: {
    flex: 1,
    flexDirection: 'row',
  },
  contentContainerHorizontal: {
    flexDirection: 'row',
  },
  containerWebStyle: {
    display: 'block',
  }
};

export default ScrollView;
