import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { MdSell } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";

export default function SellerDetailsForAdmin({
  sellernmae = "",
  totalNumberOfProducts = 0,
  totalProductsSelled = 0,
  totalProductsSelledAmount = 0,
}) {
  return (
    <div className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 min-w-fit w-[420px] border border-gray-100">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl -z-0"></div>

      <div className="relative flex items-start gap-4">
        {/* Profile Image with Ring */}
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <img
            src="ef"
            alt="Seller Profile"
            className="relative h-16 w-16 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 object-cover ring-4 ring-white shadow-lg group-hover:scale-105 transition-transform duration-300"
          />
          {/* Verified Badge */}
          <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-blue-500 rounded-full ring-2 ring-white flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Seller Info */}
        <div className="flex-1 space-y-3">
          {/* Seller Name */}
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
              {sellernmae || "Seller Name"}
            </h3>
            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
              Seller
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            {/* Total Products */}
            <div className="flex flex-col items-center gap-1.5 px-3 py-2 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors border border-gray-100">
              <FaCartShopping className="text-gray-600 text-lg" />
              <span className="text-base font-bold text-gray-800">
                {totalNumberOfProducts}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                Products
              </span>
            </div>

            {/* Products Sold */}
            <div className="flex flex-col items-center gap-1.5 px-3 py-2 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors border border-red-100">
              <MdSell className="text-red-600 text-lg" />
              <span className="text-base font-bold text-gray-800">
                {totalProductsSelled}
              </span>
              <span className="text-xs text-gray-500 font-medium">Sold</span>
            </div>

            {/* Revenue */}
            <div className="flex flex-col items-center gap-1.5 px-3 py-2 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors border border-green-100">
              <RiMoneyRupeeCircleFill className="text-green-600 text-lg" />
              <span className="text-base font-bold text-gray-800">
                ₹{totalProductsSelledAmount}
              </span>
              <span className="text-xs text-gray-500 font-medium">Revenue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
}
