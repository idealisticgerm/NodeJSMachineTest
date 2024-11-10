import express from "express";
import { createCategory, getAllCategories, deleteCategory ,updateCategory} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/",getAllCategories);
router.post("/create",createCategory);
router.delete("/delete/:id",deleteCategory);
router.put("/update/:id",updateCategory);

export default router;