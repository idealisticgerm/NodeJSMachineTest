import express from "express";
import { createProduct, getAllProducts , deleteProduct, updateProduct} from "../controllers/productController.js";

const router = express.Router();

router.get("/",getAllProducts);
router.post("/create",createProduct);
router.delete("/delete/:id",deleteProduct);
router.put("/update/:id",updateProduct);

export default router;