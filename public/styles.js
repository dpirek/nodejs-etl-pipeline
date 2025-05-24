const TEXT_COLOR = '#61dafb';
const TEXT_COLOR_DARK = '#ffffff';
const BACKGROUND_COLOR = '#282c34';
const FONT_SIZE = '16px';
const FONT_FAMILY = 'Courier New, Courier, monospace';

const bodyStyle = {
  backgroundColor: '#282c34',
  color: 'white',
  fontSize: '16px',
  fontFamily: 'Courier New, Courier, monospace',
  padding: '20px',
  //borderRadius: '5px',
  //boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'background-color 0.3s ease',
  // display: 'flex',
  // flexDirection: 'column',
  // alignItems: 'center',
  // justifyContent: 'center',
  //minHeight: '100vh'
};

const headerStyle = {
  backgroundColor: '#282c34',
  color: 'white',
  fontSize: '24px',
  padding: '20px',
  borderRadius: '5px',
  textAlign: 'center',
  marginBottom: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'background-color 0.3s ease',
};

const headerHoverStyle = {
  backgroundColor: '#61dafb',
};

const buttonStyle = {
  backgroundColor: '#61dafb',
  font: `${FONT_SIZE} ${FONT_FAMILY} #${TEXT_COLOR_DARK}`,
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
};

const terminalStyle = {
  backgroundColor: '#161920',
  color: 'white',
  font: `${FONT_SIZE} ${FONT_FAMILY}`,
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const tableHeaderStyle = {
  backgroundColor: '#61dafb',
  font: `${FONT_SIZE} ${FONT_FAMILY}`,
  padding: '10px',
  borderRadius: '5px',
  textAlign: 'left',
};

const tableRowStyle = {
  backgroundColor: '#282c34',
  font: `${FONT_SIZE} ${FONT_FAMILY}`,
  padding: '10px',
  borderRadius: '5px',
  textAlign: 'left',
};

const tableCellStyle = {
  padding: '10px',
  border: '1px solid #61dafb',
  textAlign: 'left',
  color: 'white'
};

export { 
  bodyStyle,
  headerStyle, 
  headerHoverStyle, 
  buttonStyle, 
  terminalStyle, 
  tableHeaderStyle, 
  tableRowStyle, 
  tableCellStyle 
};