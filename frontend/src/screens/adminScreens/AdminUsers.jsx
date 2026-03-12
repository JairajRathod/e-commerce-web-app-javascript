import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Users, ShoppingBag, DollarSign, Search } from "lucide-react";
import { deleteUserForAdmin, getAllUsersData } from "../../feature/admin.store";
import HeaderSection from "../../components/HeaderSection.jsx";
import StatsCard from "../../components/StatsCard.jsx";
import { NameColumn } from "./components/TableFields.jsx";
import { CountColumn } from "./components/TableFields.jsx";
import { DeleteButton } from "./components/TableFields.jsx";
import Spinner from "../../components/Spinner.jsx";

export default function AdminUsers() {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.admin);
  const { tokenDetails } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const tableHeaderText = [
    "S.No",
    "Name",
    "Orders Count",
    "Orders Amount",
    "Actions",
  ];

  useEffect(() => {
    dispatch(getAllUsersData());
  }, []);

  async function deleteUserFunction(userid) {
    await dispatch(deleteUserForAdmin({ token: tokenDetails, userid }));
    await dispatch(getAllUsersData());
    setDeleteConfirm(null);
  }

  const filteredUsers =
    allUsers?.filter((user) =>
      user.fullname?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const totalUsers = allUsers?.length || 0;
  const totalOrders =
    allUsers?.reduce((sum, user) => sum + (user.totalorders || 0), 0) || 0;
  const totalRevenue =
    allUsers?.reduce((sum, user) => sum + (user.totalorderamount || 0), 0) || 0;

  return (
    <div className="max-w-7xl mx-auto">
      {!allUsers ? (
        <Spinner />
      ) : (
        <div>
          {/* Header */}
          <HeaderSection
            title="User Management"
            description="Manage and monitor all registered users"
          />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              icon={<Users className="w-6 h-6" />}
              title="Total Users"
              value={totalUsers}
              color="blue"
            />
            <StatsCard
              icon={<ShoppingBag className="w-6 h-6" />}
              title="Product Buyed Count"
              value={totalOrders}
              color="purple"
            />
            <StatsCard
              icon={<DollarSign className="w-6 h-6" />}
              title="Total Revenue"
              value={`$ ${totalRevenue.toLocaleString()}`}
              color="green"
            />
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full outline-none pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm"
              />
            </div>
          </div>

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
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <Users className="w-12 h-12 mb-3 opacity-50" />
                          <p className="text-lg font-medium">No users found</p>
                          <p className="text-sm">
                            Try adjusting your search criteria
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user, index) => (
                      <UsersTableRow
                        key={user._id}
                        sno={index + 1}
                        id={user._id}
                        name={user.fullname}
                        totalOrderAmount={user.totalorderamount}
                        totalOrders={user.totalorders}
                        onclickFunction={() => setDeleteConfirm(user._id)}
                        deleteConfirm={deleteConfirm}
                        confirmDelete={() => deleteUserFunction(user._id)}
                        cancelDelete={() => setDeleteConfirm(null)}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function UsersTableRow({
  sno,
  name = "",
  totalOrderAmount = 0,
  totalOrders = 0,
  confirmDelete,
}) {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className="px-6 py-4 text-sm font-medium text-gray-500">{sno}</td>
      <td className="px-6 py-4">
        <NameColumn name={name} />
      </td>
      <td className="px-6 py-4">
        <CountColumn
          color="purple"
          icon={<ShoppingBag className="w-3 h-3 mr-1" />}
          value={totalOrders}
        />
      </td>
      <td className="px-6 py-4">
        <CountColumn
          color="green"
          icon={<DollarSign className="w-3 h-3 mr-1" />}
          value={totalOrderAmount.toLocaleString()}
        />
      </td>
      <td className="px-6 py-4">
        <DeleteButton onClick={confirmDelete} />
      </td>
    </tr>
  );
}
