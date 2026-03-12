import { Link } from "react-router-dom";

export default function NewProductCard({
  name = "",
  stock = 0,
  price = 0,
  id = "",
}) {
  return (
    <Link
      to={`../details/${id}`}
      className="w-full bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <img
        className="w-full h-48 object-cover bg-gray-300"
        src="asf"
        alt="Product Image"
      />

      {/* <!-- Card Content --> */}
      <div className="p-4">
        {/* <!-- Product Name --> */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {name.slice(0, 15)}...
        </h2>

        {/* <!-- Price --> */}
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">${price}</p>

          {/* <!-- Stock Status --> */}
          <span
            className={`px-3 py-1 text-sm rounded-full 
         font-medium ${
           stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
         }`}
          >
            {stock}
          </span>
        </div>
      </div>
    </Link>
  );
}
