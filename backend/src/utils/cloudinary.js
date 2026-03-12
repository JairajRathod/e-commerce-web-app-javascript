import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  upload_prefix: "https://api-eu.cloudinary.com",
});

async function uploadOnCloudinary(localFilePath) {
  try {
    if (!localFilePath) return null;

    const responce = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    return responce;
  } catch (err) {
    fs.unlinkSync(localFilePath);
    return null;
  }
}

export default uploadOnCloudinary;
