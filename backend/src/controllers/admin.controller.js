import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponce from "../utils/ApiResponce.js";

// First section to see total number of products ordered and total amount
export async function totalFilter(req, res) {
  try {
    const allOrders = await Order.find();
    const allProducts = await Product.find();

    const totalAmount = allOrders.reduce((acc, order) => {
      return acc + order.totalamount;
    }, 0);

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: {
        totalordersold: allOrders.length,
        totalorderrevenue: totalAmount,
        totalproductcount: allProducts.length,
      },
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

// All user Details for Admin
export async function userDetailsForAdmin(req, res) {
  try {
    const allUsers = await User.find({ role: "user", active: true })
      .limit(20)
      .select("_id fullname totalorders totalorderamount");

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: allUsers,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

// All Active seller details for admin
export async function sellerDetailsForAdmin(req, res) {
  try {
    const allSellers = await User.find({ role: "seller", active: true })
      .limit(20)
      .select(
        "_id fullname totalproductofseller totalproductsselled totalproductsselledamount"
      );

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: allSellers,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

// Top active user based on order count
export async function topUsersBasedOnOrder(req, res) {
  try {
    const topUser = await User.find({ role: "user", active: true })
      .sort({
        totalorderamount: -1,
      })
      .limit(5)
      .select("fullname totalorderamount totalorders email");
    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: topUser,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: "Server Error" });
  }
}

// Top active seller based on revenue amount
export async function topSellerBasedOnAmount(req, res) {
  try {
    const topSeller = await User.find({ role: "seller", active: true })
      .sort({
        totalproductsselledamount: "desc",
      })
      .limit(5)
      .select(
        "fullname totalproductofseller totalproductsselled totalproductsselledamount"
      );
    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: topSeller,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: "Server Error" });
  }
}

// All active products details
export async function getAllProductDetails(req, res) {
  try {
    const allProducts = await Product.find({ active: true }).select(
      "_id name price stock totalSelled"
    );

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

// All orders details
export async function getAllOrdersDetails(req, res) {
  try {
    const response = await Order.find()
      .populate("user", "fullname")
      .populate("products.product", "name");
    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: response,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

// delete user by setting active false
export async function deleteUserByAdmin(req, res) {
  try {
    const logginUser = req.user;
    const { userid } = req.body;

    if (logginUser.role !== "admin")
      return ApiError({
        res,
        statusCode: 400,
        detailMessage: "You are not Admin",
      });

    const deleteUser = await User.findByIdAndUpdate(
      userid,
      {
        $set: { active: false },
      },
      { new: true, runValidators: true }
    );

    if (!deleteUser)
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "User Not Found",
      });

    return ApiResponce({
      res,
      statusCode: 200,
      activityType: "Delete",
      responceData: deleteUser,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: "" });
  }
}

// delete seller by setting active false
export async function deleteSellerByAdmin(req, res) {
  try {
    const logginUser = req.user;
    const { sellerid } = req.body;

    if (logginUser.role !== "admin")
      return ApiError({
        res,
        statusCode: 400,
        detailMessage: "You are not Admin",
      });

    const confirmSeller = await User.findById(sellerid);

    if (!confirmSeller)
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "This is not a seller id",
      });

    const deleteUser = await User.findByIdAndUpdate(
      sellerid,
      {
        $set: { active: false },
      },
      { new: true, runValidators: true }
    );

    if (!deleteUser)
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "User Not Found",
      });

    return ApiResponce({
      res,
      statusCode: 200,
      activityType: "Delete",
      responceData: deleteUser,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: "" });
  }
}
