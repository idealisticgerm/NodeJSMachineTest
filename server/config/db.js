import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// Create a connection pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'test'
});

// Function to check the database connection
async function checkDbConnection() {
  try {

    await db.query('SELECT 1'); // A simple query to test the connection
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw error;
  }
}


export  {db,checkDbConnection};