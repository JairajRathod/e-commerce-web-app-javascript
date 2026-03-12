import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    // image: { type: String, required: [true, "Product Image is required"] },
    name: { type: String, required: [true, "Product name is required"] },
    description: { type: String, required: [true, "Description is required"] },
    brand: { type: String, required: [true, "Brand is required"] },
    color: { type: String },
    price: { type: Number, required: [true, "Price is required"], min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    sellerid: { type: String, required: [true, "Seller ID is required"] },
    totalSelled: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
