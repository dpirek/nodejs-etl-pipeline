
/**
 * Append children to a parent element
 * @param  {HTMLElement} parent
 * @param  {Array} children
 * @returns {void}
 */
function appendChildren(parent, children) {
  children.forEach(child => {
      parent.appendChild(child);
  });
}

/**
 * Apply styles to an element
 * @param  {HTMLElement} element
 * @param  {Object} styles
 * @returns {void}
 */
export function applyStyles(element, styles) {
  for (let key in styles) {
    element.style[key] = styles[key];
  }
}

/**
 * Create an HTML element with optional properties
 * @param  {string|HTMLElement} tag
 * @param  {Object} props
 * @param  {string} props.innerHTML
 * @param  {string} props.innerText
 * @param  {Object} props.style
 * @param  {Object} props.events
 * @param  {Array} props.children
 * @returns {HTMLElement}
 */
export function createElement(tag, props) {
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
      appendChildren(element, props.children);
    }

    if (props.style) {
      for (let key in props.style) {
        element.style[key] = props.style[key];
      }
    }
  }

  element.hide = function() {
    element.style.display = 'none';
  };

  element.show = function() {
    element.style.display = 'block';
  };

  element.remove = function() {
    element.parentNode.removeChild(element);
  };

  element.text = function(text) {
    if (text) {
      element.innerText = text;
    } else {
      return element.innerText;
    }
  }

  element.html = function(html) {
    if (html) {
      element.innerHTML = html;
    } else {
      return element.innerHTML;
    }
  }

  element.attr = function(name, value) {
    if (value) {
      element.setAttribute(name, value);
    } else {
      return element.getAttribute(name);
    }
  }

  element.append = function(child) {
    if (Array.isArray(child)) {
      child.forEach(c => element.appendChild(c));
    } else {
      element.appendChild(child);
    }
  }

  element.prepend = function(child) {
    if (Array.isArray(child)) {
      child.forEach(c => element.insertBefore(c, element.firstChild));
    } else {
      element.insertBefore(child, element.firstChild);
    }
  }

  element.click = function(handler) {
    element.addEventListener('click', handler);
  }

  element.on = function(event, handler) {
    element.addEventListener(event, handler);
  }

  element.class = function(className) {
    if (className) {
      element.classList.add(className);
    } else {
      return element.className;
    }
  }

  element.removeClass = function(className) {
    if (className) {
      element.classList.remove(className);
    }
  }

  element.toggleClass = function(className) {
    if (className) {
      element.classList.toggle(className);
    }
  }

  element.hasClass = function(className) {
    return element.classList.contains(className);
  }

  return element;
}