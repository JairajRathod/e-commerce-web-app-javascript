export default function OrderItemCard({
  name = "",
  orderQuantity = 0,
  basePrice = 0,
  totalPrice = 0,
  deleveryStatus = "",
}) {
  return (
    <div className="w-full bg-white rounded-xl shadow-md border border-slate-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="">
        {/* Product Details Section */}
        <div className="flex flex-col p-6">
          <div className="flex flex-row items-start justify-between">
            <div className="">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{name}</h3>
              <div className="flex flex-col items-center gap-3">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                  Ordered Quantity : {orderQuantity}
                </div>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-1.5"></span>
                  Base Price : {basePrice}
                </div>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1.5"></span>
                  Delevery Status : {deleveryStatus}
                </div>
              </div>
            </div>

            {/* Price Section */}
            <div className="text-left md:text-right">
              <p className="text-sm text-slate-500 mb-1">Total Price</p>
              <p className="text-xl font-bold text-indigo-600">${totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
