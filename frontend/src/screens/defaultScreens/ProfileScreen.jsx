import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SideNavifation from "../../components/navbar/SideNavigation";
import { RiProfileFill } from "react-icons/ri";
import { FaBoxOpen } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";

export default function ProfileScreen() {
  const sideNavigationMenuItems = [
    {
      name: "Profile",
      icon: <RiProfileFill />,
      path: "/dashboard/profile/details",
    },
    {
      name: "Cart",
      icon: <FaBoxOpen />,
      path: "/dashboard/profile/cart",
    },
    {
      name: "Orders",
      icon: <FaShoppingCart />,
      path: "/dashboard/profile/orders",
    },
  ];

  return (
    <div className="flex flex-row">
      <div>
        <SideNavifation
          sideMenuItems={sideNavigationMenuItems}
          sideMenuHeading="Details Dashboard"
        />
      </div>
      <div className="ml-64 flex-1 bg-gray-100 min-h-screen p-6">
        <Outlet />
      </div>
    </div>
  );
}
