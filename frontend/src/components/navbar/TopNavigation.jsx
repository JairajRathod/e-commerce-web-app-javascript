import { FaSearch, FaMoon, FaSun, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { FaBoxOpen } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function TopNavigation() {
  const [darkMode, setDarkMode] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* LEFT — Logo */}
      <Link
        to={"/dashboard/home"}
        className="text-2xl font-bold text-blue-600 dark:text-blue-400"
      >
        MyLogo
      </Link>

      {/* CENTER — Search Bar */}
      <div className="hidden sm:flex w-1/2 md:w-1/3 relative">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-500" />
      </div>

      {/* RIGHT — Profile + Theme Switch */}
      <div className="flex items-center gap-4">
        <Link to={"/dashboard/cart"}>
          <Badge badgeContent={currentUser?.cart.length} color="primary">
            <FaBoxOpen className="text-white text-2xl" />
          </Badge>
        </Link>

        <Link to={"/dashboard/orders"}>
          <FaShoppingCart className="text-white text-2xl" />
        </Link>

        {/* Theme Switch Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-xl text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Profile Image */}
        <Link to="./profile">
          <img
            src="asdasf"
            alt="Profile"
            className="w-7 h-7 bg-white rounded-full border-2 border-gray-300 dark:border-gray-700 object-cover cursor-pointer"
          />
        </Link>
      </div>
    </nav>
  );
}
