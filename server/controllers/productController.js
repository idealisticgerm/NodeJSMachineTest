import * as productService from "../services/productService.js";

export const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;

  try {
    const { data, totalPages, totalCount } = await productService.getAllProducts(page, limit);
    res.json({ data, currentPage: page, totalPages, totalCount });
  } catch (error) {
    console.error("Error in fetching products with categories", error);
    res.status(500).json({ error: "Failed to fetch products with categories" });
  }
};

export const createProduct = async (req, res) => {
  const { name, categoryId } = req.body;

  try {
    await productService.createProduct(name, categoryId);
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error("Error in creating product", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, categoryId } = req.body;

  try {
    await productService.updateProduct(id, name, categoryId);
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error in updating product", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await productService.deleteProduct(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleting product", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};


