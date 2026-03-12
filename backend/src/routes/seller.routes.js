import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  allProductsWithDetails,
  orderDeliveryStatus,
  sellerTotalFilter,
  totalFilterOfSeller,
} from "../controllers/seller.controller.js";

const sellerRoute = express.Router();

sellerRoute.route("/total-filter").get(authMiddleware, sellerTotalFilter);
sellerRoute.route("/products").post(allProductsWithDetails);
sellerRoute.route("/totalstock").get(authMiddleware, totalFilterOfSeller);
sellerRoute.route("/deliverystatus").get(authMiddleware, orderDeliveryStatus);

export default sellerRoute;
