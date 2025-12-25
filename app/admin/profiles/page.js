"use client";

import React, { useState, useEffect } from "react";
import { Eye, Pencil, Share2, Trash2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import EditCurrentProfileModal from "@/components/Modals/EditCurrentProfileModal";
import CreateProfileModal from "@/components/Modals/CreateProfileModal";
import { API_BASE_URL } from "@/lib/api";


const AdminProfiles = () => {
  const router = useRouter();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Fetch all profiles on mount
  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/profiles`);
      const data = await res.json();
      if (data.success) {
        setProfiles(data.data);
        // console.log("Fetched profiles:", data.data);
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this profile?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/profiles/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProfiles((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  const handleShare = (profile) => {
    if (profile.status !== "Available") {
      router.push("/");
      return;
    }
    const shareUrl = `${window.location.origin}/profiles/${profile.slug}`;
    navigator.share?.({
      title: profile.fullName,
      url: shareUrl,
    }) || alert("Share link copied: " + shareUrl);
  };

  const handleCreate = async (newProfile) => {
    // newProfile comes from modal (already includes pic, etc.)
    try {
      const res = await fetch(`${API_BASE_URL}/profiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newProfile,
          createdBy: "admin",
          EmployementType: newProfile.employmentType, // match schema spelling
          marriageType: "Arranged", // if required, adjust as needed
          educationQualification: "Not Specified", // optional fallback
          dateOfBirth: new Date(Date.now() - newProfile.age * 365 * 24 * 3600 * 1000).toISOString(), // approx DOB
        }),
      });

      const data = await res.json();
      if (data.success) {
        setProfiles((prev) => [data.data, ...prev]);
        setIsCreateModalOpen(false);
      }
    } catch (error) {
      console.error("Error creating profile:", error);
    }
    finally {
      await fetchProfiles();
      setIsCreateModalOpen(false);}
  };

  const handleEdit = (profile) => {
    setSelectedProfile(profile);
    setIsEditModalOpen(true);
  };

  const handleUpdateProfile = async (updatedProfile) => {
    try {
      const res = await fetch(`${API_BASE_URL}/profiles/${updatedProfile._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updatedProfile,
          EmployementType: updatedProfile.employmentType,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setProfiles((prev) =>
          prev.map((p) => (p._id === data.data._id ? data.data : p))
        );
        setIsEditModalOpen(false);
        setSelectedProfile(null);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleView = (profile) => {
    router.push(`/profiles/${profile?.slug}`);
  };

  const closeCreateModal = () => setIsCreateModalOpen(false);
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProfile(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading profiles...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Profiles</h1>
            <p className="text-gray-400 text-sm">Manage and track all profiles</p>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-red-600 via-red-700 to-red-800 text-white rounded-lg font-semibold hover:from-red-700 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-red-500/25"
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
              {profiles.filter((p) => p.status === "Available").length}
            </p>
          </div>
          <div className="bg-linear-to-br from-red-950/30 to-gray-900/50 border border-red-900/30 rounded-xl p-5">
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">
              Unavailable
            </p>
            <p className="text-3xl font-bold text-red-400">
              {profiles.filter((p) => p.status === "Unavailable").length}
            </p>
          </div>
        </div>

        {/* Table */}
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
                {profiles.map((profile, index) => (
                  <tr
                    key={profile._id}
                    className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm text-gray-400">{index + 1}</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {profile.fullName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300 font-mono">
                      {profile.phoneNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{profile.gender}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{profile.age}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{profile.caste}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{profile.city}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${
                          profile.status === "Available"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}
                      >
                        {profile.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {profile.createdBy}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleView(profile)}
                          className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-all"
                          title="View"
                        >
                          <Eye className="size-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(profile)}
                          className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-all"
                          title="Edit"
                        >
                          <Pencil className="size-4" />
                        </button>
                        <button
                          onClick={() => handleShare(profile)}
                          className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-all"
                          title="Share"
                        >
                          <Share2 className="size-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(profile._id)}
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
                      <p className="text-gray-500 text-base font-medium">
                        No profiles found
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {profiles.length > 0 && (
          <div className="flex items-center justify-between text-sm text-gray-400 px-2">
            <p>Showing {profiles.length} profiles</p>
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