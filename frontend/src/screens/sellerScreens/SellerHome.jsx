import { useEffect } from "react";
import {
  FaBox,
  FaWarehouse,
  FaShoppingCart,
  FaUsers,
  FaCheckCircle,
  FaMoneyBill,
  FaTruck,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getDeliveryStatusForSeller,
  getTotalFilterForSeller,
} from "../../feature/seller.store";
import StatsCard from "../../components/StatsCard.jsx";
import HeaderSection from "../../components/HeaderSection.jsx";

export default function SellerHome() {
  const dispatch = useDispatch();
  const { currentUser, tokenDetails } = useSelector((state) => state.user);
  const { totalFilters, deliveryStatus } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getTotalFilterForSeller(tokenDetails));
    dispatch(getDeliveryStatusForSeller(tokenDetails));
  }, [tokenDetails]);

  return (
    <div className="">
      <HeaderSection
        title="Dashboard Overview"
        description="Monitor your business metrics and performance"
      />
      {/* Main */}
      <main className="">
        {/* ====== MAIN STATS CARDS ====== */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatsCard
              title="Total Products"
              value={currentUser.totalproductofseller}
              icon={<FaBox />}
              color="blue"
            />
            <StatsCard
              title="Total Stock"
              value={totalFilters.totalStockCount}
              icon={<FaWarehouse />}
              color="teal"
            />
            <StatsCard
              title="Total Orders"
              value={totalFilters.totalOrderCount}
              icon={<FaShoppingCart />}
              color="green"
            />
            <StatsCard
              title="Total Customers"
              value={totalFilters.totalCustomersCount}
              icon={<FaUsers />}
              color="purple"
            />
            <StatsCard
              title="Items Sold"
              value={currentUser.totalproductsselled}
              icon={<FaCheckCircle />}
              color="orange"
            />
            <StatsCard
              title="Total Revenue"
              value={`$ ${currentUser.totalproductsselledamount.toLocaleString()}`}
              icon={<FaMoneyBill />}
              color="yellow"
            />
          </div>
        </section>

        {/* ====== ORDER STATUS CARDS ====== */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Order Status</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <StatsCard
              title="Pending"
              value={deliveryStatus.pending}
              icon={<FaHourglassHalf />}
              color="yellow"
            />
            <StatsCard
              title="Processing"
              value={deliveryStatus.processing}
              icon={<FaBox />}
              color="blue"
            />
            <StatsCard
              title="Shipping"
              value={deliveryStatus.shipping}
              icon={<FaTruck />}
              color="indigo"
            />
            <StatsCard
              title="Delivered"
              value={deliveryStatus.delivered}
              icon={<FaCheckCircle />}
              color="green"
            />
            <StatsCard
              title="Cancelled"
              value={deliveryStatus.cancled}
              icon={<FaTimesCircle />}
              color="red"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

/* ===== Reusable Card Component ===== */
function Card({ icon, title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
      {icon}
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-xl font-semibold">{value}</h2>
      </div>
    </div>
  );
}
