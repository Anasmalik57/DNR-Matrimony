"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { User, Heart, Users, MapPin, Briefcase, IndianRupee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CreatableSelect from "react-select/creatable";
import { listedCastes, listedReligions } from "@/components/DemoData/ListedData";

const API_BASE_URL = "http://localhost:5000/api";

const ProfileDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    enquirerName: "",
    enquirerReligion: "",
    enquirerAge: "",
    enquirerPhone: "",
    enquirerCaste: "",
    enquirerDescription: "",
  });

  // Caste & Religion Options
  const casteOptions = listedCastes.map((c) => ({ label: c, value: c }));
  const religionOptions = listedReligions.map((r) => ({ label: r, value: r }));

  // Fetch profile by slug
  useEffect(() => {
    const fetchProfile = async () => {
      if (!slug) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_BASE_URL}/profiles/slug/${slug}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError("Profile not found");
          } else {
            throw new Error("Failed to load profile");
          }
        } else {
          const data = await res.json();
          setProfile(data.data);
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [slug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnquireNow = () => {
    if (!profile) return;

    const enquiryId = `ENQ${Date.now()}`;
    const enquiryData = {
      id: enquiryId,
      profileId: profile._id,
      profileSlug: profile.slug,

      // Enquirer details
      enquirerName: formData.enquirerName,
      enquirerPhone: formData.enquirerPhone,
      enquirerReligion: formData.enquirerReligion,
      enquirerAge: formData.enquirerAge,
      enquirerCaste: formData.enquirerCaste,
      enquirerDescription: formData.enquirerDescription,

      submittedAt: new Date().toISOString(),
      profileDetails: {
        fullName: profile.fullName,
        phoneNumber: profile.phoneNumber,
        city: profile.city,
        age: profile.age,
        gender: profile.gender,
        pic: profile.pic,
      },
    };

    console.log("Enquiry Submitted:", enquiryData);

    // Save to localStorage
    const existingEnquiries = JSON.parse(localStorage.getItem("enquiries") || "[]");
    existingEnquiries.push(enquiryData);
    localStorage.setItem("enquiries", JSON.stringify(existingEnquiries));

    alert("Enquiry submitted successfully!");

    // Reset form
    setFormData({
      enquirerName: "",
      enquirerReligion: "",
      enquirerAge: "",
      enquirerPhone: "",
      enquirerCaste: "",
      enquirerDescription: "",
    });
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF0DD] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C4887C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error / Not Found
  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#FFF0DD] flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Profile Not Found</h2>
          <p className="text-gray-600 mb-8">The profile you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-[#C4887C] text-white rounded-xl font-medium hover:bg-[#D4A59A] transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF0DD]">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden sticky top-6">
              <div className="relative bg-linear-to-br from-[#C4887C] to-[#D4A59A] pt-12 pb-16">
                <div className="relative z-10 flex justify-center">
                  <div className="w-40 h-40 rounded-full bg-white shadow-2xl border-8 border-white overflow-hidden">
                    {profile.pic ? (
                      <Image
                        src={profile.pic}
                        alt={profile.fullName}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-[#C4887C] to-[#D4A59A] flex items-center justify-center text-white text-6xl font-bold">
                        {profile.fullName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-8 -mt-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {profile.fullName}
                  </h2>
                  <p
                    className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium ${
                      profile.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    <span
                      className={`size-2 rounded-full animate-pulse ${
                        profile.status === "Available" ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    {profile.status}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-[#FFF0DD] rounded-2xl">
                    <MapPin className="size-6 text-[#C4887C]" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium">City</p>
                      <p className="text-lg font-bold text-gray-800">{profile.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-[#FFF0DD] rounded-2xl">
                    <User className="size-6 text-[#C4887C]" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Age & Gender</p>
                      <p className="text-lg font-bold text-gray-800">
                        {profile.age} years • {profile.gender}
                      </p>
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <Link
                      href="https://www.nodeskdeveloper.com"
                      target="_blank"
                      className="text-xs text-gray-500"
                    >
                      Developed by{" "}
                      <span className="font-semibold text-[#C4887C]">NoDeskDeveloper</span> team
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details & Enquiry Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Details */}
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Users className="size-7 text-[#C4887C]" />
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 bg-linear-to-br from-[#FFF0DD] to-[#FFE5C8] rounded-2xl border border-[#E5D4C1]">
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">
                    Full Name
                  </p>
                  <p className="text-xl font-bold text-gray-800">{profile.fullName}</p>
                </div>

                <div className="p-5 bg-linear-to-br from-[#FFF0DD] to-[#FFE5C8] rounded-2xl border border-[#E5D4C1]">
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">
                    Father's Name
                  </p>
                  <p className="text-xl font-bold text-gray-800">
                    {profile.fatherName || "Not Available"}
                  </p>
                </div>

                <div className="p-5 bg-linear-to-br from-[#FFF0DD] to-[#FFE5C8] rounded-2xl border border-[#E5D4C1]">
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">
                    Mother's Name
                  </p>
                  <p className="text-xl font-bold text-gray-800">
                    {profile.motherName || "Not Available"}
                  </p>
                </div>

                <div className="p-5 bg-linear-to-br from-[#FFF0DD] to-[#FFE5C8] rounded-2xl border border-[#E5D4C1]">
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">
                    Religion
                  </p>
                  <p className="text-xl font-bold text-gray-800">
                    {profile.religion || "Not Specified"}
                  </p>
                </div>

                <div className="p-5 bg-linear-to-br from-[#FFF0DD] to-[#FFE5C8] rounded-2xl border border-[#E5D4C1]">
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">
                    Caste
                  </p>
                  <p className="text-xl font-bold text-gray-800">{profile.caste}</p>
                </div>

                <div className="p-5 bg-linear-to-br from-[#FFF0DD] to-[#FFE5C8] rounded-2xl border border-[#E5D4C1] flex items-center gap-4">
                  <Briefcase className="size-8 text-[#C4887C]" />
                  <div>
                    <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">
                      Employment
                    </p>
                    <p className="text-xl font-bold text-gray-800">
                      {profile.EmployementType || "Not Specified"}
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-linear-to-br from-[#FFF0DD] to-[#FFE5C8] rounded-2xl border border-[#E5D4C1] flex items-center gap-4">
                  <IndianRupee className="size-8 text-[#C4887C]" />
                  <div>
                    <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">
                      Annual Income
                    </p>
                    <p className="text-xl font-bold text-gray-800">
                      ₹{profile.income?.toLocaleString() || "Not Disclosed"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enquiry Form */}
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Heart className="size-7 text-[#C4887C]" />
                Interested? Enquire Now
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="enquirerName"
                    value={formData.enquirerName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-5 py-4 bg-[#FFF0DD] border-2 border-[#E5D4C1] rounded-xl text-gray-800 placeholder:text-gray-500 focus:outline-none focus:border-[#C4887C] focus:ring-4 focus:ring-[#C4887C]/20 transition-all"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Religion
                    </label>
                    <CreatableSelect
                      options={religionOptions}
                      value={
                        formData.enquirerReligion
                          ? { label: formData.enquirerReligion, value: formData.enquirerReligion }
                          : null
                      }
                      onChange={(selected) =>
                        setFormData((prev) => ({
                          ...prev,
                          enquirerReligion: selected ? selected.value : "",
                        }))
                      }
                      placeholder="Select or type religion"
                      isClearable
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: "#FFF0DD",
                          borderColor: "#E5D4C1",
                          borderRadius: "12px",
                          padding: "8px 4px",
                        }),
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Age
                    </label>
                    <input
                      type="number"
                      name="enquirerAge"
                      value={formData.enquirerAge}
                      onChange={handleInputChange}
                      placeholder="e.g. 28"
                      className="w-full px-5 py-4 bg-[#FFF0DD] border-2 border-[#E5D4C1] rounded-xl text-gray-800 placeholder:text-gray-500 focus:outline-none focus:border-[#C4887C] focus:ring-4 focus:ring-[#C4887C]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="enquirerPhone"
                      value={formData.enquirerPhone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full px-5 py-4 bg-[#FFF0DD] border-2 border-[#E5D4C1] rounded-xl text-gray-800 placeholder:text-gray-500 focus:outline-none focus:border-[#C4887C] focus:ring-4 focus:ring-[#C4887C]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Caste
                    </label>
                    <CreatableSelect
                      options={casteOptions}
                      value={
                        formData.enquirerCaste
                          ? { label: formData.enquirerCaste, value: formData.enquirerCaste }
                          : null
                      }
                      onChange={(selected) =>
                        setFormData((prev) => ({
                          ...prev,
                          enquirerCaste: selected ? selected.value : "",
                        }))
                      }
                      placeholder="Select or type caste"
                      isClearable
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: "#FFF0DD",
                          borderColor: "#E5D4C1",
                          borderRadius: "12px",
                          padding: "8px 4px",
                        }),
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message / Description
                  </label>
                  <textarea
                    name="enquirerDescription"
                    value={formData.enquirerDescription}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself or your requirements..."
                    rows={4}
                    className="w-full px-5 py-4 bg-[#FFF0DD] border-2 border-[#E5D4C1] rounded-xl resize-none text-gray-800 placeholder:text-gray-500 focus:outline-none focus:border-[#C4887C] focus:ring-4 focus:ring-[#C4887C]/20 transition-all"
                  />
                </div>

                <button
                  onClick={handleEnquireNow}
                  className="w-full py-5 bg-linear-to-r from-[#C4887C] to-[#D4A59A] text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Heart className="size-6" />
                  Submit Enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailPage;