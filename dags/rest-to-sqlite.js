const fs = require('fs');
const dag = require('../lib/dag.js');
const requestProvider = require('../providers/rest.provider.js');
const SQLiteProvider = require('../providers/sqlite.provider.js');

const SETVICE_URL = 'https://jsonplaceholder.typicode.com/posts';
const DB_PATH = __dirname  = '/data/posts.db';
let output = null;

const pipeline = dag()
  .extract(async () => {
    const response = await requestProvider.request(SETVICE_URL);
    return JSON.parse(response);
  })
  .transform(async (data) => {
    return data.map(item => ({
      id: item.id,
      title: item.title.toUpperCase(),
      body: item.body
    }));
  })
  .load(async (data) => {
    const postSchema = [
      {
        id: {
          type: 'number',
          required: true,
        }
      },
      { 
        title: {
          type: 'string',
          required: true,
        }
      },

      {
        body: {
          type: 'string',
          required: true,
        }
      }
    ];

    const sqlliteProvider = new SQLiteProvider(DB_PATH);
    const dropTableError = await sqlliteProvider.dropTable('posts');
    const createTableError = await sqlliteProvider.createTable(postSchema, 'posts');
    data.forEach(async (row) => await sqlliteProvider.insertOne('posts', row, postSchema));
    const selectData = await sqlliteProvider.select('posts');
    console.log('>>', selectData.length);
    output = selectData;
  });

module.exports = {
  id: 'REST-TO-SQLITE',
  version: '1.0.1',
  name: 'rest to sqlite',
  tags: ['rest', 'sqlite'],
  description: 'A simple DAG that extracts, transforms, and loads data.',
  run: async (data) => {
    await pipeline.run();
    return output;
  }
}