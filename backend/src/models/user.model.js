import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      min: [6, "Minimum username length is 6 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: [6, "Password minimum length is 6 characters"],
    },
    phone: { type: String },
    role: {
      type: String,
      enum: ["admin", "user", "seller"],
      default: "user",
    },
    address: [
      {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipcode: { type: String, required: true },
        country: { type: String, required: true },
      },
    ],
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      },
    ],
    totalorderamount: { type: Number, default: 0 },
    totalorders: { type: Number, default: 0 },
    totalproductofseller: { type: Number, default: 0 },
    totalproductsselled: { type: Number, default: 0 },
    totalproductsselledamount: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
