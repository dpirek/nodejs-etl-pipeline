import BaseEelement from '../lib/base-element.js';
import { 
  buttonStyle, 
  tableHeaderStyle, 
  tableRowStyle, 
  tableCellStyle 
} from '../styles.js';

const TAG_NAME = 'table-component';

class TableComponent extends BaseEelement {
  constructor(props) {
    super({
      useShadowRoot: false,
      ...props
    });
  }

  render() {
    return this.createElement('table', {
      style: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px'
      },
      children: [
        this.createElement('thead', {
          style: tableHeaderStyle,
          children: [
            this.createElement('tr', {
              children: [
                this.createElement('th', { style: {...tableCellStyle, color: 'black'}, innerText: 'Id' }),
                this.createElement('th', { style: {...tableCellStyle, color: 'black'}, innerText: 'Name' }),
                this.createElement('th', { style: {...tableCellStyle, color: 'black'}, innerText: 'Version' }),
                this.createElement('th', { style: {...tableCellStyle, color: 'black'}, innerText: 'Actions' })
              ]
            })
          ]
        }),
        this.createElement('tbody', {
          style: tableRowStyle,
          children: this.props.data.map(item => {
            return this.createElement('tr', {
              children: [
                this.createElement('td', { style: tableCellStyle, innerText: item.id }),
                this.createElement('td', { style: tableCellStyle, innerText: item.name }),
                this.createElement('td', { style: tableCellStyle, innerText: item.version }),
                this.createElement('td', {
                  style: tableCellStyle,
                  children: [
                    this.createElement('button', {
                      innerText: 'Run',
                      style: {...buttonStyle, width: '100%', display: 'inline-block' },
                      events: [
                        {
                          name: 'click',
                          handler: (event) => {
                            event.preventDefault();
                            this.props.onAction(item);
                          }
                        }
                      ]
                    })
                  ]
                  })
              ]
            });
          })
        })
      ]
    });
  }
}

customElements.define(TAG_NAME, TableComponent);

export default TableComponent;
