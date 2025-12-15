"use client";
import React, { useState } from "react";
import { X, UserPlus, MapPin, AlertCircle, IndianRupee } from "lucide-react";
import { listedCastes, listedReligions } from "../DemoData/ListedData";
import CreatableSelect from "react-select/creatable";

const CreateProfileModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    phone: "",
    gender: "Male",
    age: "",
    caste: "",
    religion: "",
    city: "",
    employmentType: "",
    income: "",
    status: "Available",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ====================================================================

  const casteOptions = listedCastes.map((c) => ({
    label: c,
    value: c,
  }));

  const religionOptions = listedReligions.map((r) => ({
    label: r,
    value: r,
  }));

  // ====================================================================

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.age || formData.age <= 0)
      newErrors.age = "Valid age is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.income || formData.income <= 0)
      newErrors.income = "Valid income is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit({ ...formData, id: Date.now().toString(), createdBy: "Admin" });
      onClose();
    } catch (error) {
      console.error("Error creating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <UserPlus className="size-6 text-red-400" />
            <h2 className="text-2xl font-bold text-white">
              Create New Profile
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-all duration-200"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600/50 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 text-white placeholder-gray-500 transition-all duration-200 ${
                    errors.fullName ? "border-red-500/50" : ""
                  }`}
                  placeholder="Enter full name"
                />
                {errors.fullName && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Father's Name
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600/50 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 text-white placeholder-gray-500 transition-all duration-200"
                  placeholder="Enter father's name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Mother's Name
                </label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600/50 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 text-white placeholder-gray-500 transition-all duration-200"
                  placeholder="Enter mother's name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600/50 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 text-white placeholder-gray-500 transition-all duration-200 ${
                    errors.phone ? "border-red-500/50" : ""
                  }`}
                  placeholder="+91 9876543210"
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Demographics */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600/50 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 text-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600/50 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 text-white placeholder-gray-500 transition-all duration-200 ${
                    errors.age ? "border-red-500/50" : ""
                  }`}
                  placeholder="28"
                  min="1"
                />
                {errors.age && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {errors.age}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Caste
                </label>
                <CreatableSelect
                  options={casteOptions}
                  value={ formData.caste ? { label: formData.caste, value: formData.caste } : null }
                  onChange={(selected) => setFormData((prev) => ({ ...prev, caste: selected ? selected.value : "" })) }
                  placeholder="Select or type caste"
                  isClearable
                  className="text-slate-300"
                  styles={{
                    control: (base) => ({ ...base, backgroundColor: "#1f2937", borderColor: "#4b5563", borderRadius: "12px", padding: "6px 2px" }),
                    menu: (base) => ({ ...base, backgroundColor: "#1f2937"}),
                    singleValue: (base) => ({ ...base, color: "#fff" }),
                    input: (base) => ({ ...base, color: "#fff" }),
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Religion
                </label>
                <CreatableSelect
                  options={religionOptions}
                  value={ formData.religion ? { label: formData.religion, value: formData.religion } : null }
                  onChange={(selected) => setFormData((prev) => ({ ...prev, religion: selected ? selected.value : "" })) }
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

          {/* Location & Employment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 md:col-span-1">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  City *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full pl-10 px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600/50 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 text-white placeholder-gray-500 transition-all duration-200 ${
                      errors.city ? "border-red-500/50" : ""
                    }`}
                    placeholder="Delhi"
                  />
                </div>
                {errors.city && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {errors.city}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4 md:col-span-1">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Employment Type
                </label>
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600/50 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 text-white"
                >
                  <option value="">Select type</option>
                  <option value="Private Job">Private Job</option>
                  <option value="Government Job">Government Job</option>
                  <option value="Self Employed">Self Employed</option>
                  <option value="Unemployed">Unemployed</option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-col-2">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Annual Income (₹) *
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                <input
                  type="number"
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  className={`w-full pl-10 px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600/50 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 text-white placeholder-gray-500 transition-all duration-200 ${
                    errors.income ? "border-red-500/50" : ""
                  }`}
                  placeholder="500000"
                  min="0"
                />
              </div>
              {errors.income && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="size-3" />
                  {errors.income}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600/50 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 text-white"
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>
          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-gray-800/50 border border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500/50 transition-all duration-200 flex items-center gap-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-linear-to-r from-red-600 to-red-500 text-white font-semibold hover:from-red-700 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
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
