import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerOrders } from "../../feature/customer.store";
import OrderItemCard from "./components/OrderItemCard";
import PageHeader from "./components/PageHeader";
import EmptyCard from "../../components/empty/EmptyCard";
import { FaCartShopping } from "react-icons/fa6";

export default function ProfileOrders() {
  const dispatch = useDispatch();
  const { allOrders = [] } = useSelector((state) => state.customer);
  const { tokenDetails, currentUser } = useSelector((state) => state.user);
  const [totalOrderAmount, setTotalOrderAmount] = useState(0);

  useEffect(() => {
    dispatch(getCustomerOrders(tokenDetails));
  }, []);

  useEffect(() => {
    const amount = allOrders.reduce((acc, order) => {
      return acc + order?.totalamount;
    }, 0);
    setTotalOrderAmount(amount.toFixed(2));
    console.log(allOrders);
  }, [allOrders]);

  return (
    <div className=" p-5">
      {/* Header Section */}
      {allOrders.length ? (
        <PageHeader
          title="Order Cart"
          value={allOrders?.length || 0}
          valuePrefixText="items in your orders"
          totalAmountValue={totalOrderAmount}
        />
      ) : (
        <div></div>
      )}
      <div
        className={`${
          allOrders.length
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
            : ""
        } `}
      >
        {allOrders && allOrders.length ? (
          allOrders.map((order) => (
            <OrderItemCard
              name={order?.products[0]?.product?.name}
              orderQuantity={order?.products[0]?.quantity}
              basePrice={order?.products[0]?.price}
              totalPrice={order?.totalamount}
              deleveryStatus={order?.status}
            />
          ))
        ) : (
          <EmptyCard
            title="Not Ordered Yet"
            description="Buy some products to get started!"
            icon={<FaCartShopping className="w-12 h-12" />}
          />
        )}
      </div>
    </div>
  );
}
