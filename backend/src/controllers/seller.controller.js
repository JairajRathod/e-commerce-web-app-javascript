import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponce from "../utils/ApiResponce.js";

export async function allProductsWithDetails(req, res) {
  try {
    const { sellerId } = req.body;
    console.log("sellerID", sellerId);
    const sellerAllProducts = await Product.find({
      sellerid: sellerId,
      active: true,
    }).exec();

    console.log("All Products", sellerAllProducts);

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: sellerAllProducts,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function topBuyedProducts(req, res) {
  try {
    const logginUser = req.user;
    const topProducts = await Product.find({ sellerid: logginUser.id })
      .sort({
        totalSelled: "desc",
      })
      .limit(5);

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: topProducts,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function topBuyedPeoples(req, res) {
  try {
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function sellerTotalFilter(req, res) {
  try {
    const logginUser = req.user;
    const sellerDetails = User.findById(logginUser.id);

    const finalResponceData = {
      fullname: sellerDetails.fullname,
      total_number_of_products: sellerDetails.totalproductofseller,
      total_products_selled: sellerDetails.totalproductsselled,
      total_products_selled_amount: sellerDetails.totalproductsselledamount,
    };

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: finalResponceData,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function totalFilterOfSeller(req, res) {
  try {
    const logginUser = req.user;

    const allProducts = await Product.find({
      sellerid: logginUser.id,
      active: true,
    }).select("stock");

    const totalOrderCount = (await Order.find({ sellerid: logginUser.id }))
      .length;
    const totalCustomersCount = (
      await Order.distinct("user", {
        sellerid: logginUser.id,
      })
    ).length;

    let totalStockCount = 0;

    allProducts.forEach((product) => {
      totalStockCount += +product.stock;
    });

    return ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: { totalStockCount, totalOrderCount, totalCustomersCount },
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function orderDeliveryStatus(req, res) {
  try {
    const logginUser = req.user;

    const allOrdersStatus = await Order.find({
      sellerid: logginUser.id,
    }).select("status");

    const orderStatusCount = {
      pending: 0,
      processing: 0,
      shipping: 0,
      delivered: 0,
      cancled: 0,
      totalCount: allOrdersStatus.length,
    };

    allOrdersStatus.forEach((order) => {
      if (order.status === "pending") {
        orderStatusCount.pending += 1;
      } else if (order.status === "processing") {
        orderStatusCount.processing += 1;
      } else if (order.status === "shipping") {
        orderStatusCount.shipping += 1;
      } else if (order.status === "delivered") {
        orderStatusCount.delivered += 1;
      } else if (order.status === "cancled") {
        orderStatusCount.cancled += 1;
      } else {
      }
    });

    return ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: orderStatusCount,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}
