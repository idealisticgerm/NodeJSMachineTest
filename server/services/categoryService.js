import { db } from "../config/db.js";

export const getAllCategories = async () => {
  const [rows] = await db.query("SELECT * FROM categories");
  return rows;
}

export const createCategory = async (name) => {
  const [result] = await db.query("INSERT INTO categories (name) VALUES (?)", [name]);
  return result;
}
export const updateCategory = async (name, id) => {
  const [result] = await db.query("UPDATE categories SET name = ? WHERE id = ?", [name, id]);
  return result;
}
export const deleteCategory = async (name) => {
  const [result] = await db.query("DELETE FROM categories WHERE id = ?", [id]);
  return result;
}