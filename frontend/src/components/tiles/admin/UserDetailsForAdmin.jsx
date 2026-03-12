import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";

export default function UserDetailsForAdmin({
  username = "",
  totalOrders = 0,
  totalAmount = 0,
}) {
  return (
    <div className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 min-w-fit w-[340px] border border-gray-100">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl -z-0"></div>

      <div className="relative flex items-center gap-4">
        {/* Profile Image with Ring */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <img
            src="ef"
            alt=""
            className="relative h-16 w-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 object-cover ring-4 ring-white shadow-lg group-hover:scale-105 transition-transform duration-300"
          />
          {/* Online Status Indicator */}
          <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full ring-2 ring-white"></div>
        </div>

        {/* User Info */}
        <div className="flex-1 space-y-2">
          {/* Username */}
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
              {username || "Guest User"}
            </h3>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            {/* Orders */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <FaCartShopping className="text-blue-600 text-sm" />
              <span className="text-sm font-semibold text-gray-700">
                {totalOrders}
              </span>
              <span className="text-xs text-gray-500">orders</span>
            </div>

            {/* Revenue */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
              <RiMoneyRupeeCircleFill className="text-green-600 text-sm" />
              <span className="text-sm font-semibold text-gray-700">
                ₹{totalAmount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
}
