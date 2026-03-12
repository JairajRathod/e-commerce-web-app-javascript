import { Otp } from "../models/otp.model.js";
import ApiError from "../utils/ApiError.js";

export async function createOtp({ email = "", otp = "" }) {
  try {
    const otpCreated = await Otp.create({
      email,
      otp,
    });

    if (!otpCreated)
      return ApiError({
        res,
        statusCode: 400,
        detailMessage: "Something Went Wrong",
      });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function updateOtp({ email = "", otp = "" }) {
  try {
    const otpUpdated = await Otp.findOneAndUpdate(
      { email },
      { $set: { otp } },
      { new: true, runValidators: true }
    );

    if (!otpUpdated)
      return ApiError({
        res,
        statusCode: 400,
        detailMessage: "Something Went Wrong",
      });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}
