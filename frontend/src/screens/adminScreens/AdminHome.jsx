import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart, FaDollarSign, FaBoxOpen } from "react-icons/fa";

import { StatsCard } from "../../components/componentsExport";
import { useEffect } from "react";
import {
  getAllSellersData,
  getAllUsersData,
  getFilterDetails,
  getTopSellerData,
  getTopUsersData,
} from "../../feature/admin.store";
import UserListTile from "./components/UserListTile";
import SellerListTile from "./components/SellerListTile";

export default function AdminHome() {
  const dispatch = useDispatch();
  const { allUsers, allSellers, allFilterData, topUsers, topSeller } =
    useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllUsersData());
    dispatch(getAllSellersData());
    dispatch(getFilterDetails());
    dispatch(getTopUsersData());
    dispatch(getTopSellerData());
    console.log("this is running");
  }, []);

  return (
    <div className="">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">
            Monitor your business metrics and performance
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard
            title="Total Order Count"
            value={allFilterData?.totalordersold || 0}
            icon={<FaShoppingCart />}
            color="blue"
          />
          <StatsCard
            title="Total Products"
            value={allFilterData?.totalproductcount || 0}
            icon={<FaBoxOpen />}
            color="purple"
          />
          <StatsCard
            title="Total Revenue"
            value={`$${(+allFilterData?.totalorderrevenue || 0).toFixed(2)}`}
            icon={<FaDollarSign />}
            color="green"
          />
        </div>

        {/* Details Sections */}
        <div className="">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 transition-all hover:shadow-x">
              <h1 className="text-3xl font-bold">Top Buyers</h1>
              <hr className="my-3" />
              <UserListTile data={topUsers} />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl">
              <h1 className="text-3xl font-bold">Top Sellers</h1>
              <hr className="my-3" />
              <SellerListTile data={topSeller} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
