import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sellerid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  totalamount: {
    type: Number,
    required: true,
    min: 0,
  },
  orderdate: {
    type: Date,
    default: Date.now(),
  },
  paymenttype: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "shipping", "delivered", "cancled"],
    default: "pending",
  },
  shippingaddress: {
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
});

export const Order = mongoose.model("Order", orderSchema);
