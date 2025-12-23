"use client";

import React, { useState, useEffect } from "react";
import { Search, Mail, Phone, Calendar } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

const ContactAdminComponent = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    fromDate: "",
    toDate: "",
  });

  // State for viewing full message
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Fetch contacts on mount
  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/contacts`);
        if (!res.ok) throw new Error("Failed to fetch contacts");
        const data = await res.json();
        setContacts(data.data || []);
        setFilteredContacts(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Apply filters
  useEffect(() => {
    const applyFilters = () => {
      const filtered = contacts.filter((contact) => {
        const matchSearch =
          contact.fullName.toLowerCase().includes(filters.search.toLowerCase()) ||
          contact.email.toLowerCase().includes(filters.search.toLowerCase()) ||
          contact.phone.includes(filters.search);

        const contactDate = new Date(contact.createdAt);
        const fromDate = filters.fromDate ? new Date(filters.fromDate) : null;
        const toDate = filters.toDate ? new Date(filters.toDate) : null;

        const matchFromDate = !fromDate || contactDate >= fromDate;
        const matchToDate = !toDate || contactDate <= toDate;

        return matchSearch && matchFromDate && matchToDate;
      });

      setFilteredContacts(filtered);
    };

    applyFilters();
  }, [filters, contacts]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Professional readable date format
  const formatSubmittedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }) + ", " + date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading contacts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Contact Messages
            </h1>
            <p className="text-gray-400 text-sm">
              View all submitted contact form messages
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-800 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all"
            />
          </div>
        </div>

        {/* Date Filters */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">
                From Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={filters.fromDate}
                  onChange={(e) => handleFilterChange("fromDate", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-950/50 border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">
                To Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={filters.toDate}
                  onChange={(e) => handleFilterChange("toDate", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-950/50 border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Found{" "}
            <span className="text-white font-semibold">
              {filteredContacts.length}
            </span>{" "}
            message{filteredContacts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Contacts Table */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Submitted At
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr
                    key={contact._id}
                    className="border-b border-gray-800/50 hover:bg-linear-to-r hover:from-red-950/10 hover:to-transparent transition-all"
                  >
                    {/* Name */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-white">
                        {contact.fullName}
                      </span>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-300">
                        <Mail className="size-3.5 text-gray-500" />
                        {contact.email}
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-300 font-mono">
                        <Phone className="size-3.5 text-gray-500" />
                        {contact.phone}
                      </div>
                    </td>

                    {/* Message - Truncated with View Button */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <p className="text-sm text-gray-300 line-clamp-1 max-w-md">
                          {contact.message}
                        </p>
                        <button
                          onClick={() => setSelectedMessage(contact)}
                          className="px-3 py-1 text-xs font-medium text-white bg-rose-800/70 hover:bg-rose-800 rounded-full transition-all whitespace-nowrap"
                        >
                          View Full
                        </button>
                      </div>
                    </td>

                    {/* Submitted At - Professional Format */}
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {formatSubmittedDate(contact.createdAt)}
                    </td>
                  </tr>
                ))}

                {filteredContacts.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center">
                          <Search className="size-8 text-gray-600" />
                        </div>
                        <p className="text-gray-400 text-base font-medium">
                          No messages found
                        </p>
                        <p className="text-gray-600 text-sm">
                          Try adjusting your filters
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Full Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 shadow-2xl">
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold text-white">
                  Full Message
                </h3>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-500 hover:text-white transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">From</p>
                  <p className="text-lg font-medium text-white">{selectedMessage.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white">{selectedMessage.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white">{selectedMessage.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Message</p>
                  <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Submitted At</p>
                  <p className="text-white font-medium">
                    {formatSubmittedDate(selectedMessage.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactAdminComponent;