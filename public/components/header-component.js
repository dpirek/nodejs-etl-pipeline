
import BaseEelement from '../lib/base-element.js';
const TAG_NAME = 'header-component';

class HeaderComponent extends BaseEelement {
  title = 'Node.js LTM Pipeline';

  constructor(props) {
    super({
      useShadowRoot: false,
      ...props
    });
  }

  render() {
    return this.createElement('header', {
      innerHTML: `
        <div class="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
          <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="#">
            ${this.title}
          </a>
        </div>`
    });
  }
}

customElements.define(TAG_NAME, HeaderComponent);

export default HeaderComponent;

