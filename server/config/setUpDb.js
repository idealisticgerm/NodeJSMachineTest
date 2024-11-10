import { db } from "./db.js";

// Function to check if a table exists
async function checkTableExists(tableName) {
  try {
    const [result] = await db.query(
      `SELECT COUNT(*) AS count 
       FROM information_schema.tables 
       WHERE table_schema = 'productdb' AND table_name = ?`,
      [tableName]
    );
    return result[0].count > 0;
  } catch (err) {
    console.error(`Error checking table existence for ${tableName}:`, err.message);
    return false; // Return false if there's an error in checking
  }
}

// Function to create tables if they don't exist
async function createTablesIfNotExist() {
  try {
    // Creating categories table with IF NOT EXISTS
    await db.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `);
    console.log("Checked or created 'categories' table.");

    // Creating products table with IF NOT EXISTS
    await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        categoryId INT,
        FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE CASCADE
      )
    `);
    console.log("Checked or created 'products' table.");

  } catch (err) {
    console.error("Error in creating tables:", err.message);
  }
}

export { createTablesIfNotExist };
