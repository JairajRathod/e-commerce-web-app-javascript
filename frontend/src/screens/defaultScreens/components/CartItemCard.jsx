import { FaShoppingCart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function CartItemCard({
  sno,
  productId,
  name,
  price,
  brand,
  stock,
  color,
  onClickBuy,
  onClickDelete,
}) {
  return (
    <div className="w-full bg-white rounded-xl shadow-md border border-slate-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="">
        {/* Product Details Section */}
        <div className="flex flex-col p-6">
          <div className="flex flex-row items-start justify-between mb-4">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{name}</h3>
              <div className="flex flex-wrap items-center gap-3">
                {stock > 0 ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                    In Stock ({stock} available)
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-1.5"></span>
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Price Section */}
            <div className="text-left md:text-right">
              <p className="text-sm text-slate-500 mb-1">Price</p>
              <p className="text-3xl font-bold text-indigo-600">${price}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row justify-start gap-3">
            <BuyButton onClick={onClickBuy} stock={stock} />
            <DeleteButton onClick={onClickDelete} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BuyButton({ onClick = () => {}, stock = 0 }) {
  return (
    <button
      onClick={onClick}
      disabled={stock === 0}
      className={`inline-flex items-center justify-center px-4 py-2 font-semibold rounded-xl text-[14px] shadow-md transition-all duration-200 ${
        stock === 0
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-gradient-to-r  from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:shadow-lg transform hover:scale-105 "
      }`}
    >
      <FaShoppingCart className="w-5 h-5 mr-2" />
      {stock === 0 ? "Out of Stock" : "Buy Now"}
    </button>
  );
}

function DeleteButton({ onClick = () => {} }) {
  return (
    <button
      onClick={onClick}
      className="sm:w-auto inline-flex text-[14px] items-center justify-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
    >
      <MdDelete fontSize={"20px"} className="mr-2" />
      Remove
    </button>
  );
}
