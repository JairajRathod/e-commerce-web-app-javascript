import { useDispatch, useSelector } from "react-redux";
import { Popup } from "../../components/componentsExport";
import { useEffect, useState } from "react";
import InputFieldSecond from "../../components/inputs/InputFieldSecond";
import {
  logoutUser,
  tokenVerfication,
  updateProfileDetails,
} from "../../feature/users.store";
import { Circle, FilePenLine, Star } from "lucide-react";

export default function AdminProfile() {
  const dispatch = useDispatch();
  const { currentUser, tokenDetails } = useSelector((state) => state.user);
  const {
    fullname,
    email,
    phone,
    totalproductofseller,
    totalproductsselled,
    totalproductsselledamount,
    address,
  } = currentUser;
  const [isOpen, setIsOpen] = useState(false);
  const [updateDetails, setUpdateDetails] = useState({
    fullname: "",
    phone: "",
  });

  async function onSubmitAction(event) {
    event.preventDefault();
    await dispatch(
      updateProfileDetails({ token: tokenDetails, ...updateDetails })
    );
    await dispatch(tokenVerfication());
    setIsOpen(false);
  }

  useEffect(() => {
    console.log(currentUser);
    setUpdateDetails({
      fullname: currentUser.fullname,
      phone: currentUser.phone,
    });
  }, [currentUser]);

  return (
    <div className=" flex justify-center items-center">
      <div className="w-full max-w-4xl">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-t-2xl h-32 relative">
          <div className="absolute inset-0 bg-black opacity-10 rounded-t-2xl"></div>
          <div className="absolute -bottom-16 left-8 flex items-end space-x-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                <span className="text-5xl font-bold text-white">
                  {fullname?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white shadow-2xl rounded-b-2xl rounded-t-none pt-20 pb-8 px-8">
          {/* User Info Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-1">
                  {fullname}
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 border border-indigo-200">
                    <Star className="w-3 h-3 mr-2" />
                    Administrator
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                    Active
                  </span>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <ProfileButtons
                  onClick={() => setIsOpen(true)}
                  color="blue"
                  icon={<FilePenLine className="w-4 h-4 mr-2" />}
                  text="Edit Profile"
                />
                <ProfileButtons
                  onClick={() => dispatch(logoutUser())}
                  color="red"
                  icon={<FilePenLine className="w-4 h-4 mr-2" />}
                  text="Logout"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Contact Information Card */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  Contact Information
                </h3>
              </div>
              <div className="space-y-4">
                <ProfileField
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  }
                  label="Email Address"
                  data={email}
                  color="blue"
                />
                <ProfileField
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  }
                  label="Phone Number"
                  data={phone}
                  color="green"
                />
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  Account Overview
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <StatBox label="Account Type" value="Premium" color="purple" />
                <StatBox label="Member Since" value="2024" color="indigo" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4"></div>
        </div>

        {/* Edit Profile Popup */}
        <Popup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Edit Profile"
        >
          <form action="" onSubmit={onSubmitAction} className="space-y-4">
            <InputFieldSecond
              label="Full Name"
              name="fullname"
              type="text"
              defaultValue={updateDetails.fullname}
              placeholderText="Enter Full Name"
              required={false}
              disable={false}
              updaterFunction={(event) => {
                setUpdateDetails((prev) => ({
                  ...prev,
                  fullname: event.target.value,
                }));
              }}
            />
            <InputFieldSecond
              label="Phone"
              name="phone"
              type="text"
              defaultValue={updateDetails.phone}
              placeholderText="Enter Phone Number"
              required={false}
              disable={false}
              updaterFunction={(event) => {
                setUpdateDetails((prev) => ({
                  ...prev,
                  phone: event.target.value,
                }));
              }}
            />
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Update Profile
            </button>
          </form>
        </Popup>
      </div>
    </div>
  );
}

function ProfileField({ icon, label, data, color = "blue" }) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="flex items-start space-x-3">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClasses[color]}`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-0.5">
          {label}
        </p>
        <p className="text-sm font-semibold text-slate-800 truncate">{data}</p>
      </div>
    </div>
  );
}

function StatBox({ label, value, color = "blue" }) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    indigo: "from-indigo-500 to-indigo-600",
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-slate-200">
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
        {label}
      </p>
      <p
        className={`text-2xl font-bold bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}
      >
        {value}
      </p>
    </div>
  );
}

function ProfileButtons({
  onClick = () => {},
  color = "",
  icon = "",
  text = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-5 py-2.5  bg-${color}-600 hover:bg-${color}-700  text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
    >
      {icon}
      {text}
    </button>
  );
}
