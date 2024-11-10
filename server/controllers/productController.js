import { db } from "../config/db.js";

export const getAllProducts = async (req, res) => {
  // Get the page and limit from the query parameters (with default values)
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  
  // Calculate the offset based on the page and limit
  const offset = (page - 1) * limit;

  try {
    // Query to fetch products with pagination
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
    
    // Get total count of products to calculate total pages
    const [[totalCount]] = await db.query(`
      SELECT COUNT(*) AS totalCount FROM products
    `);
    
    // Calculate total pages
    const totalPages = Math.ceil(totalCount.totalCount / limit);
    
    // Send response with data, current page, and total pages
    res.json({
      data: rows,
      currentPage: page,
      totalPages: totalPages,
      totalCount: totalCount.totalCount
    });
  } catch (error) {
    console.log("Error in fetching products with categories", error);
    res.status(500).json({ error: "Failed to fetch products with categories" });
  }
};




export const createProduct = async (req, res) => {
  const {name, categoryId} = req.body;

  try { 
    await db.query("INSERT INTO products (name, categoryId) VALUES (?, ?)", [name, categoryId]);
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.log("Error in creating product",error);
    res.status(500).json({ error: "Failed to create product" });
  }
}

export const deleteProduct = async (req, res) => {
  const {id} = req.params;
  try {
    await db.query("DELETE FROM products WHERE id = ?", [id]);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleting product",error);
    res.status(500).json({ error: "Failed to delete product" });
  }
}

export const updateProduct = async (req, res) => {
  const {id} = req.params;
  const {name, categoryId} = req.body;
  try {
    await db.query("UPDATE products SET name = ?, categoryId = ? WHERE id = ?", [name, categoryId, id]);
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.log("Error in updating product",error);
    res.status(500).json({ error: "Failed to update product" });
  }
}