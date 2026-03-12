import { FaHome, FaShoppingCart } from "react-icons/fa";
import SideNavifation from "../../components/navbar/SideNavigation";
import { Outlet } from "react-router-dom";
import { FaBoxOpen, FaUsers } from "react-icons/fa6";
import { RiProfileFill } from "react-icons/ri";

export default function AdminDashboard() {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/admin-dashboard/home",
    },
    {
      name: "Products",
      icon: <FaBoxOpen />,
      path: "/admin-dashboard/products",
    },
    {
      name: "Orders",
      icon: <FaShoppingCart />,
      path: "/admin-dashboard/orders",
    },
    {
      name: "Users",
      icon: <FaUsers />,
      path: "/admin-dashboard/users",
    },
    {
      name: "Sellers",
      icon: <FaUsers />,
      path: "/admin-dashboard/sellers",
    },
    {
      name: "Profile",
      icon: <RiProfileFill />,
      path: "/admin-dashboard/profile",
    },
  ];

  return (
    <div className="flex">
      <SideNavifation sideMenuHeading="Admin" sideMenuItems={menuItems} />
      <main className="ml-64 flex-1 min-h-screen p-6">
        <Outlet />
      </main>
    </div>
  );
}
