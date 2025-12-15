"use client";

import React, { useState } from "react";
import { Eye, Pencil, Search, Share2, Trash2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { demoProfiles } from "@/components/DemoData/AdminSideData";
import EditCurrentProfileModal from "@/components/Modals/EditCurrentProfileModal";
import CreateProfileModal from "@/components/Modals/CreateProfileModal";

const AdminProfiles = () => {
  const router = useRouter();
  const [profiles, setProfiles] = useState(demoProfiles);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleDelete = (id) => {
    setProfiles((prev) => prev.filter((enq) => enq.id !== id));
  };

  const handleShare = (enq) => {
    if (enq?.status === "Available") {
      navigator.share({
        title: enq.fullName,
        url: `${window.location.href.replace("/admin", "")}/${enq?.id}`,
      });
    } else {
      router.push("/");
    }
  };

  const handleCreate = (newProfile) => {
    setProfiles((prev) => [...prev, newProfile]);
  };

  const handleEdit = (profile) => {
    setSelectedProfile(profile);
    setIsEditModalOpen(true);
  };
  const closeCreateModal = () => setIsCreateModalOpen(false);
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProfile(null);
  };
  const handleUpdateProfile = (updatedProfile) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === updatedProfile.id ? updatedProfile : p))
    );
  };

  const handleView = (enq) => {
    router.push(`/profiles/${enq.id}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black p-6">
      <div className="max-w-400 mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Profiles</h1>
              <p className="text-gray-400 text-sm">
                Manage and track all profiles
              </p>
            </div>
          </div>

          {/* Create button */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-red-600 via-red-700 to-red-800 text-white rounded-lg font-semibold hover:from-red-700 hover:to-red-600 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-red-500/25"
          >
            <Plus className="size-4" />
            Create New
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-linear-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">
              Total Profiles
            </p>
            <p className="text-3xl font-bold text-white">{profiles.length}</p>
          </div>
          <div className="bg-linear-to-br from-green-950/30 to-gray-900/50 border border-green-900/30 rounded-xl p-5">
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">
              Available
            </p>
            <p className="text-3xl font-bold text-green-400">
              {profiles.filter((e) => e.status === "Available").length}
            </p>
          </div>
          <div className="bg-linear-to-br from-red-950/30 to-gray-900/50 border border-red-900/30 rounded-xl p-5">
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">
              Unavailable
            </p>
            <p className="text-3xl font-bold text-red-400">
              {profiles.filter((e) => e.status === "Unavailable").length}
            </p>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  {[
                    "S.No",
                    "Full Name",
                    "Phone",
                    "Gender",
                    "Age",
                    "Caste",
                    "City",
                    "Status",
                    "Created By",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {profiles.map((enq, index) => (
                  <tr
                    key={enq.id}
                    className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {enq.fullName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300 font-mono">
                      {enq.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {enq.gender}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {enq.age}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {enq.caste}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {enq.city}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${
                          enq.status === "Available"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {enq.createdBy}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleView(enq)}
                          className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-all"
                          title="View"
                        >
                          <Eye className="size-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(enq)}
                          className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-all"
                          title="Edit"
                        >
                          <Pencil className="size-4" />
                        </button>
                        <button
                          onClick={() => handleShare(enq)}
                          className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-all"
                          title="Share"
                        >
                          <Share2 className="size-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(enq.id)}
                          className="p-2 rounded-lg bg-gray-800 text-red-400 hover:bg-red-950/50 hover:text-red-300 transition-all"
                          title="Delete"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {profiles.length === 0 && (
                  <tr>
                    <td colSpan="10" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="size-12 text-gray-700" />
                        <p className="text-gray-500 text-base font-medium">
                          No profiles found
                        </p>
                        <p className="text-gray-600 text-sm">
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

        {/* Footer Info */}
        {profiles.length > 0 && (
          <div className="flex items-center justify-between text-sm text-gray-400 px-2">
            <p>
              Showing {profiles.length} of {profiles.length} profiles
            </p>
          </div>
        )}
      </div>

      <CreateProfileModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onSubmit={handleCreate}
      />
      <EditCurrentProfileModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        profile={selectedProfile}
        onUpdate={handleUpdateProfile}
      />
    </div>
  );
};

export default AdminProfiles;
