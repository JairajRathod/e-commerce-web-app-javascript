import express from "express";
import {
  deleteSellerByAdmin,
  deleteUserByAdmin,
  getAllOrdersDetails,
  getAllProductDetails,
  sellerDetailsForAdmin,
  topSellerBasedOnAmount,
  topUsersBasedOnOrder,
  totalFilter,
  userDetailsForAdmin,
} from "../controllers/admin.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const adminRoute = express.Router();

adminRoute.route("/allfilter").get(totalFilter);
adminRoute.route("/users").get(userDetailsForAdmin);
adminRoute.route("/seller").get(sellerDetailsForAdmin);
adminRoute.route("/topusersbyorder").get(topUsersBasedOnOrder);
adminRoute.route("/topsellerbyamount").get(topSellerBasedOnAmount);
adminRoute.route("/allproducts").get(getAllProductDetails);
adminRoute.route("/allorders").get(getAllOrdersDetails);
adminRoute.route("/deleteuser").delete(authMiddleware, deleteUserByAdmin);
adminRoute.route("/deleteseller").delete(authMiddleware, deleteSellerByAdmin);

export default adminRoute;
