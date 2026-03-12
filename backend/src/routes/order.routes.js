import express from "express";
import {
  addOrder,
  getOrdersForAdmin,
  getOrdersForSeller,
  getOrdersForUser,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const orderRoute = express.Router();

orderRoute.route("/add").post(authMiddleware, addOrder);
orderRoute.route("/update").put(authMiddleware, updateOrderStatus);
orderRoute.route("/userorders").get(authMiddleware, getOrdersForUser);
orderRoute.route("/adminorders").get(getOrdersForAdmin);
orderRoute.route("/sellerorders").get(authMiddleware, getOrdersForSeller);

export default orderRoute;
