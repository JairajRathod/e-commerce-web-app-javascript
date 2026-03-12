import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AdminDashboard,
  AdminOrders,
  AdminProducts,
  AdminUsers,
} from "../screens/screenExport";

export default function adminRoutes() {
  return (
    <Route path="/admin-dashboard/" element={<AdminDashboard />}>
      <Route path="products" element={<AdminProducts />} />
      <Route path="orders" element={<AdminOrders />} />
      <Route path="users" element={<AdminUsers />} />
    </Route>
  );
}
