import express from "express";
import multer from "multer";
import {
  getAllUsersData,
  registerNewUser,
  getUserById,
  deleteUserById,
  updateUserData,
  loginUser,
  verifyUserAndCreate,
  passwordForgotOtp,
  verificationForgotPassword,
  getUserDataBasedOnToken,
  resetPassword,
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const upload = multer({ dest: "./src/uploads" });
const userRoutes = express.Router();

userRoutes.route("/users").get(getAllUsersData);
userRoutes.route("/register").post(registerNewUser);
userRoutes.route("/otp").post(verifyUserAndCreate);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/forgotpassword").post(passwordForgotOtp);
userRoutes
  .route("/verificationforgotpassword")
  .post(verificationForgotPassword);

userRoutes.route("/resetPassword").post(resetPassword);
userRoutes.route("/tokenverification").post(getUserDataBasedOnToken);
userRoutes.route("/update").put(authMiddleware, updateUserData);
userRoutes
  .route("/user/:id")
  .get(authMiddleware, getUserById)
  .delete(authMiddleware, deleteUserById);

export default userRoutes;
