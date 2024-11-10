import { db } from "../config/db.js";

export const getAllCategories = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM categories");
    res.json(rows);
  } catch (error) {
    console.log("Error in fetching categories",error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
}

export const createCategory = async (req, res) => {
  const {name} = req.body;

  try {
    await db.query("INSERT INTO categories (name) VALUES (?)", [name]);
    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    console.log("Error in creating category",error);
    res.status(500).json({ error: "Failed to create category" });
  }
}

export const deleteCategory = async (req, res) => {
  const {id} = req.params;
  try {
    await db.query("DELETE FROM categories WHERE id = ?", [id]);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log("Error in deleting category",error);
    res.status(500).json({ error: "Failed to delete category" });
  }
}

export const updateCategory = async (req, res) => {
  const {id} = req.params;
  const {name} = req.body;
  try {
    await db.query("UPDATE categories SET name = ? WHERE id = ?", [name, id]);
    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    console.log("Error in updating category",error);
    res.status(500).json({ error: "Failed to update category" });
  }
}