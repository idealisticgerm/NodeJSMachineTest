import { db } from "../config/db.js";

export const getAllProducts = async (page = 1, limit = 3) => {
  const offset = (page - 1) * limit;

  const [rows] = await db.query(`
    SELECT 
      products.id AS productId,
      products.name AS productName,
      categories.id AS categoryId,
      categories.name AS categoryName
    FROM products
    JOIN categories ON products.categoryId = categories.id
    ORDER BY products.id DESC
    LIMIT ? OFFSET ?
  `, [limit, offset]);

  const [[totalCount]] = await db.query(`
    SELECT COUNT(*) AS totalCount FROM products
  `);

  const totalPages = Math.ceil(totalCount.totalCount / limit);

  return { data: rows, totalPages, totalCount: totalCount.totalCount };
};

export const createProduct = async (name, categoryId) => {
  const [result] = await db.query(
    "INSERT INTO products (name, categoryId) VALUES (?, ?)",
    [name, categoryId]
  );
  return result;
};

export const updateProduct = async (id, name, categoryId) => {
  const [result] = await db.query(
    "UPDATE products SET name = ?, categoryId = ? WHERE id = ?",
    [name, categoryId, id]
  );
  return result;
};

export const deleteProduct = async (id) => {
  const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);
  return result;
};