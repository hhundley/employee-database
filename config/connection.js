const mysql = require('mysql2');
require('dotenv').config();

// Connecting to the database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'process.env.dbUSERNAME',
      password: 'process.env.dbPASSWORD',
      database: 'process.env.dbNAME'
    },
    console.log(`Connected to the business database.`)
  );

  module.exports = db;