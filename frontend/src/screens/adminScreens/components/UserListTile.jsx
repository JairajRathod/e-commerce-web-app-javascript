import React from "react";
import { ShoppingBag, DollarSign, Users } from "lucide-react";
import ValueSubBox from "./ValueSubBox";

const ListTile = ({
  imageUrl = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  name = "John Doe",
  totalOrders = 0,
  totalSpend = 0,
}) => {
  return (
    <>
      <div className="relative flex items-center gap-3 p-1">
        {/* Left side - Image with gradient ring */}
        <div className="flex-shrink-0 relative">
          {imageUrl === "" ? (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold mr-3">
              {name.charAt(0).toUpperCase()}
            </div>
          ) : (
            <img
              src={imageUrl}
              alt={name}
              className="relative w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md group-hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>

        {/* Right side - User Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-800 truncate mb-1 group-hover:text-purple-600 transition-colors duration-300">
            {name}
          </h3>

          <div className="flex items-center gap-2">
            {/* Orders Badge */}
            <ValueSubBox
              color="blue"
              value={totalOrders}
              icon={<ShoppingBag className="w-3 h-3 text-blue-700" />}
            />

            {/* Spend Badge */}
            <ValueSubBox
              color="green"
              value={totalSpend.toLocaleString()}
              icon={<DollarSign className="w-3 h-3 text-green-700" />}
            />
          </div>
        </div>
      </div>
    </>
  );
};

// Demo with multiple users
export default function UserListTile({ data = [] }) {
  return (
    <div className="space-y-4">
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <Users className="w-12 h-12 mb-3 opacity-50" />
          <p className="text-lg font-medium">Something Wrong</p>
          <p className="text-sm">Please check your internet!</p>
        </div>
      ) : (
        data.map((user, index) => (
          <ListTile
            key={user._id}
            imageUrl={user?.imageUrl || ""}
            name={user?.fullname}
            totalOrders={user?.totalorders}
            totalSpend={user?.totalorderamount}
          />
        ))
      )}
    </div>
  );
}
