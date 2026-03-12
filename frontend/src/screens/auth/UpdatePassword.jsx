import { useEffect, useState } from "react";
import InputFieldSecond from "../../components/inputs/InputFieldSecond";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../feature/users.store";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { forgotemail } = useSelector((state) => state.user);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match!");
      return;
    }

    const result = await dispatch(
      updatePassword({ email: forgotemail, password: newPassword })
    );

    if (result.payload?.success) {
      toast.success("Password Updated Successfully");
      navigate("/login");
    }
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
        className="bg-white shadow-xl rounded-xl p-8 w-[380px] flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-center">Update Password</h2>

        {/* New Password */}
        <InputFieldSecond
          label="New Password"
          name="newPassword"
          type="password"
          defaultValue={newPassword}
          required={true}
          placeholderText="Enter New Password"
          updaterFunction={(event) => {
            setNewPassword(event.target.value);
          }}
        />

        {/* Confirm New Password */}
        <InputFieldSecond
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          defaultValue={confirmPassword}
          required={true}
          placeholderText="Enter Confirm Password"
          updaterFunction={(event) => {
            setConfirmPassword(event.target.value);
          }}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
