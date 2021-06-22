const Pool = require('pg').Pool();

const pool = new Pool({
    user: "roll",
    host: "localhost",
    database: "social",
    password: "password",
    port: 5432,
  });

  module.exports = pool;