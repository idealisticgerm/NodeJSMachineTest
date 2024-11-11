import express from "express";
import { createCategory, getAllCategories, deleteCategory ,updateCategory} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/",getAllCategories);
router.post("/",createCategory);
router.delete("/:id",deleteCategory);
router.put("/:id",updateCategory);

export default router;