import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForSeller,
  updateOrderStatusForSeller,
} from "../../feature/seller.store";
import { useEffect, useState } from "react";
import { Dropdown } from "../../components/componentsExport";
import HighDetailCard from "../../components/HighDetailCard";
import HeaderSection from "../../components/HeaderSection";

export default function SellerOrders() {
  const dispatch = useDispatch();
  const { currentUser, tokenDetails } = useSelector((state) => state.user);
  const { allOrders } = useSelector((state) => state.seller);

  async function updateOrderStatus(orderid, status) {
    await dispatch(
      updateOrderStatusForSeller({ token: tokenDetails, orderid, status })
    );
    await dispatch(getAllOrdersForSeller(tokenDetails));
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
    console.log("Getting Orders");
    dispatch(getAllOrdersForSeller(tokenDetails));
  }, [currentUser]);

  return (
    <>
      {/* Head Section  */}
      <HeaderSection
        title="Order Management"
        description="Manage and monitor all orders"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              {tableHeaderText.map((text, index) => (
                <th
                  key={index + 1}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {text}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {allOrders &&
              allOrders.map((order, index) => (
                <SellerOrdersTableRow
                  key={order._id}
                  sno={index + 1}
                  id={order._id}
                  name={order.user.fullname}
                  totalAmount={order.totalamount}
                  quantity={order.products[0].quantity}
                  product={order.products[0].product.name}
                  status={order.status}
                  updateFunction={(event) => {
                    updateOrderStatus(order._id, event.target.value);
                  }}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function SellerOrdersTableRow({
  sno,
  id,
  name = "",
  product = "",
  quantity = "",
  totalAmount = "",
  status = "pending",
  updateFunction = () => {},
}) {
  const [deliveryStatus, setDeliveryStatus] = useState(status);
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
      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{name}</td>
      <td className="px-6 py-4 text-sm text-gray-700">
        {product.slice(0, 15)}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">{quantity}</td>
      <td className="px-6 py-4 text-sm text-gray-700">{totalAmount}</td>
      <td className="px-6 py-4 text-center">
        <Dropdown
          name="orderstatus"
          defaultValue={deliveryStatus}
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
