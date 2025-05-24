const sqlite3 = require('sqlite3').verbose();

const {
  validateUser, 
  runAsync,
  createTableFromSchema,
} = require('./utils/sqlite');

class SQLiteProvider {
  constructor(dbPath) {
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database ' + err.message);
      } else {
        console.log('Connected to the SQLite database.');
      }
    });
  }

  async insertOne(table, row, schema) {
    try {
      const error = validateUser(row, schema);
      if (error) {
        console.error(error);
        return;
      }

      const columns = schema.map(field => {
        const key = Object.keys(field)[0];
        return { 
          key,
          type: field[key].type,
          required: field[key].required
        };
      });

      const values = columns.map(column => {
        const value = row[column.key];
        if (column.type === 'string') {
          return `'${value}'`;
        }
        if (column.type === 'number') {
          return value;
        }
        if (column.type === 'boolean') {
          return value ? 1 : 0;
        }
        if (column.type === 'date') {
          return `'${value.toISOString()}'`;
        }
        if (column.type === 'datetime') {
          return `'${value.toISOString()}'`;
        }
        if (column.type === 'json') {
          return `'${JSON.stringify(value)}'`;
        }
        if (column.type === 'array') {
          return `'${JSON.stringify(value)}'`;
        }
        if (column.type === 'object') {
          return `'${JSON.stringify(value)}'`;
        }
        if (column.type === 'buffer') {
          return `'${value.toString('base64')}'`;
        }
        return value;
      });

      const sql = `
        INSERT INTO 
        ${table} 
        (${columns.map(column => column.key).join(', ')}) 
        VALUES (${values.join(', ')})`;

      await runAsync(this.db, sql);
    } catch (err) {
      console.error(err);
    }
  }

  async select(tableName) {
    try {
      return await runAsync(this.db, `SELECT * FROM ${tableName}`);
    } catch (err) {
      console.error(err);
    }
  }

  async createTable(schema, tableName) {
    const error = await createTableFromSchema(this.db, schema, tableName);
    if (error) {
      console.error(error);
      return error;
    }
    console.log(`Table ${tableName} created`);
    return null;
  }

  async dropTable(tableName) {
    const sql = `DROP TABLE IF EXISTS ${tableName}`;
    return runAsync(this.db, sql);
  }

  close() {
    this.db.close((err) => {
      if (err) {
        console.error('Error closing database ' + err.message);
      } else {
        console.log('Closed the database connection.');
      }
    });
  }
}

module.exports = SQLiteProvider;