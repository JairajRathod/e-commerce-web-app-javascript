import { response } from "express";
import ApiError from "../utils/ApiError.js";
import ApiResponce from "../utils/ApiResponce.js";
import uploadOnCloudinary from "./cloudinary.js";
import fs from "fs";

export async function uploadFile(req, res) {
  if (!req.file)
    return ApiError({ res, statusCode: 400, detailMessage: "File not found" });

  const response = await uploadOnCloudinary(req.file.path);

  if (!response)
    return ApiError({
      res,
      statusCode: 400,
      detailMessage: "Something Went Wrong uploadfile",
    });
  //   console.log(req.file.path);

  fs.unlinkSync(req.file.path);

  ApiResponce({
    res,
    statusCode: 200,
    activityType: "Upload",
    responceData: response,
  });
}
