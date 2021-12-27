const { Pool } = require("pg");
require("dotenv").config();

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
  : new Pool({
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      password: process.env.DATABASE_PASSWORD,
      user: process.env.DATABASE_USER,
      port: process.env.DATABASE_PORT,
    });

module.exports = pool;
