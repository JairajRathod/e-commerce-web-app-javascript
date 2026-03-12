import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersDetails } from "../../feature/admin.store";
import { Dropdown } from "../../components/componentsExport";
import { updateOrderStatusForSeller } from "../../feature/seller.store";
import { DollarSign, Package2, ShoppingBag, Users } from "lucide-react";
import HeaderSection from "../../components/HeaderSection";
import StatsCard from "../../components/StatsCard.jsx";

import SearchBar from "./components/SearchBar";
import { CountColumn, NameColumn } from "./components/TableFields";
import EmptyTable from "../../components/EmptyTable.jsx";

export default function AdminOrders() {
  const dispatch = useDispatch();
  const { currentUser, tokenDetails } = useSelector((state) => state.user);
  const { allOrders } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");

  async function updateOrderStatus(orderid, status) {
    await dispatch(
      updateOrderStatusForSeller({ token: tokenDetails, orderid, status })
    );
    await dispatch(getAllOrdersDetails());
  }

  function searchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  const tableHeaderText = [
    "S.No",
    "Buyer Name",
    "Product",
    "Quantity",
    "Total Amount",
    "",
  ];

  useEffect(() => {
    dispatch(getAllOrdersDetails());
  }, []);

  const totalBuyers = allOrders?.length || 0;
  const totalQuantity =
    allOrders?.reduce(
      (sum, order) => sum + (order?.products[0]?.quantity || 0),
      0
    ) || 0;
  const totalRevenueAmount =
    allOrders?.reduce((sum, order) => sum + (order?.totalamount || 0), 0) || 0;

  return (
    <>
      {/* Header */}
      <HeaderSection
        title="Orders Management"
        description="Manage and monitor all orders"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          icon={<Users className="w-6 h-6" />}
          title="Order Count"
          value={totalBuyers}
          color="blue"
        />
        <StatsCard
          icon={<ShoppingBag className="w-6 h-6" />}
          title="Buyed Product Count"
          value={totalQuantity}
          color="purple"
        />
        <StatsCard
          icon={<DollarSign className="w-6 h-6" />}
          title="Total Revenue"
          value={`$ ${totalRevenueAmount.toLocaleString()}`}
          color="green"
        />
      </div>

      {/* Search Bar  */}
      <SearchBar searchTerm={searchTerm} onChange={searchTermChange} />

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-linear-to-r from-gray-50 to-gray-100">
              <tr>
                {tableHeaderText.map((text, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {text}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {allOrders.length === 0 ? (
                <tr>
                  <EmptyTable heading="No Order Found" />
                </tr>
              ) : (
                allOrders.map((order, index) => (
                  <OrdersTableRow
                    key={order._id}
                    sno={index + 1}
                    id={order._id}
                    name={order.user.fullname}
                    totalAmount={order.totalamount}
                    quantity={order.products[0].quantity}
                    status={order.status}
                    product={order.products[0].product.name}
                    updateFunction={(event) => {
                      updateOrderStatus(order._id, event.target.value);
                    }}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function OrdersTableRow({
  sno,
  id,
  name = "",
  product = "",
  quantity = "",
  status = "pending",
  totalAmount = "",
  updateFunction = () => {},
}) {
  const deliveryValues = [
    "pending",
    "processing",
    "shipping",
    "delivered",
    "cancled",
  ];

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 text-sm text-gray-700">{sno}</td>
      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
        <NameColumn name={name} />
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">
        <CountColumn
          color="purple"
          icon={<Package2 className="w-3 h-3 mr-1" />}
          value={product.slice(0, 15)}
        />
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">
        <CountColumn
          color="blue"
          icon={<ShoppingBag className="w-3 h-3 mr-1" />}
          value={quantity}
        />
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">
        <CountColumn
          color="green"
          icon={<DollarSign className="w-3 h-3 mr-1" />}
          value={totalAmount.toLocaleString()}
        />
      </td>
      <td className="px-6 py-4 text-center">
        <Dropdown
          name="orderstatus"
          defaultValue={status}
          required={false}
          values={deliveryValues}
          updaterFunction={updateFunction}
          style={
            "bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-1.5 rounded-lg outline-none"
          }
        />
      </td>
    </tr>
  );
}
