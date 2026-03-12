import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCustomerCart } from "../../feature/customer.store";
import { tokenVerfication } from "../../feature/users.store";
import { useNavigate } from "react-router-dom";

export default function FullProductDetails({ id, productDetails }) {
  const { name, description, price, stock, color, brand, rating, image } =
    productDetails;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  async function addToCardFunction() {
    console.log("Add to Cart Function Running");
    await dispatch(
      addToCustomerCart({ userId: currentUser._id, productId: id })
    );
    await dispatch(tokenVerfication());
    navigate("/dashboard/cart");
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl mx-auto hover:shadow-xl transition">
      {/* Desktop Flex Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="w-full md:w-1/2 h-60 md:h-80 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
          <img
            src={image || "hjkh"}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 space-y-4">
          {/* Name */}
          <h2 className="text-2xl font-bold text-gray-900">{name}</h2>

          {/* Brand & Color */}
          <div className="flex justify-between text-sm text-gray-700">
            <p>
              <strong>Brand:</strong> {brand}
            </p>
            <p>
              <strong>Color:</strong> {color}
            </p>
          </div>

          {/* Price & Rating */}
          <div className="flex justify-between items-center">
            <span className="text-2xl font-semibold text-blue-600">
              ${price}
            </span>

            <div className="flex items-center gap-1 text-yellow-500">
              <FaStar />
              <span className="text-sm text-gray-700">{rating}</span>
            </div>
          </div>

          {/* Stock */}
          <p
            className={`text-sm font-medium ${
              stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
          </p>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">{description}</p>

          {/* Buttons */}
          <div className="flex gap-4 pt-3">
            {/* Add to Cart */}
            <button
              onClick={addToCardFunction}
              className={`w-1/2 py-2 rounded-lg text-white text-lg transition
                ${
                  stock === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              Add to Cart
            </button>

            {/* Buy Now */}
            <button
              disabled={stock === 0}
              onClick={() => {
                navigate(`/dashboard/buynow`);
              }}
              className={`w-1/2 py-2 rounded-lg text-white text-lg transition
                ${
                  stock === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
