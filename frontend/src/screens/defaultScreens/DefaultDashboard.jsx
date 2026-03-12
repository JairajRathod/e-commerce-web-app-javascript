import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsData } from "../../feature/products.store";
import NewProductCard from "../../components/cards/NewProductCard";
import { Outlet } from "react-router-dom";
import { TopNavigation } from "../../components/componentsExport";

export default function DefaultDashboard() {
  return (
    <div>
      <TopNavigation />
      <Outlet />
    </div>
  );
}
