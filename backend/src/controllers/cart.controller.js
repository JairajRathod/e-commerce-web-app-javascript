import { Cart } from "../models/cart.model.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import ApiResponce from "../utils/ApiResponce.js";
import ApiError from "../utils/ApiError.js";

export async function addToCart(req, res) {
  try {
    const { userId, productId } = req.body;

    const userDetails = await User.findById(userId);
    if (!userDetails)
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "User Not Found",
      });

    const productDetails = await Product.findById(productId);
    if (!productDetails)
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "Product not found",
      });

    const itemIndex = userDetails.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex == -1) {
      userDetails.cart.push({ product: productId });
    }

    await userDetails.save();

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Product Added",
      responceData: userDetails,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function removeFromCart(req, res) {
  try {
    const logginUser = req.user;
    const { productId } = req.body;

    const userExist = await User.findById(logginUser.id);
    if (!userExist)
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "User Not Found",
      });

    const productDetails = await Product.findById(productId);
    if (!productDetails)
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "Product not found",
      });

    const itemIndex = userExist.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    userExist.cart = userExist.cart
      .slice(0, itemIndex)
      .concat(userExist.cart.slice(itemIndex + 1));

    await userExist.save();

    return ApiResponce({
      res,
      statusCode: 200,
      activityType: "Delete",
      responceData: userExist,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function getCartData(req, res) {
  try {
    const userExist = await User.findById(req.params.id).populate(
      "cart.product",
      "name brand price color stock"
    );

    if (!userExist) {
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "User Not Found",
      });
    }

    return ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: userExist.cart,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}
