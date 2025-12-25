"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Heart,
  Search,
  MapPin,
  FilterIcon,
  Briefcase,
  IndianRupee,
  Filter,
  Sparkles,
  TrendingUp,
  Award,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/api";
import ProfileCard from "@/components/Cards/ProfileCard";

const ProfilesListingPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters =
    searchTerm !== "" ||
    selectedGender !== "All" ||
    selectedStatus !== "All" ||
    selectedCity !== "All";

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedGender("All");
    setSelectedStatus("All");
    setSelectedCity("All");
  };

  // Fetch all profiles
  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_BASE_URL}/profiles`);
        if (!res.ok) {
          throw new Error("Failed to fetch profiles");
        }
        const data = await res.json();
        setProfiles(data.data || []);
        setFilteredProfiles(data.data || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...profiles];

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.caste.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGender !== "All") {
      filtered = filtered.filter((p) => p.gender === selectedGender);
    }

    if (selectedStatus !== "All") {
      filtered = filtered.filter((p) => p.status === selectedStatus);
    }

    if (selectedCity !== "All") {
      filtered = filtered.filter((p) => p.city === selectedCity);
    }

    setFilteredProfiles(filtered);
  }, [searchTerm, selectedGender, selectedStatus, selectedCity, profiles]);

  const cities = ["All", ...new Set(profiles.map((p) => p.city))];

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#FFF5E6] via-[#FFE8CC] to-[#FFD9B3] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0M0ODg3QyIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        <div className="text-center relative z-10">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-linear-to-r from-[#C4887C] to-[#D4A59A] rounded-full animate-ping opacity-20"></div>
            <div className="relative w-24 h-24 border-4 border-[#C4887C] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-700 text-xl font-bold">
            Discovering Perfect Matches...
          </p>
          <p className="text-gray-500 text-sm mt-2">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#FFF5E6] via-[#FFE8CC] to-[#FFD9B3] flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-[#E5D4C1]">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Oops! Something Went Wrong
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-linear-to-r from-[#C4887C] to-[#D4A59A] text-white rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#FFF5E6] via-[#FFE8CC] to-[#FFD9B3] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0M0ODg3QyIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>

      <div className="max-w-350 mx-auto px-4 py-12 md:py-16  relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Discover Your
            <span className="block mt-2 bg-linear-to-r from-[#C4887C] via-[#D4A59A] to-[#C4887C] bg-clip-text text-transparent">
              Perfect Life Partner
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Browse through our carefully curated profiles and find someone who
            shares your values, dreams, and aspirations
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-linear-to-tl from-[#ffebcd] via-[#FFE8CC] to-[#ffe4ca] rounded-2xl shadow-sm p-4 mb-8 border border-amber-300">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, city, or caste..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                showFilters
                  ? "bg-linear-to-r from-rose-400 to-pink-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FilterIcon className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    Gender
                  </label>
                  <select
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
                  >
                    <option>All</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5" />
                    Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
                  >
                    <option>All</option>
                    <option>Available</option>
                    <option>Engaged</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    City
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
                  >
                    {cities.map((city) => (
                      <option key={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Clear All
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {filteredProfiles.length}
            </span>{" "}
            {filteredProfiles.length === 1 ? "profile" : "profiles"}
          </p>
        </div>

        {/* Profiles Grid */}
        {filteredProfiles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No profiles found
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Try adjusting your search or filters
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-5 py-2 bg-linear-to-r from-rose-400 to-pink-500 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProfiles.map((profile) => (
              <ProfileCard key={profile._id} profile={profile} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilesListingPage;
