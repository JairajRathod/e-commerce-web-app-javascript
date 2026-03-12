import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Popup } from "../../components/componentsExport";
import InputFieldSecond from "../../components/inputs/InputFieldSecond";
import { addCustomerOrder } from "../../feature/order.store";
import { useNavigate } from "react-router-dom";
import { removeToCustomerCart } from "../../feature/customer.store";

export default function OrderScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentProductDetails } = useSelector((state) => state.product);
  const { currentUser, tokenDetails } = useSelector((state) => state.user);
  const [qty, setQty] = useState(1);
  const [isOpen, setIsOpen] = useState();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [addressDetails, setAddressDetails] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  function increaseQty() {
    if (qty < currentProductDetails.stock) {
      setQty(qty + 1);
    }
  }

  function decreaseQty() {
    if (qty > 1) {
      setQty(qty - 1);
    }
  }

  function onSubmitAction(event) {
    event.preventDefault();
    setIsOpen(false);
  }

  const subTotal = currentProductDetails.price * qty;
  const gst = subTotal * 0.06;
  const total = subTotal + gst;

  async function buyButton() {
    await dispatch(
      addCustomerOrder({
        token: tokenDetails,
        productId: currentProductDetails._id,
        quantity: qty,
        subtotal: subTotal,
        total,
        address: addressDetails,
        paymenttype: paymentMethod,
      })
    );

    navigate("/dashboard/home");
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Buy Now</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-5 border rounded-lg shadow space-y-5">
            <div className="flex gap-5">
              <img
                src={currentProductDetails.image}
                alt={currentProductDetails.name}
                className="w-28 h-28 object-cover rounded"
              />

              <div className="flex flex-col justify-between">
                <h2 className="text-xl font-semibold">
                  {currentProductDetails.name}
                </h2>

                <p className="text-gray-600">
                  Brand: {currentProductDetails.brand}
                </p>
                <p className="text-gray-600">
                  Color: {currentProductDetails.color}
                </p>

                <p className="text-lg font-semibold text-green-600">
                  ${currentProductDetails.price}
                </p>

                {currentProductDetails.stock ? (
                  <span className="text-sm text-green-600 font-medium">
                    In Stock {currentProductDetails.stock}
                  </span>
                ) : (
                  <span className="text-sm text-red-600 font-medium">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>

              <div className="flex items-center space-x-4">
                <button
                  onClick={decreaseQty}
                  className="bg-gray-300 px-3 py-1 rounded text-xl font-bold hover:bg-gray-400"
                >
                  −
                </button>

                <span className="text-xl font-semibold">{qty}</span>

                <button
                  onClick={increaseQty}
                  className="bg-gray-300 px-3 py-1 rounded text-xl font-bold hover:bg-gray-400"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="p-5 border rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Delivery Address</h3>
            <div className="space-y-3">
              <button onClick={() => setIsOpen(true)}>Add Address</button>
              <div className="space-y-1 text-gray-700">
                <p>
                  <span className="font-medium">Street:</span>{" "}
                  {addressDetails.street}
                </p>
                <p>
                  <span className="font-medium">City:</span>{" "}
                  {addressDetails.city}
                </p>
                <p>
                  <span className="font-medium">State:</span>{" "}
                  {addressDetails.state}
                </p>
                <p>
                  <span className="font-medium">Zipcode:</span>{" "}
                  {addressDetails.zipcode}
                </p>
                <p>
                  <span className="font-medium">Country:</span>{" "}
                  {addressDetails.country}
                </p>
              </div>
            </div>
            <AddressPopup
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onSubmitAction={onSubmitAction}
              product={addressDetails}
              setProduct={setAddressDetails}
            />
          </div>

          {/* Payment Method */}
          <PaymentSection
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </div>

        {/* RIGHT SIDE — ORDER SUMMARY */}
        <div className="p-5 border rounded-lg shadow h-fit">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

          <div className="space-y-2">
            <OrderSummery
              title="Product Price"
              value={`${subTotal.toFixed(2)}`}
            />
            <OrderSummery title="Quantity" value={qty} />
            <OrderSummery title="GST (6%)" value={`${gst.toFixed(2)}`} />
            <OrderSummery title="Delivery Charge" value="Free" />

            <div className="border-t my-3"></div>

            <div className="flex justify-between text-xl font-bold text-gray-900">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={() => {
              buyButton();
            }}
            disabled={
              currentProductDetails.stock <= 0 || addressDetails.street === ""
            }
            className={`mt-6 w-full py-3 text-white text-lg font-medium rounded-md shadow
              ${
                currentProductDetails.stock && addressDetails.street !== ""
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-gray-400 cursor-not-allowed"
              }
            `}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

function OrderSummery({ title = "", value = "" }) {
  return (
    <div className="flex justify-between text-gray-700">
      <span>{title} :</span>
      <span className="text-green-600">{value}</span>
    </div>
  );
}

function AddressPopup({
  isOpen,
  setIsOpen,
  onSubmitAction,
  product,
  setProduct,
}) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title={"Add Product"}
    >
      <form action="" onSubmit={onSubmitAction}>
        <InputFieldSecond
          label="Street"
          name="street"
          type="text"
          defaultValue={product.street}
          placeholderText={"Enter Street"}
          required={true}
          disable={false}
          updaterFunction={(event) => {
            setProduct((prev) => ({ ...prev, street: event.target.value }));
          }}
        />
        <InputFieldSecond
          label="City"
          name="city"
          type="text"
          defaultValue={product.city}
          placeholderText={"Enter City"}
          required={true}
          disable={false}
          updaterFunction={(event) => {
            setProduct((prev) => ({ ...prev, city: event.target.value }));
          }}
        />
        <InputFieldSecond
          label="State"
          name="state"
          type="text"
          defaultValue={product.state}
          placeholderText={"Enter State"}
          required={true}
          disable={false}
          updaterFunction={(event) => {
            setProduct((prev) => ({ ...prev, state: event.target.value }));
          }}
        />
        <InputFieldSecond
          label="Zipcode"
          name="zipcode"
          type="text"
          defaultValue={product.zipcode}
          placeholderText={"Enter Zipcode"}
          required={true}
          disable={false}
          updaterFunction={(event) => {
            setProduct((prev) => ({ ...prev, zipcode: event.target.value }));
          }}
        />
        <InputFieldSecond
          label="Country"
          name="country"
          type="text"
          defaultValue={product.country}
          placeholderText={"Enter Country"}
          required={true}
          disable={false}
          updaterFunction={(event) => {
            setProduct((prev) => ({ ...prev, country: event.target.value }));
          }}
        />
        <button
          type="submit"
          className=" w-fit bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg transition"
        >
          submit
        </button>
      </form>
    </Popup>
  );
}

function PaymentSection({ paymentMethod, setPaymentMethod }) {
  return (
    <div className="p-5 border rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Payment Method</h3>

      {/* COD */}
      <label className="flex items-center gap-2 cursor-pointer mb-2">
        <input
          type="radio"
          name="payment"
          value="COD"
          className="h-4 w-4"
          checked={paymentMethod === "COD"}
          onChange={() => setPaymentMethod("COD")}
        />
        <span>Cash on Delivery (COD)</span>
      </label>

      {/* UPI */}
      <label className="flex items-center gap-2 cursor-pointer mb-2">
        <input
          type="radio"
          name="payment"
          value="UPI"
          className="h-4 w-4"
          checked={paymentMethod === "UPI"}
          onChange={() => setPaymentMethod("UPI")}
        />
        <span>UPI</span>
      </label>

      {/* Card Payment */}
      <label className="flex items-center gap-2 cursor-pointer mb-2">
        <input
          type="radio"
          name="payment"
          value="CARD"
          className="h-4 w-4"
          checked={paymentMethod === "CARD"}
          onChange={() => setPaymentMethod("CARD")}
        />
        <span>Credit / Debit Card</span>
      </label>

      {/* Net Banking */}
      <label className="flex items-center gap-2 cursor-pointer mb-2">
        <input
          type="radio"
          name="payment"
          value="NETBANKING"
          className="h-4 w-4"
          checked={paymentMethod === "NETBANKING"}
          onChange={() => setPaymentMethod("NETBANKING")}
        />
        <span>Net Banking</span>
      </label>

      {/* Wallet */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="payment"
          value="WALLET"
          className="h-4 w-4"
          checked={paymentMethod === "WALLET"}
          onChange={() => setPaymentMethod("WALLET")}
        />
        <span>Wallet (Paytm, PhonePe, etc.)</span>
      </label>
    </div>
  );
}
