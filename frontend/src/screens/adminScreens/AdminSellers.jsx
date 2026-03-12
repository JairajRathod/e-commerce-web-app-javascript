import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSellerForAdmin,
  getAllProductsDetails,
  getAllSellersData,
} from "../../feature/admin.store";
import HeaderSection from "../../components/HeaderSection.jsx";
import StatsCard from "../../components/StatsCard.jsx";
import {
  DollarSign,
  Package2,
  PackageOpen,
  ShoppingBag,
  Users,
} from "lucide-react";
import { CountColumn, NameColumn } from "./components/TableFields.jsx";
import SearchBar from "./components/SearchBar.jsx";

export default function AdminSeller() {
  const dispatch = useDispatch();
  const { allSellers } = useSelector((state) => state.admin);
  const { tokenDetails } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  const tableHeaderText = [
    "S.No",
    "Name",
    "Products Count",
    "Selled Count",
    "Total Revenue",
    "",
  ];

  async function deleteSellerFunction(sellerid) {
    await dispatch(deleteSellerForAdmin({ token: tokenDetails, sellerid }));
    await dispatch(getAllSellersData());
  }

  function searchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  useEffect(() => {
    dispatch(getAllSellersData());
  }, []);

  const totalSallers = allSellers?.length || 0;
  const totalProductsSelled =
    allSellers?.reduce(
      (acc, seller) => acc + (seller.totalproductsselled || 0),
      0
    ) || 0;
  const totalProductsRevenue =
    allSellers?.reduce(
      (acc, seller) => acc + (seller.totalproductsselledamount || 0),
      0
    ) || 0;

  return (
    <div>
      {/* Header */}
      <HeaderSection
        title="Seller Management"
        description="Manage and monitor all registered Sellers"
      />
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          icon={<Users className="w-6 h-6" />}
          title="Total Sellers"
          value={totalSallers}
          color="blue"
        />
        <StatsCard
          icon={<ShoppingBag className="w-6 h-6" />}
          title="Total Selled Products"
          value={totalProductsSelled}
          color="purple"
        />
        <StatsCard
          icon={<DollarSign className="w-6 h-6" />}
          title="Total Revenue"
          value={`$ ${totalProductsRevenue.toLocaleString()}`}
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
              {allSellers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Users className="w-12 h-12 mb-3 opacity-50" />
                      <p className="text-lg font-medium">No Seller found</p>
                      <p className="text-sm">
                        Try adjusting your search criteria
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                allSellers.map((seller, index) => (
                  <SellerTableRow
                    key={seller._id}
                    sno={index + 1}
                    id={seller._id}
                    name={seller.fullname}
                    totalProductCount={seller.totalproductofseller}
                    totalSelledCount={seller.totalproductsselled}
                    totalSellRevenue={seller.totalproductsselledamount}
                    onClickFunction={() => {
                      deleteSellerFunction(seller._id);
                    }}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SellerTableRow({
  sno,
  id,
  name = "",
  totalProductCount = 0,
  totalSelledCount = 0,
  totalSellRevenue = 0,
  onClickFunction = () => {},
}) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 text-sm text-gray-700">{sno}</td>
      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
        <NameColumn name={name} />
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">
        <CountColumn
          color="blue"
          icon={<ShoppingBag className="w-3 h-3 mr-1" />}
          value={totalProductCount}
        />
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">
        <CountColumn
          color="purple"
          icon={<Package2 className="w-3 h-3 mr-1" />}
          value={totalSelledCount}
        />
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">
        <CountColumn
          color="green"
          icon={<DollarSign className="w-3 h-3 mr-1" />}
          value={totalSellRevenue.toLocaleString()}
        />
      </td>
      <td className="px-6 py-4 text-center">
        <button
          onClick={onClickFunction}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition duration-200"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
