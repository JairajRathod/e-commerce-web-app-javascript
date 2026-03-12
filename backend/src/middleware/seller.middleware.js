import ApiError from "../utils/ApiError";

export async function sellerMiddleware(schema) {
  return (req, res, next) => {
    try {
      if (role == "seller") {
      }
    } catch (err) {
      ApiError({ res, statusCode: 500, detailMessage: err });
    }
  };
}
