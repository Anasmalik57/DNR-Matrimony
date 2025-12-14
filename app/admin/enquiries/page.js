"use client";

import React, { useState, useEffect } from "react";
import { Search, Calendar, Phone, User, Hash, Download, RefreshCw } from "lucide-react";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-poppins" });

// Demo Data
const demoEnquiries = [
  {
    id: "ENQ001",
    profileId: "PRF123",
    enquirerName: "Rajesh Kumar",
    enquirerPhone: "+91 9876543210",
    submittedAt: "2024-12-10T10:30:00",
  },
  {
    id: "ENQ002",
    profileId: "PRF456",
    enquirerName: "Priya Sharma",
    enquirerPhone: "+91 8765432109",
    submittedAt: "2024-12-11T14:45:00",
  },
  {
    id: "ENQ003",
    profileId: "PRF789",
    enquirerName: "Amit Verma",
    enquirerPhone: "+91 7654321098",
    submittedAt: "2024-12-12T09:15:00",
  },
  {
    id: "ENQ004",
    profileId: "PRF321",
    enquirerName: "Neha Gupta",
    enquirerPhone: "+91 9988776655",
    submittedAt: "2024-12-12T16:20:00",
  },
  {
    id: "ENQ005",
    profileId: "PRF654",
    enquirerName: "Vikram Singh",
    enquirerPhone: "+91 8899001122",
    submittedAt: "2024-12-13T11:00:00",
  },
  {
    id: "ENQ006",
    profileId: "PRF987",
    enquirerName: "Anita Desai",
    enquirerPhone: "+91 7766554433",
    submittedAt: "2024-12-13T15:30:00",
  },
  {
    id: "ENQ007",
    profileId: "PRF147",
    enquirerName: "Sanjay Patel",
    enquirerPhone: "+91 9876501234",
    submittedAt: "2024-12-14T08:45:00",
  },
];

const EnquiryPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch from localStorage or use demo data
    const fetchEnquiries = () => {
      try {
        const storedData = localStorage.getItem("enquiries");
        if (storedData) {
          setEnquiries(JSON.parse(storedData));
        } else {
          setEnquiries(demoEnquiries);
          localStorage.setItem("enquiries", JSON.stringify(demoEnquiries));
        }
      } catch (error) {
        console.error("Error loading enquiries:", error);
        setEnquiries(demoEnquiries);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      const storedData = localStorage.getItem("enquiries");
      setEnquiries(storedData ? JSON.parse(storedData) : demoEnquiries);
      setIsLoading(false);
    }, 500);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-IN', { month: 'short' });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  };

  const filteredEnquiries = enquiries.filter(
    (enq) =>
      enq.enquirerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.enquirerPhone.includes(searchTerm) ||
      enq.profileId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className={`${inter.variable} ${poppins.variable} min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center`}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm" style={{ fontFamily: "var(--font-inter)" }}>Loading enquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${inter.variable} ${poppins.variable} min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black p-6`}>
      <div className="max-w-7xl mx-auto space-y-5">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-poppins)" }}>
              Enquiries
            </h1>
            <p className="text-sm text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>
              Track and manage all profile enquiries
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              className="p-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all"
              title="Refresh"
            >
              <RefreshCw className="size-4.5" />
            </button>


            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search enquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-rose-600/50 focus:ring-2 focus:ring-rose-600/20 transition-all"
                style={{ fontFamily: "var(--font-inter)" }}
              />
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>
              Total Enquiries
            </p>
            <p className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-poppins)" }}>
              {enquiries.length}
            </p>
          </div>
          <div className="bg-linear-to-br from-rose-950/30 to-rose-900/30 backdrop-blur-sm border border-rose-800/30 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>
              Today's Enquiries
            </p>
            <p className="text-2xl font-bold text-rose-400" style={{ fontFamily: "var(--font-poppins)" }}>
              {enquiries.filter(e => new Date(e.submittedAt).toDateString() === new Date().toDateString()).length}
            </p>
          </div>
          <div className="bg-linear-to-br from-emerald-950/30 to-emerald-900/30 backdrop-blur-sm border border-emerald-800/30 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>
              Filtered Results
            </p>
            <p className="text-2xl font-bold text-emerald-400" style={{ fontFamily: "var(--font-poppins)" }}>
              {filteredEnquiries.length}
            </p>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-linear-to-r from-gray-800/50 to-gray-900/50 border-b border-gray-700">
                  <th className="px-5 py-3.5 text-left">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 uppercase tracking-wider" style={{ fontFamily: "var(--font-poppins)" }}>
                      <Hash className="size-3.5" />
                      S.No
                    </div>
                  </th>
                  <th className="px-5 py-3.5 text-left">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 uppercase tracking-wider" style={{ fontFamily: "var(--font-poppins)" }}>
                      <Hash className="size-3.5" />
                      Profile ID
                    </div>
                  </th>
                  <th className="px-5 py-3.5 text-left">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 uppercase tracking-wider" style={{ fontFamily: "var(--font-poppins)" }}>
                      <User className="size-3.5" />
                      Enquirer Name
                    </div>
                  </th>
                  <th className="px-5 py-3.5 text-left">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 uppercase tracking-wider" style={{ fontFamily: "var(--font-poppins)" }}>
                      <Phone className="size-3.5" />
                      Phone
                    </div>
                  </th>
                  <th className="px-5 py-3.5 text-left">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 uppercase tracking-wider" style={{ fontFamily: "var(--font-poppins)" }}>
                      <Calendar className="size-3.5" />
                      Submitted At
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEnquiries.map((enq, index) => (
                  <tr
                    key={enq.id}
                    className="border-b border-gray-800/50 hover:bg-linear-to-r hover:from-rose-950/10 hover:to-transparent transition-all duration-200"
                  >
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-gray-400 font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex px-2.5 py-1 bg-rose-500/10 border border-rose-500/20 rounded-md text-xs font-semibold text-rose-400" style={{ fontFamily: "var(--font-poppins)" }}>
                        {enq.profileId}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-rose-500 to-rose-700 flex items-center justify-center text-white text-xs font-bold" style={{ fontFamily: "var(--font-poppins)" }}>
                          {enq.enquirerName.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-white" style={{ fontFamily: "var(--font-poppins)" }}>
                          {enq.enquirerName}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-gray-300 font-mono" style={{ fontFamily: "var(--font-inter)" }}>
                        {enq.enquirerPhone}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>
                        {formatDate(enq.submittedAt)}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredEnquiries.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-5 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="size-10 text-gray-700" />
                        <p className="text-gray-400 text-sm font-medium" style={{ fontFamily: "var(--font-poppins)" }}>
                          No enquiries found
                        </p>
                        <p className="text-gray-600 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                          Try adjusting your search
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        {filteredEnquiries.length > 0 && (
          <div className="flex items-center justify-between px-2">
            <p className="text-xs text-gray-500" style={{ fontFamily: "var(--font-inter)" }}>
              Showing {filteredEnquiries.length} of {enquiries.length} enquiries
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnquiryPage;