import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProductsDetails,
} from "../../feature/admin.store";
import { FaArrowTrendUp, FaBoxArchive, FaBoxOpen } from "react-icons/fa6";
import { HiCurrencyDollar } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import HighDetailCard from "../../components/HighDetailCard";
import StatsCard from "../../components/StatsCard.jsx";
import HeaderSection from "../../components/HeaderSection";
import SearchBar from "./components/SearchBar";
import {
  CountColumn,
  DeleteButton,
  NameColumn,
} from "./components/TableFields";
import { DollarSign, Package2, ShoppingBag, Users } from "lucide-react";
import EmptyTable from "../../components/EmptyTable.jsx";

export default function AdminProducts() {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");

  const tableHeaderText = [
    "S.No",
    "Product Name",
    "Current Stock",
    "Sold",
    "Price",
    "",
  ];

  function searchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  useEffect(() => {
    dispatch(getAllProductsDetails());
  }, []);

  async function deleteProductFunction(id) {
    await dispatch(deleteProduct(id));
    await dispatch(getAllProductsDetails());
  }

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <HeaderSection
          title="Products Management"
          description="Manage your product inventory and sales"
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Products"
            value={allProducts.length}
            icon={<FaBoxArchive className="w-6 h-6 text-white-600" />}
            color="blue"
          />
          <StatsCard
            title="Total Sold"
            value={allProducts.reduce(
              (sum, p) => sum + (p.totalSelled || 0),
              0
            )}
            icon={<FaArrowTrendUp className="w-6 h-6 text-white-600" />}
            color="purple"
          />
          <StatsCard
            title="In Stock"
            value={allProducts.filter((p) => p.stock > 0).length}
            icon={<SiTicktick className="w-6 h-6 text-white-600" />}
            color="green"
          />
        </div>

        {/* Search Bar  */}
        <SearchBar searchTerm={searchTerm} onChange={searchTermChange} />

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
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
                {allProducts.length === 0 ? (
                  <tr>
                    <EmptyTable heading="No Product found" />
                  </tr>
                ) : (
                  allProducts.map((product, index) => (
                    <ProductTableRow
                      key={product._id}
                      sno={index + 1}
                      id={product._id}
                      name={product.name}
                      price={product.price}
                      stock={product.stock}
                      totalSold={product.totalSelled}
                      onClick={() => {
                        deleteProductFunction(product._id);
                      }}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductTableRow({
  sno,
  id,
  name = "",
  price = "",
  stock = "",
  totalSold = "",
  onClick = () => {},
}) {
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
          value={stock}
        />
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">
        <CountColumn
          color="blue"
          icon={<ShoppingBag className="w-3 h-3 mr-1" />}
          value={totalSold}
        />
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">
        <CountColumn
          color="green"
          icon={<DollarSign className="w-3 h-3 mr-1" />}
          value={price.toLocaleString()}
        />
      </td>
      <td className="px-6 py-4 text-center">
        <DeleteButton onClick={onClick} />
      </td>
    </tr>
  );
}
