const { Pool} = require('pg');
const {DATABASE_USER,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT} = require('./');
const pool = new Pool({
    user: DATABASE_USER,
    host: DATABASE_HOST,
    database: DATABASE_NAME,
    password: DATABASE_PASSWORD,
    port: DATABASE_PORT,
  });

  pool.connect()
  .then(()=> console.log('connected to database'))
  .catch(err => console.error(err));

  module.exports = pool;