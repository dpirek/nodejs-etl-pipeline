import BaseEelement from '../lib/base-element.js';
import { 
  terminalStyle
} from '../styles.js';

const TAG_NAME = 'terminal-component';

class TerminalComponent extends BaseEelement {
  constructor(props) {
    super({
      useShadowRoot: false,
      ...props
    });
  }

  render() {
    this.containerElm = this.createElement('div', {
      style: {
        ...terminalStyle,
        marginTop: '20px',
        whiteSpace: 'pre-wrap',
        overflowY: 'auto',
        height: 'calc(100vh - 280px)',
      },
      innerText: 'Output will appear here.'
    });

    return this.containerElm;
  }

  updateOutput(output) {
    this.containerElm.innerHTML = output;
    this.containerElm.scrollTop = this.containerElm.scrollHeight;
    this.containerElm.scrollIntoView({ behavior: 'smooth' });
    this.containerElm.focus();
  }
}

customElements.define(TAG_NAME, TerminalComponent);

export default TerminalComponent;
