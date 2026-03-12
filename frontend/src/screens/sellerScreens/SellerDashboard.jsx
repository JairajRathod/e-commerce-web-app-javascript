import { Outlet } from "react-router-dom";
import SideNavifation from "../../components/navbar/SideNavigation";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { FaBoxOpen, FaUsers } from "react-icons/fa6";
import { RiProfileFill } from "react-icons/ri";

export default function SellerDashboard() {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/seller-dashboard/home",
    },
    {
      name: "Products",
      icon: <FaBoxOpen />,
      path: "/seller-dashboard/products",
    },
    {
      name: "Orders",
      icon: <FaShoppingCart />,
      path: "/seller-dashboard/orders",
    },
    {
      name: "Profile",
      icon: <RiProfileFill />,
      path: "/seller-dashboard/profile",
    },
  ];
  return (
    <div className="flex">
      <SideNavifation sideMenuHeading="Seller" sideMenuItems={menuItems} />
      <div className="ml-64 flex-1 bg-gray-100 min-h-screen p-6">
        <Outlet />
      </div>
    </div>
  );
}
