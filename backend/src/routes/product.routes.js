import express from "express";
import multer from "multer";
import {
  getAllProductDetails,
  createNewProduct,
  getProductById,
  deleteProductById,
  updateProductById,
  getSellerProducts,
} from "../controllers/product.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const upload = multer({ dest: "./src/uploads/" });

const productRoutes = express.Router();

productRoutes.route("/").get(getAllProductDetails).post(createNewProduct);

productRoutes.route("/myproducts").get(authMiddleware, getSellerProducts);
productRoutes
  .route("/:id")
  .get(getProductById)
  .delete(deleteProductById)
  .put(updateProductById);

export default productRoutes;
