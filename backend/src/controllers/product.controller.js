import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponce from "../utils/ApiResponce.js";
import { uploadFile } from "../utils/uploadFile.js";
import { loginUser } from "./user.controller.js";

export async function getAllProductDetails(req, res) {
  try {
    const allProducts = await Product.find({ active: true })
      .select("_id name price stock totalSelled")
      .limit(20);

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: allProducts,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function getSellerProducts(req, res) {
  try {
    const logginUser = req.user;
    console.log(logginUser);
    if (logginUser.role === "user") {
      return ApiError({
        res,
        statusCode: 402,
        detailMessage: "You are not a seller",
      });
    }

    const sellerProduct = await Product.find({ sellerid: logginUser.id });

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: sellerProduct,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function createNewProduct(req, res) {
  try {
    console.log(req.body);
    const {
      sellerId = "",
      name = "",
      description = "",
      brand = "",
      price = "",
      color = "",
      stock = 0,
    } = req.body;

    // if (userData.role === "user") {
    //   return ApiError({
    //     res,
    //     statusCode: 400,
    //     detailMessage: "User can add product",
    //   });
    // }

    const newProduct = await Product.create({
      name,
      description,
      brand,
      price,
      color,
      stock,
      sellerid: sellerId,
    });

    const userDetails = await User.findById(sellerId);

    await User.findByIdAndUpdate(
      sellerId,
      {
        $set: { totalproductofseller: +userDetails.totalproductofseller + +1 },
      },
      { new: true, runValidators: true }
    );

    ApiResponce({
      res,
      statusCode: 201,
      activityType: "Creation",
      responceData: newProduct,
    });
  } catch (err) {
    console.log("This is error");
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function deleteProductById(req, res) {
  try {
    console.log("delete run");
    const productDetails = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: { active: false },
      },
      { new: true, runValidators: true }
    );

    if (!productDetails) {
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "Product not found",
      });
    }

    const updateUser = await User.findByIdAndUpdate(
      productDetails.sellerid,
      { $inc: { totalproductofseller: -1 } },
      { new: true, runValidators: true }
    );

    if (!updateUser) {
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "Seller not found",
      });
    }

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Delete",
      responceData: productDetails,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function updateProductById(req, res) {
  try {
    const productExist = await Product.findById(req.params.id);

    if (!productExist) {
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "Product not found",
      });
    }

    const updatedUser = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Update",
      responceData: updatedUser,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function getProductById(req, res) {
  try {
    const productExist = await Product.findById(req.params.id);
    if (!productExist) {
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "Product not found",
      });
    }

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Update",
      responceData: productExist,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}
