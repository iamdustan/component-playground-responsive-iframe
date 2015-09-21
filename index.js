import React, {Component, PropTypes} from 'react';
import Frame from 'react-frame-component';
import FullScreen from './icon-full-screen';

const shouldObserveHead = (
  process.env.NODE_ENV === 'development' &&
  typeof MutationObserver !== 'undefined'
);

const devices = [
  {name: 'iPhone 4', value: '320x480'},
  {name: 'iPhone 5', value: '320x568'},
  {name: 'iPhone 6', value: '375x627'},
  {name: 'iPhone 6 Plus', value: '414x736'},
  {name: 'iPad', value: '768x1024'},
  {name: 'Nexus 4', value: '384x567'},
  {name: 'Nexus 5', value: '360x567'},
  {name: 'Nexus 6', value: '412x659'},
  {name: 'Nexus 7', value: '600x960'},
  {name: 'Nexus 10', value: '800x1280'},
];

var styles = {
  container: {
    fullScreen: {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      background: '#eee',
      overflow: 'auto',
      padding: '1em',
      zIndex: 999
    },
    'default': {
      position: 'relative',
      background: '#eee',
      overflow: 'auto',
      padding: '1em'
    }
  },
  form: {
    absolute: {
      position: 'absolute',
      top: 0,
      right: 0,
      background: '#f0f0f0',
      border: '1px solid #ccc',
      borderTopColor: '#ddd',
      borderBottomWidth: '2px',
      padding: '0.5em'
    },
    top: {
      background: '#303030',
      borderBottom: '2px solid #000',
      margin: '-1em -1em 1em -1em',
      padding: '1em',
      color: '#eee'
    }
  },
  inputs: {
    display: 'inline-block',
    marginLeft: '1em'
  },
  input: {
    width: '5em',
    background: 'transparent',
    border: '0',
    borderBottom: '1px solid #ccc',
    padding: '0.1em 0.5em',
    color: 'inherit'
  },
  x: {
    fontFace: 'sans-serif',
    fontSize: '0.6666em',
    display: 'inline-block',
    margin: '0 0.333em'
  },
  button: {
    fontSize: '0.666em',
    height: '1.1666rem',
    float: 'right'
  }
};

// grab all of the document style and link tags and to inject into our iFrame
// component
var documentHead = () => typeof document !== 'undefined' && (
  <head>
    {Array.prototype.slice.call(document.head.children, 0).map((child, index) => (
      child.tagName === 'STYLE' && child.type === 'text/css'
        ? <style key={index} type="text/css">{child.textContent}</style>
        : child.tagName === 'LINK' && child.rel === 'stylesheet'
          ? <link key={index} rel="stylesheet" href={child.href} />
          : null
    ))}
  </head>
);

class ResponsiveIframe extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      width: 0,
      height: 0,
      formPosition: 'top',
      isFullScreen: false
    };
    this.onChange = event => {
      var {name, value} = event.target;
      this.setState({[name]: value});
    };
    this.handleChangeSelect = event => {
      var [width, height] = event.target.value.split('x').map(n => +n);
      if (width === 'Custom') return;
      this.setState({width, height});
    };

    this.onSubmit = event => event.preventDefault();

    this.toggleFormPosition = event => {
      this.setState({
        formPosition: this.state.formPosition === 'top' ? 'absolute' : 'top'
      });
    };

    this.toggleFixed = event => {
      this.setState({isFullScreen: !this.state.isFullScreen});
    };

    if (shouldObserveHead) {
      this.observer = true;
    }
  }

  componentWillMount() {
    if (typeof document === 'undefined') return;

    if (shouldObserveHead) {
      var target = document.head;
      // this is a bit of hack to keep the iframe synced with local dev
      // stylesheets
      this.observer = new MutationObserver((mutations) => {
        this.forceUpdate();
      });

      var config = {childList: true, characterData: true};
      this.observer.observe(target, config);
    }
  }

  componentWillUnmount() {
    if (shouldObserveHead) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  render() {
    var {width, height} = this.state;
    var frameStyle = {
      background: '#fff',
      border: '1px solid #e0e0e0',
      width: width || '100%',
      height: height || null,
      display: 'block',
      margin: '0 auto',
    };

    var containerStyles = styles.container[this.state.isFullScreen ? 'fullScreen' : 'default'];
    return (
      <div style={containerStyles}>
        <form
          onSubmit={this.onSubmit}
          style={styles.form[this.state.formPosition]}
        >
          <select onChange={this.handleChangeSelect} value={`${width}x${height}`}>
            <option>Custom</option>
            {devices.map(d => <option key={d.name} value={d.value}>{d.name}</option>)}
          </select>
          <div style={styles.inputs}>
            <input
              style={styles.input}
              placeholder="width"
              name="width"
              onChange={this.onChange}
              value={this.state.width || null} />
            <span style={styles.x}>×</span>
            <input
              style={styles.input}
              placeholder="height"
              name="height"
              onChange={this.onChange}
              value={this.state.height || null} />
          </div>
          <button onClick={this.toggleFixed} style={styles.button}><FullScreen /></button>
          <button onClick={this.toggleFormPosition} style={styles.button}>Toggle</button>
        </form>
        <Frame style={frameStyle} head={documentHead()}>{this.props.children}</Frame>
      </div>
    )
  }
}

export default ResponsiveIframe;

