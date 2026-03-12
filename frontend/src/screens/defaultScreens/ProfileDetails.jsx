import { useDispatch, useSelector } from "react-redux";
import {
  logoutUser,
  tokenVerfication,
  updateProfileDetails,
} from "../../feature/users.store";
import { useEffect, useState } from "react";
import { Popup } from "../../components/componentsExport";
import InputFieldSecond from "../../components/inputs/InputFieldSecond";

export default function ProfileDetails() {
  const dispatch = useDispatch();
  const { currentUser, tokenDetails } = useSelector((state) => state.user);
  const [profilePopupIsOpen, setProfilePopupIsOpen] = useState(false);

  const [userDetails, setUserDetails] = useState({
    fullname: currentUser.fullname,
    phone: currentUser.phone,
  });

  async function userDetailsEditOnSubmit(event) {
    event.preventDefault();
    await dispatch(
      updateProfileDetails({ token: tokenDetails, ...userDetails })
    );
    await dispatch(tokenVerfication());
    setProfilePopupIsOpen(false);
  }

  useEffect(() => {
    dispatch(tokenVerfication());
  }, []);

  return (
    <div className="w-full bg-white flex justify-center px-4 py-10">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          {/* Profile Image */}
          <img
            src="asdfasdf"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover shadow-md"
          />

          {/* Basic Details */}
          <div className="text-center md:text-left space-y-1">
            <h2 className="text-3xl font-bold text-gray-800">
              {currentUser?.fullname}
            </h2>
            <p className="text-gray-600 text-lg">{currentUser?.email}</p>
            <p className="text-gray-500">{currentUser?.phone}</p>

            <UserDetailsEditPopup
              isOpen={profilePopupIsOpen}
              setIsOpen={setProfilePopupIsOpen}
              onSubmitAction={userDetailsEditOnSubmit}
              details={userDetails}
              setDetails={setUserDetails}
            />

            <div className="flex flex-row gap-2">
              <button
                onClick={() => {
                  setProfilePopupIsOpen(true);
                }}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg mt-3 hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
              <button
                onClick={() => {
                  dispatch(logoutUser());
                }}
                className="bg-red-600 text-white px-5 py-2 rounded-lg mt-3 hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DataCard
            color="blue"
            value={currentUser?.totalorders}
            title="Orders Placed"
          />
          <DataCard
            color="green"
            value={(currentUser?.totalorderamount).toFixed(2)}
            title="Total Spent"
          />
          <DataCard
            color="red"
            value={currentUser?.cart.length}
            title="Cart Items"
          />
        </div>
      </div>
    </div>
  );
}

function DataCard({ color = "", value = "", title = "" }) {
  return (
    <div
      className={`bg-${color}-50 border border-${color}-200 p-4 rounded-lg text-center`}
    >
      <h3 className={`text-2xl font-bold text-${color}-700`}>{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
    </div>
  );
}

function UserDetailsEditPopup({
  isOpen,
  setIsOpen,
  onSubmitAction,
  details,
  setDetails,
}) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Edit Profile"
    >
      <form action="" onSubmit={onSubmitAction} className="flex flex-col gap-3">
        <InputFieldSecond
          label="Full Name"
          name="fullname"
          type="text"
          defaultValue={details.fullname}
          placeholderText="Enter Full Name"
          required={false}
          disable={false}
          updaterFunction={(event) => {
            setDetails((prev) => ({
              ...prev,
              fullname: event.target.value,
            }));
          }}
        />
        <InputFieldSecond
          label="Phone"
          name="phone"
          type="text"
          defaultValue={details.phone}
          placeholderText="Enter Phone Number"
          required={false}
          disable={false}
          updaterFunction={(event) => {
            setDetails((prev) => ({
              ...prev,
              phone: event.target.value,
            }));
          }}
        />
        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Update
        </button>
      </form>
    </Popup>
  );
}
