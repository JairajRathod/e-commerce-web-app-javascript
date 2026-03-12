import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerCartData,
  removeToCustomerCart,
} from "../../feature/customer.store";
import { MdDelete } from "react-icons/md";
import { getCurrentProductDetails } from "../../feature/products.store";
import { tokenVerfication } from "../../feature/users.store";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import EmptyCart from "./components/EmptyCart";
import CartItemCard from "./components/CartItemCard";
import PageHeader from "./components/PageHeader";
import EmptyCard from "../../components/empty/EmptyCard";
import { FaBoxOpen } from "react-icons/fa6";

export default function ProfileCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, tokenDetails } = useSelector((state) => state.user);
  const { allCartItems } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getCustomerCartData(currentUser._id));
  }, [currentUser]);

  async function buyButton(productId) {
    await dispatch(getCurrentProductDetails(productId));
    navigate("/dashboard/buynow");
  }

  async function deleteButton(productId) {
    await dispatch(
      removeToCustomerCart({
        token: tokenDetails,
        productId,
      })
    );
    await dispatch(tokenVerfication());
  }

  // Calculate total
  const totalAmount =
    allCartItems?.reduce((sum, item) => sum + (item.product.price || 0), 0) ||
    0;

  return (
    <div className=" p-5">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <PageHeader
          title="Shopping Cart"
          value={allCartItems?.length || 0}
          valuePrefixText="items in your cart"
          totalAmountValue={totalAmount}
        />

        {/* Cart Items */}
        {allCartItems && allCartItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {allCartItems.map((product, index) => (
              <CartItemCard
                key={product.product._id}
                sno={index + 1}
                productId={product.product._id}
                name={product.product.name}
                color={product.product.color}
                price={product.product.price}
                stock={product.product.stock}
                brand={product.product.brand}
                onClickBuy={() => buyButton(product.product._id)}
                onClickDelete={() => deleteButton(product.product._id)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            title="Your cart is empty"
            description="Add some products to get started!"
            icon={<FaBoxOpen className="w-12 h-12" />}
            buttonExist={true}
            buttonIcon=""
            buttonText="Continue Shoping"
            buttonUrl="/dashboard/home"
          />
        )}
      </div>
    </div>
  );
}
