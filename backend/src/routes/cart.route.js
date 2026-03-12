import express from "express";
import {
  addToCart,
  getCartData,
  removeFromCart,
} from "../controllers/cart.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const cartRoute = express.Router();

cartRoute.route("/add").post(addToCart);
cartRoute.route("/delete").delete(authMiddleware, removeFromCart);
cartRoute.route("/:id").get(getCartData);

export default cartRoute;
