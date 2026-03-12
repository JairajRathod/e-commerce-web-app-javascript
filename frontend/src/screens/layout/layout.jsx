import { Outlet } from "react-router-dom";
import {
  SellerDetailsForAdmin,
  SellerTile,
  UserDetailsForAdmin,
} from "../../components/componentsExport";

export default function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
