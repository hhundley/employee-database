const mysql = require('mysql2');
require('dotenv').config();

// Connecting to the database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the business database.`)
  );

  module.exports = connection;