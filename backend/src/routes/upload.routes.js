import express from "express";
import multer from "multer";
import { uploadFile } from "../utils/uploadFile.js";

const upload = multer({ dest: "./src/uploads/" });
const uploadRoute = express.Router();

uploadRoute.route("/").post(upload.single("image"), uploadFile);

export default uploadRoute;
