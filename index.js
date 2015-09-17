import React, {Component} from 'react';
import Frame from 'react-frame-component';

// grab all of the document style and link tags and to inject into our iFrame
// component
var documentHead = () => (
  typeof document !== 'undefined' && (
    <head>
      {Array.prototype.slice.call(document.head.children, 0).map((child, index) => (
        child.tagName === 'STYLE' && child.type === 'text/css'
          ? <style key={index} type="text/css">{child.textContent}</style>
          : child.tagName === 'LINK' && child.rel === 'stylesheet'
            ? <link key={index} rel="stylesheet" href={child.href} />
            : null
      ))}
    </head>
  )
);

class ResponsiveIframe extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {dimensions: ''};
    this.onBlur = event => this._setState(event.target);

    this.onSubmit = event => {
      event.preventDefault();
      this._setState(this.refs.dimensions.getDOMNode());
    };
  }

  _setState(node) {
    var {name, value} = node;
    this.setState({[name]: value});
  }

  render() {
    var [w, h] = this.state.dimensions.split('x');
    var style = {
      background: '#fff',
      border: 0,
      width: w || '100%',
      height: h || null,
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    };

    return (
      <div style={{position: 'relative', background: '#eee'}}>
        <Frame style={style} head={documentHead()}>
          {this.props.children}
        </Frame>
        <form
          onSubmit={this.onSubmit}
          style={{
            position: 'absolute',
            top: 0,
            right: 0
          }}>
          <input
            placeholder="100%x500"
            ref="dimensions"
            onBlur={this.onBlur}
            name="dimensions" />
        </form>
      </div>
    )

  }
}


export default ResponsiveIframe;

