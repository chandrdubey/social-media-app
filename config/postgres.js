const { Pool} = require('pg');

const pool = new Pool({
    user: "roll",
    host: "localhost",
    database: "social",
    password: "password",
    port: 5432,
  });

  pool.connect()
  .then(()=> console.log('connected to database'))
  .catch(err => console.error(err));

  module.exports = pool;