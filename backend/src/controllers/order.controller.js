import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponce from "../utils/ApiResponce.js";

export async function addOrder(req, res) {
  try {
    const logginUser = req.user;
    const { productId, quantity, subtotal, total, address, paymenttype } =
      req.body;

    const userDetail = await User.findById(logginUser.id);
    if (!userDetail)
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "User Not Exist",
      });

    const productDetails = await Product.findById(productId);
    if (!productDetails)
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "Product Not Found",
      });

    if (productDetails.stock < quantity)
      return ApiError({
        res,
        statusCode: 400,
        detailMessage: "Not enough stock",
      });

    const newOrder = await Order.create({
      user: userDetail._id,
      sellerid: productDetails.sellerid,
      products: [
        {
          product: productId,
          quantity,
          price: productDetails.price,
        },
      ],
      totalamount: total,
      orderdate: new Date(),
      status: "pending",
      paymenttype,
      shippingaddress: {
        street: address.street,
        city: address.city,
        state: address.state,
        zipcode: address.zipcode,
        country: address.country,
      },
    });

    // Update product stock
    await Product.findByIdAndUpdate(productDetails._id, {
      $inc: {
        stock: -+quantity,
        totalSelled: +(+quantity),
      },
    });

    // Update buyer stats
    await User.findByIdAndUpdate(logginUser.id, {
      $inc: {
        totalorders: +1,
        totalorderamount: +total,
      },
    });

    // Update seller stats
    const sellerDetails = await User.findById(productDetails.sellerid);

    await User.findByIdAndUpdate(sellerDetails._id, {
      $inc: {
        totalproductsselled: +(+quantity),
        totalproductsselledamount: +(+subtotal),
      },
    });

    const itemIndex = userDetail.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    userDetail.cart = userDetail.cart
      .slice(0, itemIndex)
      .concat(userDetail.cart.slice(itemIndex + 1));

    await userDetail.save();

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Placed",
      responceData: newOrder,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err.message });
  }
}

export async function getOrdersForUser(req, res) {
  try {
    const logginUser = req.user;
    if (logginUser.role != "user")
      return ApiError({
        res,
        statusCode: 400,
        detailMessage: "Only user can access this",
      });

    const allOrders = await Order.find({ user: logginUser.id }).populate(
      "products.product",
      "name"
    );
    if (!allOrders)
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "No Order found",
      });

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: allOrders,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

// This function is to get data of orders filter by the seller ID
export async function getOrdersForSeller(req, res) {
  try {
    const logginUser = req.user;
    console.log(logginUser);

    const allOrders = await Order.find({ sellerid: logginUser.id })
      .populate("user", "fullname")
      .populate("products.product", "name");

    if (!allOrders)
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "No order found",
      });

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: allOrders,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

// This function is to get data of all orders for admin
export async function getOrdersForAdmin(req, res) {
  try {
    const logginUser = req.user;

    if (logginUser.role != "admin")
      return ApiError({
        res,
        statusCode: 400,
        detailMessage: "Only admin can access this",
      });

    const allOrders = await Order.find();

    if (!allOrders)
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "Orders are not found",
      });

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: allOrders,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function updateOrderStatus(req, res) {
  try {
    const logginUser = req.user;
    const { orderid, status } = req.body;

    console.log(orderid, status);

    if (logginUser.role === "user")
      return ApiError({
        res,
        statusCode: 400,
        detailMessage: "User can't update status",
      });

    const orderDetails = await Order.findById(orderid);
    if (!orderDetails)
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "Order not exist",
      });

    if (
      logginUser.role === "seller" &&
      orderDetails.sellerid.toString() !== logginUser.id
    )
      return ApiError({
        res,
        statusCode: 400,
        detailMessage: "Seller Id not matched",
      });

    const updatedOrder = await Order.findByIdAndUpdate(
      orderid,
      { $set: { status: status } },
      { new: true, runValidators: true }
    );

    if (!updatedOrder)
      return ApiError({
        res,
        statusCode: 400,
        detailMessage: "Order Status not updated",
      });

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Update",
      responceData: updatedOrder,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}
