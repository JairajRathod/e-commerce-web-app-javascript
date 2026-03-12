import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordOtpVerification } from "../../feature/users.store";
import { useDispatch, useSelector } from "react-redux";

export default function OtpVerification() {
  const dispatch = useDispatch();
  const { forgotemail } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (event, index) => {
    const value = event.target.value;

    // Allow only digits
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next box automatically
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    // Backspace → move to previous
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("OTP entered:", otp.join(""));
    const OTP = otp.join("");
    const result = await dispatch(
      forgotPasswordOtpVerification({ email: forgotemail, otp: OTP })
    );
    if (result.payload.success) return navigate("/update-password");
  };

  useEffect(() => {
    if (forgotemail === "") {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-[370px] flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-center">Verify OTP</h2>

        <p className="text-gray-600 text-sm text-center">
          Enter the 6-digit verification code sent to your email.
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mt-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center border rounded-lg text-xl font-semibold
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-4"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
}
