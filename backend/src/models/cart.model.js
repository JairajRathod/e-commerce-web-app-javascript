import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
      },
    },
  ],
});

export const Cart = mongoose.model("Cart", cartSchema);
