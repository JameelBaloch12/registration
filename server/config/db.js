const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,         // e.g., 'localhost'
  user: process.env.DB_USER,         // e.g., 'root'
  password: process.env.DB_PASSWORD, // e.g., 'yourpassword'
  database: process.env.DB_NAME      // e.g., 'event_db'
});

module.exports = db;
