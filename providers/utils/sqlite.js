function validateUser(user, schema) {
  const keys = Object.keys(schema);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = user[key];
    const type = schema[key].type;
    const required = schema[key].required;
    if (required && !value) {
      return `${key} is required`;
    }
    if (type === 'number' && typeof value !== 'number') {
      return `${key} should be a number`;
    }
    if (type === 'string' && typeof value !== 'string') {
      return `${key} should be a string`;
    }
  }
  return null;
}

function schemaToSql(columns) {
  const pairs = columns.map(column => {
    const key = Object.keys(column)[0];
    const type = column[key].type;
    const required = column[key].required ? 'NOT NULL' : '';
    return `${key} ${type} ${required}`;
  });

  return pairs.join(', ');
}

async function createTableFromSchema(db, schema, tableName) {
  const columns = schemaToSql(schema);
  const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns})`;
  console.log(sql);
  const error = await runAsync(db, sql);

  if (error) {
    console.error(error);
    return error;
  }
  console.log(`Table ${tableName} created`);
  return null;
}

async function select(db, tableName) {
  const sql = `SELECT * FROM ${tableName}`;
  return runAsync(db, sql);
}

async function dropTable(db, tableName) {
  const sql = `DROP TABLE IF EXISTS ${tableName}`;
  return runAsync(db, sql);
}

function runAsync(db, sql) {
  return new Promise((resolve, reject) => {
    db.all(sql, {}, (error, rows) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = {
  validateUser,
  schemaToSql,
  createTableFromSchema,
  select,
  dropTable,
  runAsync
};