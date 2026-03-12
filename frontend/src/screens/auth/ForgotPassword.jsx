import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputFieldSecond from "../../components/inputs/InputFieldSecond";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../feature/users.store";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await dispatch(forgotPassword(email));
    if (result.payload?.data?.success) {
      navigate("/otp-verification");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-xl p-8 w-[350px] flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-center">Forgot Password</h2>

        <p className="text-gray-600 text-center text-sm">
          Enter your registered email and we will send you OTP.
        </p>

        <div className="flex flex-col gap-2">
          <InputFieldSecond
            label="Email"
            name="email"
            type="email"
            required={true}
            placeholderText="Enter Your Email"
            defaultValue={email}
            disable={false}
            updaterFunction={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send OTP
        </button>

        <div className="text-center text-sm">
          <Link to="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}
