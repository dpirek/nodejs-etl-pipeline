export class BaseEelement extends HTMLElement {
  rootElement = null;

  constructor(props) {
    super();
    this.props = props || {};
  }

  async connectedCallback() {
    if (this.props.useShadowRoot) {
      this.rootElement = this.attachShadow({ mode: 'open' });
    } else {
      this.rootElement = this;
    }

    this.rootElement.appendChild(await this.render());
  }

  async render() {
    // This method should be overridden by subclasses
    throw new Error('Render method not implemented');
  }

  createElement(tag, props) {
    const element = (typeof tag === 'string') ? document.createElement(tag) : tag;
  
    if (props) {
      for (let key in props) {
        if (key === 'children') continue;
        if (key === 'events') continue;
        if (key === 'innerHTML') continue;
        if (key === 'innerText') continue;
        element.setAttribute(key, props[key]);
      }
  
      if (props.innerHTML) element.innerHTML = props.innerHTML;
      if (props.innerText) element.innerText = props.innerText;
      
      if (props.events) {
  
        if (Array.isArray(props.events)) {
          props.events.forEach(event => {
            element.addEventListener(event.name, event.handler);
          });
        }
        if (typeof props.events === 'object') {
          for (let event in props.events) {
            element.addEventListener(event, props.events[event]);
          }
        }
      }
  
      if (props.children) {
        this.appendChildren(element, props.children);
      }
  
      if (props.style) {
        for (let key in props.style) {
          element.style[key] = props.style[key];
        }
      }
    }
    return element;
  }

  appendChildren(parent, children) {
    children.forEach(child => {
        parent.appendChild(child);
    });
  }

  show() {
    this.style.display = 'block';
  }

  hide() {
    this.style.display = 'none';
  }

  remove() {
    this.parentNode.removeChild(this);
  }

  text(text) {
    if (text) {
      this.innerText = text;
    } else {
      return this.innerText;
    }
  }
  
  html(html) {
    if (html) {
      if (html instanceof HTMLElement) {
        this.innerHTML = '';
        this.appendChild(html);
      }
      if (typeof html === 'string') {
        this.innerHTML = html;
      }
      if (Array.isArray(html)) {
        this.innerHTML = '';
        html.forEach(item => {
          if (item instanceof HTMLElement) {
            this.appendChild(item);
          } else {
            this.innerHTML += item;
          }
        });
      }
    } else {
      return this.innerHTML;
    }
  }
}

export default BaseEelement;