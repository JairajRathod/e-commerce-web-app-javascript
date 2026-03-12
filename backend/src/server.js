import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import connectMongoDb from "./database/db.js";
import productRoutes from "./routes/product.routes.js";
import orderRoute from "./routes/order.routes.js";
import uploadRoute from "./routes/upload.routes.js";
import authMiddleware from "./middleware/auth.middleware.js";
import { createNewProduct } from "./controllers/product.controller.js";
import adminRoute from "./routes/admin.routes.js";
import sellerRoute from "./routes/seller.routes.js";
import cors from "cors";
import cartRoute from "./routes/cart.route.js";

dotenv.config();

const PORT = process.env.PORT || 4100;

const app = express();

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

connectMongoDb();

app.use("/", userRouter);
app.use("/products", productRoutes);
app.use("/order", orderRoute);
app.use("/upload", uploadRoute);
app.use("/admin-dashboard", adminRoute);
app.use("/seller-dashboard", sellerRoute);
app.use("/cart", cartRoute);

app.listen(PORT, () => {
  console.log(`Server is rinning on PORT http://localhost:${PORT}`);
});
