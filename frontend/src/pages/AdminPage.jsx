import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Aside from "../components/Aside";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredWithdrawals, setFilteredWithdrawals] = useState([]);
  const [filteredDeposits, setFilteredDeposits] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  // Fetch data from the server
  const fetchData = async (endpoint, setData) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000${endpoint}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setData(data);
      // Initialize filtered data
      if (endpoint === "/admin/users/") {
        setFilteredUsers(data);
      } else if (endpoint === "/admin/withdrawals/") {
        setFilteredWithdrawals(data);
      } else if (endpoint === "/admin/deposits/") {
        setFilteredDeposits(data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData("/admin/users/", setUsers);
    fetchData("/admin/withdrawals/", setWithdrawals);
    fetchData("/admin/deposits/", setDeposits);
  }, []);

  // Handle search and filter
  useEffect(() => {
    const filteredUsers = users.filter((user) => {
      const name = user.name ? user.name.toLowerCase() : "";
      const phone = user.phone_number ? user.phone_number.toLowerCase() : "";
      return (
        name.includes(searchTerm.toLowerCase()) ||
        phone.includes(searchTerm.toLowerCase())
      );
    });
    setFilteredUsers(filteredUsers);

    const filteredWithdrawals = withdrawals.filter((withdrawal) => {
      const userId = withdrawal.user_id ? withdrawal.user_id.toString() : "";
      return userId.includes(searchTerm);
    });
    setFilteredWithdrawals(filteredWithdrawals);

    const filteredDeposits = deposits.filter((deposit) => {
      const userId = deposit.user_id ? deposit.user_id.toString() : "";
      const currency = deposit.currency ? deposit.currency.toLowerCase() : "";
      return (
        userId.includes(searchTerm) ||
        currency.includes(searchTerm.toLowerCase())
      );
    });
    setFilteredDeposits(filteredDeposits);
  }, [searchTerm, users, withdrawals, deposits]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const currentWithdrawals = filteredWithdrawals.slice(indexOfFirstItem, indexOfLastItem);
  const currentDeposits = filteredDeposits.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="text-center py-8 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col bg-[#07051B] min-h-screen">
      <Navbar />
      <div className="flex flex-row">
        <Aside />
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-white mb-6">Admin Panel</h1>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search users, withdrawals, or deposits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 bg-[#0E0E1A] text-white rounded-lg border border-[#6C5DD3]"
            />
          </div>

          {/* Users Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Users</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-[#0E0E1A] rounded-lg">
                <thead>
                  <tr className="bg-[#1A1A3D]">
                    <th className="px-4 py-2 text-left text-white">ID</th>
                    <th className="px-4 py-2 text-left text-white">Phone</th>
                    <th className="px-4 py-2 text-left text-white">Name</th>
                    <th className="px-4 py-2 text-left text-white">Location</th>
                    <th className="px-4 py-2 text-left text-white">Active</th>
                    <th className="px-4 py-2 text-left text-white">Admin</th>
                    <th className="px-4 py-2 text-left text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user.id} className="border-b border-[#262833]">
                      <td className="px-4 py-2 text-white">{user.id}</td>
                      <td className="px-4 py-2 text-white">{user.phone_number || "N/A"}</td>
                      <td className="px-4 py-2 text-white">{user.name || "N/A"}</td>
                      <td className="px-4 py-2 text-white">{user.location || "N/A"}</td>
                      <td className="px-4 py-2 text-white">
                        {user.is_active ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-2 text-white">
                        {user.is_admin ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-2 text-white">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                          Edit
                        </button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-4">
              {Array.from({ length: Math.ceil(filteredUsers.length / itemsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`mx-1 px-3 py-1 rounded ${
                    currentPage === index + 1 ? "bg-[#6C5DD3] text-white" : "bg-[#0E0E1A] text-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Withdrawals Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Withdrawals</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-[#0E0E1A] rounded-lg">
                <thead>
                  <tr className="bg-[#1A1A3D]">
                    <th className="px-4 py-2 text-left text-white">ID</th>
                    <th className="px-4 py-2 text-left text-white">User ID</th>
                    <th className="px-4 py-2 text-left text-white">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {currentWithdrawals.map((withdrawal) => (
                    <tr key={withdrawal.id} className="border-b border-[#262833]">
                      <td className="px-4 py-2 text-white">{withdrawal.id}</td>
                      <td className="px-4 py-2 text-white">{withdrawal.user_id || "N/A"}</td>
                      <td className="px-4 py-2 text-white">{withdrawal.amount || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Deposits Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Deposits</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-[#0E0E1A] rounded-lg">
                <thead>
                  <tr className="bg-[#1A1A3D]">
                    <th className="px-4 py-2 text-left text-white">ID</th>
                    <th className="px-4 py-2 text-left text-white">User ID</th>
                    <th className="px-4 py-2 text-left text-white">Amount</th>
                    <th className="px-4 py-2 text-left text-white">Currency</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDeposits.map((deposit) => (
                    <tr key={deposit.id} className="border-b border-[#262833]">
                      <td className="px-4 py-2 text-white">{deposit.id}</td>
                      <td className="px-4 py-2 text-white">{deposit.user_id || "N/A"}</td>
                      <td className="px-4 py-2 text-white">{deposit.amount || "N/A"}</td>
                      <td className="px-4 py-2 text-white">{deposit.currency || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;