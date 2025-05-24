
import BaseEelement from '../lib/base-element.js';
import { applyStyles } from '../lib/createElement.js';
const TAG_NAME = 'header-component';

class HeaderComponent extends BaseEelement {
  constructor(props) {
    super({
      useShadowRoot: false,
      ...props
    });

    this.title = props.title || 'Default Title';
    this.style = props.style || {
      backgroundColor: '#282c34',
      padding: '20px',
      color: 'white'
    };
  }

  render() {
    return this.createElement('header', {
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...this.style
      },
      children: [
        this.createElement('h1', {
          innerText: this.title,
          style: {
            margin: 0,
            fontSize: '2em',
            color: '#61dafb'
          }
        })
      ]
    });
  }
}

customElements.define(TAG_NAME, HeaderComponent);

export default HeaderComponent;

