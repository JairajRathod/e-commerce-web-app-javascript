import { useState } from "react";
import { InputField, SubmitButton } from "../../components/componentsExport";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../feature/users.store";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import InputFieldSecond from "../../components/inputs/InputFieldSecond";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);

  const [loginDetalis, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  async function handleFormSubmit(event) {
    event.preventDefault();
    const data = await dispatch(loginUser(loginDetalis));

    if (data.payload.success) {
      const userData = data?.payload?.data?.responceData?.userDetails;

      if (userData?.role === "user") {
        navigate("/dashboard/home");
      } else if (userData?.role === "seller") {
        navigate("/seller-dashboard/home");
      } else {
        navigate("/admin-dashboard/home");
      }
    }
  }

  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-10 shadow-2xl min-w-fit w-fit p-5 rounded-xl mx-auto items-center"
      >
        <div className="text-5xl font-bold">Login</div>

        <div className="flex flex-col gap-2 items-center">
          {/* Email */}
          <InputFieldSecond
            name="email"
            type="email"
            defaultValue={loginDetalis.email}
            placeholderText="Enter Email"
            required={true}
            updaterFunction={(event) =>
              setLoginDetails((prev) => ({
                ...prev,
                email: event.target.value,
              }))
            }
          />

          {/* Password */}
          <InputFieldSecond
            name="password"
            type="password"
            defaultValue={loginDetalis.password}
            placeholderText="Enter Password"
            required={true}
            updaterFunction={(event) =>
              setLoginDetails((prev) => ({
                ...prev,
                password: event.target.value,
              }))
            }
          />

          {/* Submit Button */}
          <div className="mt-5">
            <SubmitButton text="Submit" buttonType="submit" />
          </div>

          {/* Links Section */}
          <div className="flex flex-col items-center gap-2 mt-4 text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>

            <div>
              Don’t have an account?{" "}
              <Link to="/" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
