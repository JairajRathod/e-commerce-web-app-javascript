import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

export default function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const tokenDetails = authHeader && authHeader.split(" ")[1];

    if (!tokenDetails) {
      return ApiError({
        res,
        statusCode: 401,
        detailMessage: "Access denied. No token provided.",
      });
    }

    const decoded = jwt.verify(tokenDetails, process.env.JWT_SECRET);

    req.userTokenDetails = decoded;

    next();
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}
