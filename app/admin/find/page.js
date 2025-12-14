"use client";

import React, { useState } from "react";
import { Search, Filter, X, ChevronDown, Phone, MapPin } from "lucide-react";
import { demoProfiles } from "@/components/DemoData/AdminSideData";

const FindComponent = () => {
  const [profiles] = useState(demoProfiles);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    minAge: "",
    maxAge: "",
    gender: "",
    city: "",
  });

  // Get unique values for dropdowns
  const uniqueGenders = [...new Set(profiles.map(p => p.gender))];
  const uniqueCastes = [...new Set(profiles.map(p => p.caste))];
  const uniqueCities = [...new Set(profiles.map(p => p.city))];
  const religions = ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Other"];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      minAge: "",
      maxAge: "",
      gender: "",
      city: "",
    });
  };

  const filteredProfiles = profiles.filter(profile => {
    const matchSearch = profile.fullName.toLowerCase().includes(filters.search.toLowerCase()) || profile.phone.includes(filters.search);
    const matchMinAge = !filters.minAge || parseInt(profile.age) >= parseInt(filters.minAge);
    const matchMaxAge = !filters.maxAge || parseInt(profile.age) <= parseInt(filters.maxAge);
    const matchGender = !filters.gender || profile.gender === filters.gender;
    const matchCaste = !filters.caste || profile.caste === filters.caste;
    const matchReligion = !filters.religion || profile.religion === filters.religion;
    const matchCity = !filters.city || profile.city === filters.city;

    return matchSearch && matchMinAge && matchMaxAge && matchGender && matchCaste && matchReligion && matchCity;
  });

  const activeFiltersCount = Object.values(filters).filter(v => v !== "").length;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black p-6">
      <div className="max-w-400 mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Find Profiles</h1>
            <p className="text-gray-400 text-sm">Search and filter profiles with advanced options</p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-800 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-red-900/50 focus:ring-1 focus:ring-red-900/30 transition-all"
            />
          </div>
        </div>

        {/* Filter Toggle Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-red-950/50 to-red-900/50 border border-red-900/30 rounded-lg text-sm font-medium text-red-300 hover:from-red-950/70 hover:to-red-900/70 transition-all"
          >
            <Filter className="size-4" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-red-600 text-white text-xs rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <X className="size-4" />
              <span>Clear all</span>
            </button>
          )}
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Min Age */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Min Age</label>
                <input
                  type="number"
                  placeholder="18"
                  value={filters.minAge}
                  onChange={(e) => handleFilterChange("minAge", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-950/50 border border-gray-800 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-red-900/50 focus:ring-1 focus:ring-red-900/30 transition-all"
                />
              </div>

              {/* Max Age */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Max Age</label>
                <input
                  type="number"
                  placeholder="60"
                  value={filters.maxAge}
                  onChange={(e) => handleFilterChange("maxAge", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-950/50 border border-gray-800 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-red-900/50 focus:ring-1 focus:ring-red-900/30 transition-all"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Gender</label>
                <div className="relative">
                  <select
                    value={filters.gender}
                    onChange={(e) => handleFilterChange("gender", e.target.value)}
                    className="w-full px-3 py-2 bg-gray-950/50 border border-gray-800 rounded-lg text-sm text-white appearance-none focus:outline-none focus:border-red-900/50 focus:ring-1 focus:ring-red-900/30 transition-all cursor-pointer"
                  >
                    <option value="">All Genders</option>
                    {uniqueGenders.map(gender => (
                      <option key={gender} value={gender}>{gender}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-500 pointer-events-none" />
                </div>
              </div>




              {/* City */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">City</label>
                <div className="relative">
                  <select
                    value={filters.city}
                    onChange={(e) => handleFilterChange("city", e.target.value)}
                    className="w-full px-3 py-2 bg-gray-950/50 border border-gray-800 rounded-lg text-sm text-white appearance-none focus:outline-none focus:border-red-900/50 focus:ring-1 focus:ring-red-900/30 transition-all cursor-pointer"
                  >
                    <option value="">All Cities</option>
                    {uniqueCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Found <span className="text-white font-semibold">{filteredProfiles.length}</span> profiles
          </p>
        </div>

        {/* Profiles Table */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Gender</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Age</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Caste</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">City</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfiles.map((profile) => (
                  <tr
                    key={profile.id}
                    className="border-b border-gray-800/50 hover:bg-linear-to-r hover:from-red-950/10 hover:to-transparent transition-all group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-red-900/30">
                          {profile.fullName.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-white">{profile.fullName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{profile.gender}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{profile.age}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-medium bg-gray-800/50 text-gray-300 border border-gray-700/50">
                        {profile.caste}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-300">
                        <MapPin className="size-3.5 text-gray-500" />
                        {profile.city}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-300 font-mono">
                        <Phone className="size-3.5 text-gray-500" />
                        {profile.phone}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredProfiles.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center">
                          <Search className="size-8 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-base font-medium mb-1">No profiles found</p>
                          <p className="text-gray-600 text-sm">Try adjusting your filters</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindComponent;