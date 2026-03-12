import nodemailer from "nodemailer";
import htmlTemplateEmail from "../utils/htmlTemplateEmail.js";
import otpGenerator from "../utils/otpGenerator.js";
import { Otp } from "../models/otp.model.js";
import ApiError from "../utils/ApiError.js";
import { createOtp, updateOtp } from "../controllers/otp.controller.js";
// import ApiResponce from "../utils/ApiResponce.js";

async function MailService({ res, recieverEmail, subject, emailType }) {
  const OTP = "789456";

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: "jarathod@bestpeers.in",
      pass: "ldwozozyfnpqekae",
    },
  });

  const info = await transporter.sendMail({
    from: '"Verificaion" <jarathod@bestpeers.in>',
    to: recieverEmail,
    subject,
    text: "",
    html: htmlTemplateEmail(OTP, emailType), // HTML body
  });
  console.log("this");

  if (!info) return false;

  const otpEmailExist = await Otp.findOne({ email: recieverEmail });

  if (otpEmailExist) {
    await updateOtp({ email: recieverEmail, otp: OTP });
  } else {
    await createOtp({ email: recieverEmail, otp: OTP });
  }

  console.log(info.messageId);

  return true;
}

export default MailService;
