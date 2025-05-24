import { applyStyles } from './lib/createElement.js';
import { bodyStyle } from './styles.js';
import TableComponent from './components/table-component.js';
import HeaderComponent from './components/header-component.js';
import TerminalComponent from './components/terminal-component.js';

async function loadData() {
  const response = await fetch('/api/dags');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
}

async function init() {
  const body = document.body;

  applyStyles(body, bodyStyle);
  
  const { data } = await loadData();
  
  async function onAction({name, id }) {
    terminalComponent.updateOutput('Loading...');

    fetch(`/api/dags/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      terminalComponent.updateOutput(JSON.stringify(data, null, 2));
    })
    .catch(error => {
      console.error('Error:', error);
    });
    console.log('action', name, id);
  }

  const header = new HeaderComponent({ title: 'Node.js LTM Pipeline' });
  
  const tableComponent = new TableComponent({ 
    data, 
    onAction
  });

  const terminalComponent = new TerminalComponent({});

  body.appendChild(header);
  body.appendChild(tableComponent);
  body.appendChild(terminalComponent);
}

init();