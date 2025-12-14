"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Phone, MapPin, Briefcase, DollarSign, Heart, User, Users, ArrowLeft } from "lucide-react";
import { demoProfiles } from "@/components/DemoData/AdminSideData";

const ProfileDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    enquirerName: "",
    enquirerReligion: "",
    enquirerAge: "",
    enquirerPhone: "",
  });

  useEffect(() => {
    if (params?.id) {
      const foundProfile = demoProfiles.find((p) => p.id === params.id);
      setProfile(foundProfile);
    }
  }, [params]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleEnquireNow = () => {
  // Generate unique ID
  const enquiryId = `ENQ${Date.now()}`;
  
  const enquiryData = {
    id: enquiryId,
    profileId: profile.id, // param se profile ID
    enquirerName: formData.enquirerName,
    enquirerPhone: formData.enquirerPhone,
    submittedAt: new Date().toISOString(), // ISO format for consistency
    // Extra fields (optional)
    enquirerReligion: formData.enquirerReligion,
    enquirerAge: formData.enquirerAge,
    profileDetails: profile,
  };

  console.log("Enquiry Data:", enquiryData);
  
  // Save to localStorage
  const existingEnquiries = JSON.parse(localStorage.getItem("enquiries") || "[]");
  existingEnquiries.push(enquiryData);
  localStorage.setItem("enquiries", JSON.stringify(existingEnquiries));
  
  alert("Enquiry submitted successfully!");
  setFormData({ enquirerName: "", enquirerReligion: "", enquirerAge: "", enquirerPhone: "" });
};

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#FFF0DD] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C4887C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF0DD]">
      {/* Header */}
      {/* <div className="bg-linear-to-r from-[#C4887C] to-[#D4A59A] shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white hover:text-[#FFF0DD] transition-colors mb-4"
          >
            <ArrowLeft className="size-5" />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Profile Details</h1>
        </div>
      </div> */}

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden sticky top-6">
              {/* Profile Header with Wave */}
              <div className="relative bg-linear-to-br from-[#C4887C] to-[#D4A59A] pt-12 pb-12">
                {/* <div className="absolute bottom-0 left-0 right-0">
                  <svg viewBox="0 0 1440 120" className="w-full h-16">
                    <path
                      fill="#ffffff"
                      d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
                    />
                  </svg>
                </div> */}
               
                
                {/* Avatar */}
                <div className="relative z-10 flex justify-center">
                  <div className="w-32 h-32 rounded-full bg-white shadow-2xl flex items-center justify-center border-4 border-white">
                    <span className="text-5xl font-bold text-[#C4887C]">
                      {profile.fullName.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="px-6 pb-6 mt-4">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{profile.fullName}</h2>
                  {/* <p className="text-gray-500 text-sm">@{profile.fullName.toLowerCase().replace(/\s+/g, '')}</p> */}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-[#FFF0DD] rounded-xl">
                    <MapPin className="size-5 text-[#C4887C]" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium">City</p>
                      <p className="text-sm font-semibold text-gray-800">{profile.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-[#FFF0DD] rounded-xl">
                    <User className="size-5 text-[#C4887C]" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium">Age & Gender</p>
                      <p className="text-sm font-semibold text-gray-800">{profile.age} years • {profile.gender}</p>
                    </div>
                  </div>
                <div className=" w-full text-center">
                    <p className="text-xs text-gray-500">
                        Developed by <span className="font-semibold text-[#C4887C]">nodeskdev</span>
                    </p>
                </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details & Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Users className="size-6 text-[#C4887C]" />
                Personal Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="p-4 bg-linear-to-br from-[#FFF0DD] to-[#FFE5C8] rounded-xl border border-[#E5D4C1]">
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">Full Name</p>
                  <p className="text-lg font-bold text-gray-800">{profile.fullName}</p>
                </div>

                <div className="p-4 bg-linear-to-br from-[#FFF0DD] to-[#FFE5C8] rounded-xl border border-[#E5D4C1]">
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">Father's Name</p>
                  <p className="text-lg font-bold text-gray-800">{profile.fatherName || "Not Available"}</p>
                </div>

                <div className="p-4 bg-linear-to-br from-[#FFF0DD] to-[#FFE5C8] rounded-xl border border-[#E5D4C1]">
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">Mother's Name</p>
                  <p className="text-lg font-bold text-gray-800">{profile.motherName || "Not Available"}</p>
                </div>

                <div className="p-4 bg-linear-to-br from-[#FFF0DD] to-[#FFE5C8] rounded-xl border border-[#E5D4C1]">
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">Religion</p>
                  <p className="text-lg font-bold text-gray-800">{profile.religion || "Not Specified"}</p>
                </div>

                <div className="p-4 bg-linear-to-br from-[#FFF0DD] to-[#FFE5C8] rounded-xl border border-[#E5D4C1]">
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">Caste</p>
                  <p className="text-lg font-bold text-gray-800">{profile.caste}</p>
                </div>

                <div className="p-4 bg-linear-to-br from-[#FFF0DD] to-[#FFE5C8] rounded-xl border border-[#E5D4C1] flex items-center gap-3">
                  <Briefcase className="size-6 text-[#C4887C] shrink-0" />
                  <div>
                    <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">Employment</p>
                    <p className="text-lg font-bold text-gray-800">{profile.employmentType || "Not Specified"}</p>
                  </div>
                </div>

                <div className="p-4 bg-linear-to-br from-[#FFF0DD] to-[#FFE5C8] rounded-xl border border-[#E5D4C1] flex items-center gap-3">
                  <DollarSign className="size-6 text-[#C4887C] shrink-0" />
                  <div>
                    <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">Income</p>
                    <p className="text-lg font-bold text-gray-800">{profile.income || "Not Disclosed"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enquiry Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Heart className="size-6 text-[#C4887C]" />
                Interested? Enquire Now
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="enquirerName"
                    value={formData.enquirerName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-[#FFF0DD] border-2 border-[#E5D4C1] rounded-xl text-gray-800 placeholder:text-gray-500 focus:outline-none focus:border-[#C4887C] focus:ring-2 focus:ring-[#C4887C]/20 transition-all"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Religion</label>
                    <input
                      type="text"
                      name="enquirerReligion"
                      value={formData.enquirerReligion}
                      onChange={handleInputChange}
                      placeholder="Your religion"
                      className="w-full px-4 py-3 bg-[#FFF0DD] border-2 border-[#E5D4C1] rounded-xl text-gray-800 placeholder:text-gray-500 focus:outline-none focus:border-[#C4887C] focus:ring-2 focus:ring-[#C4887C]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      name="enquirerAge"
                      value={formData.enquirerAge}
                      onChange={handleInputChange}
                      placeholder="Your age"
                      className="w-full px-4 py-3 bg-[#FFF0DD] border-2 border-[#E5D4C1] rounded-xl text-gray-800 placeholder:text-gray-500 focus:outline-none focus:border-[#C4887C] focus:ring-2 focus:ring-[#C4887C]/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="enquirerPhone"
                    value={formData.enquirerPhone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 bg-[#FFF0DD] border-2 border-[#E5D4C1] rounded-xl text-gray-800 placeholder:text-gray-500 focus:outline-none focus:border-[#C4887C] focus:ring-2 focus:ring-[#C4887C]/20 transition-all"
                  />
                </div>

                <button
                  onClick={handleEnquireNow}
                  className="w-full py-4 bg-linear-to-r from-[#C4887C] to-[#D4A59A] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 text-lg"
                >
                  <Heart className="size-5" />
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