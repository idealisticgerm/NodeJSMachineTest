import * as categoryService from "../services/categoryService.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.log("Error in fetching categories", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
}

export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    await categoryService.createCategory(name);
    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    console.log("Error in creating category", error);
    res.status(500).json({ error: "Failed to create category" });
  }
}


export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await categoryService.updateCategory(name, id);
    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    console.log("Error in updating category", error);
    res.status(500).json({ error: "Failed to update category" });
  }
}

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await categoryService.deleteCategory(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log("Error in deleting category", error);
    res.status(500).json({ error: "Failed to delete category" });
  }
}