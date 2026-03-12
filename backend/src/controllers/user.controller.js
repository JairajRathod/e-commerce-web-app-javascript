import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import ApiResponce from "../utils/ApiResponce.js";
import { Product } from "../models/product.model.js";
import MailService from "../services/MailService.js";
import { Otp } from "../models/otp.model.js";

export async function registerNewUser(req, res) {
  try {
    const { email = "" } = req.body;

    const userExistDetails = await User.findOne({ email });

    if (userExistDetails) {
      return ApiError({
        res,
        statusCode: 409,
        detailMessage: "Email already exist.",
      });
    }

    // const emailSend = await MailService({
    //   res,
    //   recieverEmail: email,
    //   subject: "Registration Verification",
    //   emailType: "Registration Verification",
    // });

    // if (!emailSend)
    //   return ApiError({
    //     res,
    //     statusCode: 500,
    //     detailMessage: "Something went wrong",
    //   });

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "OTP send",
      responceData: {},
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const userDetails = await User.findOne({ email });
    console.log("This");

    if (!userDetails) {
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "User Email not exist",
      });
    }

    const passwordMatch = await bcrypt.compare(password, userDetails.password);

    if (!passwordMatch) {
      return ApiError({
        res,
        statusCode: 401,
        detailMessage: "Password is wrong",
      });
    }

    const token = jwt.sign(
      {
        id: userDetails._id,
        emial: userDetails.email,
        role: userDetails.role,
      },
      "jairajrahtod123",
      { expiresIn: "1d" }
    );

    ApiResponce({
      res,
      statusCode: 201,
      activityType: "Login",
      responceData: { token, userDetails },
    });
  } catch (err) {
    console.log(err);
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function getAllUsersData(req, res) {
  try {
    const logginUser = req.user;

    if (logginUser.role !== "admin") {
      return ApiError({
        res,
        statusCode: 401,
        detailMessage: "Only Admin have access to see all users",
      });
    }

    const users = await User.find();

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Finding",
      responceData: users,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function getUserById(req, res) {
  try {
    const logginUser = req.user;
    const user = await User.findById(logginUser.id);
    if (!user) {
      return res.status(404).send({ Message: "User Not Found" });
    }
    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Finding",
      responceData: user,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function updateUserData(req, res) {
  try {
    const logginUser = req.user;
    const { fullname, phone } = req.body;

    const userExist = await User.findById(logginUser.id);
    if (!userExist) {
      return res.status(404).send({ Message: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      logginUser.id,
      { $set: { fullname, phone } },
      { new: true, runValidators: true }
    );

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Update",
      responceData: updatedUser,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function deleteUserById(req, res) {
  try {
    const logginUser = req.user;
    const userDelete = await User.findByIdAndDelete(logginUser.id);
    if (!userDelete) {
      return res.status(404).send({ message: "User not exist" });
    }
    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Delete",
      responceData: userDelete,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function verifyUserAndCreate(req, res) {
  try {
    const {
      otp,
      fullname,
      email,
      password,
      phone = "",
      role = "user",
    } = req.body;

    if (!otp)
      return ApiError({ res, statusCode: 404, detailMessage: "OTP is empty" });

    // const otpExist = await Otp.findOne({ email });
    // if (!otpExist)
    //   return ApiError({
    //     res,
    //     statusCode: 500,
    //     detailMessage: "Something Went Wrong please register again",
    //   });

    if ("789456" !== otp)
      return ApiError({
        res,
        statusCode: 401,
        detailMessage: "OTP is not the same",
      });

    const newPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullname,
      email,
      password: newPassword,
      phone,
      role,
    });

    if (!newUser)
      return ApiError({
        res,
        statusCode: 400,
        detailMessage: "Something Went wrong",
      });

    // const otpDeleted = await Otp.findByIdAndDelete(otpExist._id);

    // if (!otpDeleted)
    //   return ApiError({
    //     res,
    //     statusCode: 400,
    //     detailMessage: "Something went wrong",
    //   });

    ApiResponce({
      res,
      statusCode: 201,
      activityType: "New User Creation",
      responceData: newUser,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function passwordForgotOtp(req, res) {
  try {
    const { email } = req.body;
    console.log(email);
    const userExistDetails = await User.findOne({ email });

    if (!userExistDetails) {
      return ApiError({
        res,
        statusCode: 409,
        detailMessage: "Email is not exist.",
      });
    }

    // const emailSend = await MailService({
    //   res,
    //   recieverEmail: email,
    //   subject: "Forgot Password Verification",
    //   emailType: "Forgot Password Verification",
    // });

    // if (!emailSend)
    //   return ApiError({
    //     res,
    //     statusCode: 500,
    //     detailMessage: "Something went wrong",
    //   });

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "OTP send",
      responceData: {},
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function verificationForgotPassword(req, res) {
  try {
    const { otp, email } = req.body;

    if (!otp)
      return ApiError({ res, statusCode: 404, detailMessage: "OTP is empty" });

    // const otpExist = await Otp.findOne({ email });
    // if (!otpExist)
    //   return ApiError({
    //     res,
    //     statusCode: 500,
    //     detailMessage: "Something Went Wrong please register again",
    //   });

    if ("789456" !== otp)
      return ApiError({
        res,
        statusCode: 401,
        detailMessage: "OTP is not the same",
      });

    // const otpDeleted = await Otp.findByIdAndDelete(otpExist._id);

    // if (!otpDeleted)
    //   return ApiError({
    //     res,
    //     statusCode: 400,
    //     detailMessage: "Something went wrong",
    //   });

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Update",
      responceData: {},
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function resetPassword(req, res) {
  try {
    const { password, email } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist)
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "User Not Found",
      });

    const newPassword = await bcrypt.hash(password, 10);

    const updateUser = await User.findByIdAndUpdate(
      userExist._id,
      {
        $set: { password: newPassword },
      },
      { new: true, runValidators: true }
    );

    return ApiResponce({
      res,
      statusCode: 200,
      activityType: "Update",
      responceData: {},
    });
  } catch (err) {}
}

export async function getUserDataBasedOnToken(req, res) {
  try {
    const { token } = req.body;
    console.log(token);
    const tokenDecrept = jwt.verify(token, process.env.JWT_SECRET);
    const userDetails = await User.findById(tokenDecrept.id).select(
      "id fullname email phone role totalorderamount totalorders totalproductofseller totalproductsselled totalproductsselledamount address cart"
    );
    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: userDetails,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function addAddress(req, res) {
  try {
    const logginUser = req.user;
    const address = req.body;

    const userDetails = await User.findById(logginUser.id);

    if (!userDetails)
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "User Not Found",
      });

    userDetails.address.unshift({
      street: address.street,
      city: address.city,
      state: address.state,
      zipcode: address.zipcode,
      country: address.country,
    });

    userDetails.save();

    return ApiResponce({
      res,
      statusCode: 200,
      activityType: "Add Address",
      responceData: userDetails,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}
