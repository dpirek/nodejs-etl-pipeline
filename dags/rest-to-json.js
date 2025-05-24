const fs = require('fs');
const dag = require('../lib/dag.js');
const request = require('../providers/rest.provider.js');

let output = null;

const pipeline = dag()
  .extract(async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const response = await request.request(url);
    return JSON.parse(response);
  })
  .transform(async (data) => {
    return data.map(item => ({
      ...item,
      title: item.title.toUpperCase(),
    }));
  })
  .load(async (data) => {
    
    // save to file
    const filePath = __dirname + '/data/posts.json';
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData);
    console.log(`Data saved to ${filePath}`);

    // read from file
    const fileData = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(fileData);
    output = parsedData;
  });

module.exports = {
  id: 'REST-TO-JSON',
  version: '1.0.0',
  name: 'Opus DAG',
  description: 'A simple DAG that extracts, transforms, and loads data.',
  run: async (data) => {
    await pipeline.run();
    return output;
  }
}