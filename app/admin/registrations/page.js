"use client";

import React, { useState, useEffect } from "react";
import { Search, RefreshCw, Calendar, Phone, User, Hash,  Eye, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";


const RegistrationsPage = () => {
  const router = useRouter();
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRegistrations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/registrations`);
      if (!res.ok) throw new Error("Failed to fetch registrations");
      const data = await res.json();
      setRegistrations(data.data || []);
      setFilteredRegistrations(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleRefresh = () => {
    fetchRegistrations();
  };

  useEffect(() => {
    const filtered = registrations.filter(
      (reg) =>
        reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.phoneNumber.includes(searchTerm) ||
        reg.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.caste.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRegistrations(filtered);
  }, [searchTerm, registrations]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-IN", { month: "short" });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  };

  const handleView = (id) => {
    router.push(`/admin/registrations/${id}`);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this registration?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/registrations/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setRegistrations((prev) => prev.filter((r) => r._id !== id));
      setFilteredRegistrations((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm">Loading registrations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-red-400">
          <p>Error: {error}</p>
          <button onClick={handleRefresh} className="mt-4 px-6 py-2 bg-rose-600 text-white rounded-lg">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Registrations</h1>
            <p className="text-sm text-gray-400">Manage all user registrations</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="p-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all"
              title="Refresh"
            >
              <RefreshCw className="size-4.5" />
            </button>

            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search by name, phone, city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-rose-600/50 focus:ring-2 focus:ring-rose-600/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Total Registrations</p>
            <p className="text-2xl font-bold text-white">{registrations.length}</p>
          </div>
          <div className="bg-linear-to-br from-rose-950/30 to-rose-900/30 backdrop-blur-sm border border-rose-800/30 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Available</p>
            <p className="text-2xl font-bold text-rose-400">
              {registrations.filter((r) => r.status === "Available").length}
            </p>
          </div>
          <div className="bg-linear-to-br from-emerald-950/30 to-emerald-900/30 backdrop-blur-sm border border-emerald-800/30 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Filtered Results</p>
            <p className="text-2xl font-bold text-emerald-400">{filteredRegistrations.length}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-linear-to-r from-gray-800/50 to-gray-900/50 border-b border-gray-700">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Age
                  </th>
                   <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Religion
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Caste
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    City
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Working As
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Submitted At
                  </th>
                 
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((reg, index) => (
                  <tr
                    key={reg._id}
                    className="border-b border-gray-800/50 hover:bg-linear-to-r hover:from-rose-950/10 hover:to-transparent transition-all duration-200"
                  >
                    <td className="px-5 py-4 text-sm text-gray-400">{index + 1}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {/* <div className="w-8 h-8 rounded-full bg-linear-to-br from-rose-500 to-rose-700 flex items-center justify-center text-white text-xs font-bold">
                          {reg.fullName.charAt(0).toUpperCase()}
                        </div> */}
                        <span className="text-sm font-medium text-white">{reg.fullName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-300 font-mono">{reg.phoneNumber}</td>
                    <td className="px-5 py-4 text-sm text-gray-300">{reg.gender}</td>
                    <td className="px-5 py-4 text-sm text-gray-300">{reg.age}</td>
                    <td className="px-5 py-4 text-sm text-gray-300">{reg.religion}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex px-2.5 py-1 bg-rose-500/10 border border-rose-500/20 rounded-md text-xs font-semibold text-rose-400">
                        {reg.caste}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-300">{reg.city}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium text-white`}
                      >
                        {reg.EmployementType}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-400">{formatDate(reg.createdAt)}</td>
                  </tr>
                ))}
                {filteredRegistrations.length === 0 && (
                  <tr>
                    <td colSpan="10" className="px-5 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Search className="size-12 text-gray-700" />
                        <p className="text-gray-500 text-base font-medium">No registrations found</p>
                        <p className="text-gray-600 text-sm">Try adjusting your search</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        {filteredRegistrations.length > 0 && (
          <div className="flex items-center justify-between text-sm text-gray-400 px-2">
            <p>
              Showing {filteredRegistrations.length} of {registrations.length} registrations
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationsPage;