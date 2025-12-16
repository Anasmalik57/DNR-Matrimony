"use client";
import React, { useState } from "react";
import {
  X,
  UserPlus,
  MapPin,
  AlertCircle,
  IndianRupee,
  Upload,
  Loader2,
  Calendar,
  GraduationCap,
  Heart,
} from "lucide-react";
import { listedCastes, listedReligions } from "../DemoData/ListedData";
import CreatableSelect from "react-select/creatable";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/api";


const CreateProfileModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    phoneNumber: "",
    gender: "Male",
    dateOfBirth: "", // Naya field
    age: "", // Auto calculate hoga
    caste: "",
    religion: "",
    city: "",
    EmployementType: "",
    income: "",
    status: "Available",
    pic: "",
    educationQualification: "", // Required
    marriageType: "", // Required
    createdBy: "admin", // Fixed for admin panel
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const casteOptions = listedCastes.map((c) => ({ label: c, value: c }));
  const religionOptions = listedReligions.map((r) => ({ label: r, value: r }));

  // Auto calculate age from dateOfBirth
  const calculateAge = (dob) => {
    if (!dob) {
      setFormData((prev) => ({ ...prev, age: "" }));
      return;
    }
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setFormData((prev) => ({ ...prev, age: age }));
  };

  const handleUploadSuccess = (result) => {
    const url = result?.info?.secure_url;
    if (url) setFormData((prev) => ({ ...prev, pic: url }));
    setIsUploading(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.educationQualification.trim()) newErrors.educationQualification = "Education is required";
    if (!formData.marriageType) newErrors.marriageType = "Marriage type is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.income || formData.income <= 0) newErrors.income = "Valid income is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/profiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create profile");
      }
      const data = await res.json();
      onSubmit(data.data);
      onClose();
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto calculate age on dateOfBirth change
    if (name === "dateOfBirth") {
      calculateAge(value);
    }

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <UserPlus className="size-6 text-red-400" />
            <h2 className="text-2xl font-bold text-white">Create New Profile</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-all duration-200"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Profile Pic */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">Profile Pic</label>
            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              onSuccess={handleUploadSuccess}
              onQueuesStart={() => setIsUploading(true)}
              onQueuesEnd={() => setIsUploading(false)}
            >
              {({ open }) => (
                <div
                  onClick={() => open()}
                  className="border-2 border-dashed border-gray-600/50 rounded-xl text-center cursor-pointer hover:border-red-500/60 hover:bg-gray-800/30 transition-all duration-300 p-8"
                >
                  {isUploading ? (
                    <div className="space-y-3">
                      <Loader2 className="w-12 h-12 mx-auto animate-spin text-red-400" />
                      <p className="text-white text-sm">Uploading...</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {formData.pic ? (
                        <Image
                          src={formData.pic}
                          width={200}
                          height={200}
                          alt="Preview"
                          className="mx-auto rounded-xl object-cover"
                        />
                      ) : (
                        <Upload className="w-12 h-12 mx-auto text-gray-500" />
                      )}
                      <p className="text-gray-400">Click to upload profile picture</p>
                    </div>
                  )}
                </div>
              )}
            </CldUploadWidget>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border ${errors.fullName ? "border-red-500/50" : "border-gray-600/50"} focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 text-white transition-all`}
                  placeholder="Enter full name"
                />
                {errors.fullName && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="size-3" />{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Father's Name</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600/50 focus:border-red-500/50 text-white"
                  placeholder="Enter father's name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Mother's Name</label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600/50 focus:border-red-500/50 text-white"
                  placeholder="Enter mother's name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border ${errors.phoneNumber ? "border-red-500/50" : "border-gray-600/50"} focus:border-red-500/50 text-white`}
                  placeholder="9876543210"
                />
                {errors.phoneNumber && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="size-3" />{errors.phoneNumber}</p>}
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  <Calendar className="size-4" /> Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border ${errors.dateOfBirth ? "border-red-500/50" : "border-gray-600/50"} focus:border-red-500/50 text-white`}
                  max={new Date().toISOString().split("T")[0]}
                />
                {errors.dateOfBirth && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="size-3" />{errors.dateOfBirth}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Age (Auto-calculated)</label>
                <input
                  type="number"
                  value={formData.age}
                  disabled
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/70 border border-gray-600/50 text-gray-400 cursor-not-allowed"
                  placeholder="Will be calculated"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600/50 focus:border-red-500/50 text-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  <GraduationCap className="size-4" /> Education Qualification *
                </label>
                <input
                  type="text"
                  name="educationQualification"
                  value={formData.educationQualification}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border ${errors.educationQualification ? "border-red-500/50" : "border-gray-600/50"} focus:border-red-500/50 text-white`}
                  placeholder="e.g. B.Tech, M.Com, etc."
                />
                {errors.educationQualification && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="size-3" />{errors.educationQualification}</p>}
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  <Heart className="size-4" /> Marriage Type *
                </label>
                <select
                  name="marriageType"
                  value={formData.marriageType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border ${errors.marriageType ? "border-red-500/50" : "border-gray-600/50"} focus:border-red-500/50 text-white`}
                >
                  <option value="">Select marriage type</option>
                  <option value="Arranged">Arranged</option>
                  <option value="Love">Love</option>
                  <option value="Love cum Arranged">Love cum Arranged</option>
                </select>
                {errors.marriageType && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="size-3" />{errors.marriageType}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Caste</label>
                <CreatableSelect
                  options={casteOptions}
                  value={formData.caste ? { label: formData.caste, value: formData.caste } : null}
                  onChange={(selected) => setFormData((prev) => ({ ...prev, caste: selected?.value || "" }))}
                  placeholder="Select or type caste"
                  isClearable
                  className="text-slate-300"
                  styles={{
                    control: (base) => ({ ...base, backgroundColor: "#1f2937", borderColor: "#4b5563", borderRadius: "12px", padding: "6px 2px" }),
                    menu: (base) => ({ ...base, backgroundColor: "#1f2937" }),
                    singleValue: (base) => ({ ...base, color: "#fff" }),
                    input: (base) => ({ ...base, color: "#fff" }),
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Religion</label>
                <CreatableSelect
                  options={religionOptions}
                  value={formData.religion ? { label: formData.religion, value: formData.religion } : null}
                  onChange={(selected) => setFormData((prev) => ({ ...prev, religion: selected?.value || "" }))}
                  placeholder="Select or type religion"
                  isClearable
                  className="text-slate-300"
                  styles={{
                    control: (base) => ({ ...base, backgroundColor: "#1f2937", borderColor: "#4b5563", borderRadius: "12px", padding: "6px 2px" }),
                    menu: (base) => ({ ...base, backgroundColor: "#1f2937" }),
                    singleValue: (base) => ({ ...base, color: "#fff" }),
                    input: (base) => ({ ...base, color: "#fff" }),
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">City *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full pl-10 px-4 py-3 rounded-xl bg-gray-800/50 border ${errors.city ? "border-red-500/50" : "border-gray-600/50"} focus:border-red-500/50 text-white`}
                  placeholder="Delhi"
                />
              </div>
              {errors.city && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="size-3" />{errors.city}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Employment Type</label>
              <select
                name="EmployementType"
                value={formData.EmployementType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600/50 focus:border-red-500/50 text-white"
              >
                <option value="">Select type</option>
                <option value="Private Job">Private Job</option>
                <option value="Government Job">Government Job</option>
                <option value="Self Employed">Self Employed</option>
                <option value="Unemployed">Unemployed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Annual Income (₹) *</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                <input
                  type="number"
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  className={`w-full pl-10 px-4 py-3 rounded-xl bg-gray-800/50 border ${errors.income ? "border-red-500/50" : "border-gray-600/50"} focus:border-red-500/50 text-white`}
                  placeholder="500000"
                  min="0"
                />
              </div>
              {errors.income && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="size-3" />{errors.income}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-gray-800/50 border border-gray-600/50 text-gray-300 hover:bg-gray-700/50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-linear-to-r from-red-600 to-red-500 text-white font-semibold hover:from-red-700 hover:to-red-600 disabled:opacity-50 transition-all flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin size-4 border-2 border-white/20 border-t-white rounded-full"></div>
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus className="size-4" />
                  Create Profile
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfileModal;