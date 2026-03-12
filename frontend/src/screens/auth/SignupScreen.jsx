import { useState } from "react";
import {
  Button,
  Dropdown,
  InputField,
  SubmitButton,
} from "../../components/componentsExport";
import { toast } from "react-toastify";
import axios from "axios";
import OTPInput from "./OTPInput";
import InputFieldSecond from "../../components/inputs/InputFieldSecond";
import DropdownSecond from "../../components/inputs/DropdownSecond";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../feature/users.store";

export default function SignupScreen() {
  const dispatch = useDispatch();
  const { otp } = useSelector((state) => state.user);
  const [inputDetails, setInputDetails] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
  });

  const [confirmpassword, setConfirmPassword] = useState("");
  const [verificationOtp, setVerificationOtp] = useState("");
  const [popupEnable, setPopupEnable] = useState(false);
  const [otpPopup, setOtpPopup] = useState(false);

  async function handleFormSubmit(event) {
    event.preventDefault();
    if (inputDetails.password !== confirmpassword) {
      toast.error("Passwords are not matching");
      return;
    }

    const result = await dispatch(registerUser({ email: inputDetails.email }));

    console.log(result);

    if (result.payload.success) {
      setOtpPopup(true);
      toast.success("OTP has been sended");
    } else {
      toast.error(response.data.error.detailMessage);
    }
  }

  return (
    <>
      <div
        className={`flex flex-row justify-center items-center h-screen ${
          otpPopup ? "hidden" : "block"
        }`}
      >
        <form
          action=""
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-10 shadow-2xl min-w-fit w-fit p-10 rounded-xl mx-auto items-center"
        >
          <div className="text-5xl font-bold">Signup</div>
          <div className="flex flex-col gap-2 items-center">
            <div className="flex flex-col md:flex-row gap-2 md:gap-10">
              <InputFieldSecond
                label="Full Name"
                name="fullname"
                type="text"
                defaultValue={inputDetails.fullname}
                placeholderText="Enter Full Name"
                required={true}
                updaterFunction={(event) => {
                  setInputDetails((prev) => ({
                    ...prev,
                    fullname: event.target.value,
                  }));
                  console.log(event.target.value);
                }}
              />
              <InputFieldSecond
                label="Email"
                name="email"
                type="email"
                defaultValue={inputDetails.email}
                placeholderText="Enter Emial"
                required={true}
                updaterFunction={(event) => {
                  setInputDetails((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }));
                  console.log(event.target.value);
                }}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-2 md:gap-10">
              <InputFieldSecond
                label="Password"
                name="password"
                type="password"
                defaultValue={inputDetails.password}
                placeholderText="Enter Password"
                required={true}
                updaterFunction={(event) => {
                  setInputDetails((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }));
                  console.log(event.target.value);
                }}
              />
              <InputFieldSecond
                label="Confirm Password"
                name="confirmpassword"
                type="password"
                defaultValue={confirmpassword}
                placeholderText="Enter Confirm Password"
                required={true}
                updaterFunction={(event) => {
                  setConfirmPassword(event.target.value);
                  console.log(event.target.value);
                }}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-2 md:gap-10">
              <InputFieldSecond
                label="Phone"
                name="phone"
                type="tel"
                defaultValue={inputDetails.phone}
                placeholderText="Enter Phone Number"
                required={true}
                onInput={(event) => {
                  console.log(event.target.value);
                  event.target.value = event.target.value.replace(
                    /[^0-9]/g,
                    ""
                  );
                }}
                updaterFunction={(event) => {
                  setInputDetails((prev) => ({
                    ...prev,
                    phone: event.target.value,
                  }));
                  console.log(event.target.value);
                }}
              />
              <DropdownSecond
                name="role"
                defaultValue="user"
                required={true}
                updaterFunction={(event) => {
                  setInputDetails((prev) => ({
                    ...prev,
                    role: event.target.value,
                  }));
                  console.log(event.target.value);
                }}
                label="Role"
                options={[
                  { label: "User", value: "user" },
                  { label: "Seller", value: "seller" },
                ]}
              />
            </div>
            <div className="mt-5">
              <SubmitButton text="Submit" buttonType="submit" />
            </div>
          </div>
        </form>
      </div>

      <div className={`${otpPopup ? "block" : "hidden"}`}>
        <OTPInput data={inputDetails} />
      </div>
    </>
  );
}
