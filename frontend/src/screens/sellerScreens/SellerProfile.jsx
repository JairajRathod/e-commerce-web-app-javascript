import { useDispatch, useSelector } from "react-redux";
import { Popup } from "../../components/componentsExport";
import { useEffect, useState } from "react";
import InputFieldSecond from "../../components/inputs/InputFieldSecond";
import {
  logoutUser,
  tokenVerfication,
  updateProfileDetails,
} from "../../feature/users.store";

export default function SellerProfile() {
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
    dispatch(tokenVerfication());
  }, []);

  useEffect(() => {
    setUpdateDetails({
      fullname: currentUser.fullname,
      phone: currentUser.phone,
    });
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center overflow-x-auto">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            src="https"
            alt="Seller"
            className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md"
          />

          <h2 className="text-xl font-semibold mt-3">{fullname}</h2>
          <p className="text-gray-500 text-sm">Seller</p>
        </div>

        <hr className="my-5" />

        {/* Profile Information */}
        <div className="space-y-3">
          <PeraFiled label={"Email"} data={email} />
          <PeraFiled label={"Phone"} data={phone} />
          <PeraFiled label={"Total Products"} data={totalproductofseller} />
          <PeraFiled label={"Total Selles"} data={totalproductsselled} />
          <PeraFiled label={"Total Revenue"} data={totalproductsselledamount} />
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Edit Profile
        </button>
        <button
          onClick={() => {
            dispatch(logoutUser());
          }}
          className="w-full bg-red-600 text-white px-5 py-2 rounded-lg mt-3 hover:bg-red-700 transition"
        >
          Logout
        </button>

        <Popup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Edit Profile"
        >
          <form action="" onSubmit={onSubmitAction}>
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
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
            >
              Update
            </button>
          </form>
        </Popup>
      </div>
    </div>
  );
}

function PeraFiled({ label, data }) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-medium">{data}</p>
    </div>
  );
}
