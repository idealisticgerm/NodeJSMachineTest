import express from "express";
import { createProduct, getAllProducts , deleteProduct, updateProduct} from "../controllers/productController.js";

const router = express.Router();

router.get("/",getAllProducts);
router.post("/",createProduct);
router.delete("/:id",deleteProduct);
router.put("/:id",updateProduct);

export default router;