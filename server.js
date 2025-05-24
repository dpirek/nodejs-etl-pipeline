const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = process.env.PORT || 8080;
const STATIC_ROOT = __dirname + '/public';

let dagModules = [];

async function listDags() {
  let dags = [];
  const files = fs.readdirSync(__dirname + '/dags');

  files.forEach(file => {    
    const dagModule = require(`./dags/${file}`);
    dagModules.push(dagModule);

    dags.push({
      name: dagModule.name,
      id: dagModule.id,
      version: dagModule.version,
      description: dagModule.description,
      hasRun: dagModule.run ? true : false,
    });
  });

  return dags;
}

async function runDag(dagId) {
  const dagModule = dagModules.find(dag => dag.id === dagId);
  if (!dagModule) {
    throw new Error(`DAG with ID ${dagId} not found`);
  }
  if (dagModule.run) {
    return await dagModule.run();
  } else {
    throw new Error(`DAG with ID ${dagId} does not have a run method`);
  }
}

function contentType(url) {
  const ext = url.split('.').pop();
  const contentTypes = {
    js: 'application/javascript',
    html: 'text/html',
    css: 'text/css',
    png: 'image/png',
    jpg: 'image/jpg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    woff: 'font/woff',
    map: 'application/octet-stream',
    wasm: 'application/wasm',
    json: 'application/json',
    svg: 'image/svg+xml',
    ico: 'image/x-icon',
  };

  if(contentTypes[ext] === undefined) return contentTypes['html'];

  return contentTypes[ext];
}

function serverStatic(req, res) {
  try {
    let { pathname } = url.parse(req.url);

    res.writeHead(200, {'Content-Type': contentType(pathname)});

    if(pathname === '/') pathname = '/index.html';
    if(pathname === '/favicon.ico') return res.end();

    const fileContent = fs.readFileSync(STATIC_ROOT + pathname);
    
    if(fileContent === null) return res.end('not found');
    return res.end(fileContent);
  } catch (exception) {
    console.log('exception found..', exception);
  }
}

function isStaticRequest(req) {
  const staticFiles = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.woff', '.map', '.wasm', '.svg', '.ico', '.html'];
  return staticFiles.some(ext => req.url.endsWith(ext));
}

function respondJSON(res, data) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(data));
}

async function parsePostData(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      resolve(JSON.parse(body));
    });
  });
}

async function router(req, res) {
  const { url, method } = req;
  const postData = method === 'POST' ? await parsePostData(req) : null;

  if (url === '/api/dags' && req.method === 'GET') {
    respondJSON(res, { data: await listDags() });
  }

  if (url.startsWith('/api/dags/') && method === 'POST') {
    
    const dagId = url.split('/').pop();
    console.log('POST', dagId);
    try {
      const response = await runDag(dagId);
      return respondJSON(res, { message: `DAG ${dagId} executed successfully`, output: response });
    } catch (error) {
      return respondJSON(res, { error: error.message });
    }
  }
}

function onServer(req, res) {
  const { url } = req;
  if (isStaticRequest(req)) return serverStatic(req, res);
  if (url.startsWith('/api/')) return router(req, res);
  return respondJSON(res, { error: 'Invalid API endpoint' });
}

http.createServer(onServer).listen(PORT, () => console.log(`PORT ${PORT}/`));
