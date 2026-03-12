import { useRef, useState } from "react";
import InputFieldSecond from "../../components/inputs/InputFieldSecond";
import { useDispatch } from "react-redux";
import { getOtpVerification } from "../../feature/users.store";
import { useNavigate } from "react-router-dom";

export default function OTPInput({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [verifyEnable, setVerifyEnable] = useState(false);

  console.log(data);

  async function verifyOTP() {
    setVerifyEnable(true);
    data.otp = otp;
    const response = await dispatch(getOtpVerification(data));
    console.log(response);
    if (response.payload.success) {
      navigate("/login");
    } else {
      setVerifyEnable(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>
        <p className="text-center text-gray-600 mb-6">
          Enter the 6-digit code sent to your email
        </p>

        <div className="flex flex-row justify-center">
          <InputFieldSecond
            name="opt"
            type="text"
            placeholderText="Enter OTP"
            defaultValue={otp}
            required={true}
            updaterFunction={(event) => {
              setOtp((prev) => event.target.value);
            }}
          />
        </div>

        <button
          onClick={verifyOTP}
          disabled={verifyEnable}
          className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg text-lg hover:bg-blue-700 transition disabled:bg-blue-900"
        >
          Verify
        </button>
      </div>
    </div>
  );
}
