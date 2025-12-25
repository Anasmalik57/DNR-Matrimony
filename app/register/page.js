"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { occupations, marriageTypes } from "@/components/DemoData/Data";
import { showToast } from "nextjs-toast-notify";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image"; // agar preview ke liye use kar rahe ho
import {
  listedCastes,
  listedReligions,
} from "@/components/DemoData/ListedData";
import { API_BASE_URL } from "@/lib/api";

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    educationQualification: "",
    marriageType: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    age: "",
    caste: "",
    customCaste: "",
    religion: "",
    EmployementType: "",
    customEmployementType: "",
    customReligion: "",
    city: "",
    pic: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadSuccess = (result) => {
    const url = result?.info?.secure_url;
    if (url) {
      setFormData((prev) => ({ ...prev, pic: url }));
    }
    setIsUploading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      let updated = { ...prev, [name]: value };

      // Auto-calculate age from dateOfBirth
      if (name === "dateOfBirth" && value) {
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        updated.age = age.toString();
      }
      return updated;
    });
  };

  const handleSubmit = async () => {
    // Basic client-side validation
    const requiredFields = [
      "fullName",
      "fatherName",
      "motherName",
      "educationQualification",
      "EmployementType",
      "marriageType",
      "phoneNumber",
      "gender",
      "dateOfBirth",
      "caste",
      "religion",
      "city",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        showToast.error(
          `Please fill ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`,
          {
            duration: 4000,
            position: "top-center",
          }
        );
        return;
      }
    }

    // caste check
    if (formData.caste === "Other" && !formData.customCaste) {
      showToast.error("Please specify your caste", {
        duration: 4000,
        position: "top-center",
      });
      return;
    }
    // Religion check
    if (formData.religion === "Other" && !formData.customReligion) {
      showToast.error("Please specify your religion", {
        duration: 4000,
        position: "top-center",
      });
      return;
    }

    // NAYA: EmployementType check
    if (
      formData.EmployementType === "Other" &&
      !formData.customEmployementType
    ) {
      showToast.error("Please specify your employment type", {
        duration: 4000,
        position: "top-center",
      });
      return;
    }

    setIsSubmitting(true);

    // Prepare data for backend (matching ProfileSchema)
    let submitData = {
      ...formData,
      createdBy: "user", // Fixed as user registration
      pic: formData.pic || "/avatar.png", // Default placeholder image
      income: 0, // Default value
      status: "Available", // Default status
    };

    // Handle custom caste
    if (formData.caste === "Other" && formData.customCaste) {
      submitData.caste = formData.customCaste;
    }

    // For religion
    if (formData.religion === "Other" && formData.customReligion) {
      submitData.religion = formData.customReligion;
    }

    // For EmployementType
    if (
      formData.EmployementType === "Other" &&
      formData.customEmployementType
    ) {
      submitData.EmployementType = formData.customEmployementType;
    }

    // Remove customCaste/religion/employementType from payload
    delete submitData.customCaste;
    delete submitData.customReligion;
    delete submitData.customEmployementType;

    try {
      const res = await fetch(`${API_BASE_URL}/profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Registration failed");
      }

      const result = await res.json();

      showToast.success("Congrats 😃! Registration Successful.", {
        duration: 4000,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
        sound: true,
      });

      // Reset form after success
      setFormData({
        fullName: "",
        fatherName: "",
        motherName: "",
        educationQualification: "",
        EmployementType: "",
        marriageType: "",
        phoneNumber: "",
        gender: "",
        dateOfBirth: "",
        age: "",
        caste: "",
        customCaste: "",
        EmployementType: "",
        customEmployementType: "",
        religion: "",
        city: "",
      });
    } catch (error) {
      showToast.error(
        error.message || "Something went wrong. Please try again.",
        {
          duration: 5000,
          position: "top-center",
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // UI remains exactly the same (no changes here)
  return (
    <>
      <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
        <div className="space-y-6">
          {/* All your existing form fields - unchanged */}
          {/* Full Name & Phone Number */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number <span className="text-rose-600">*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Father's & Mother's Name */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Father's Name <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="Enter father's name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Mother's Name <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                placeholder="Enter mother's name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                disabled={isSubmitting}
              />
            </div>
          </div>
          {/* Profile Photo Section */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Profile Photo{" "}
              <span className="text-gray-500 text-sm">(Optional)</span>
            </label>
            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              onQueuesStart={() => setIsUploading(true)}
              onQueuesEnd={() => setIsUploading(false)}
              onSuccess={handleUploadSuccess}
            >
              {({ open }) => (
                <div
                  onClick={() => open()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-rose-500 hover:bg-rose-50 transition-all"
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mb-4"></div>
                      <p className="text-gray-600">Uploading...</p>
                    </div>
                  ) : formData.pic ? (
                    <div className="space-y-4">
                      <img
                        src={formData.pic}
                        alt="Preview"
                        className="mx-auto h-32 w-32 object-cover rounded-full border-4 border-rose-200"
                      />
                      <p className="text-sm text-green-600">
                        Photo uploaded successfully!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg
                          className="w-12 h-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-600">Click to upload photo</p>
                      <p className="text-xs text-gray-500">
                        If not uploaded, default avatar will be used
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CldUploadWidget>
          </div>

          {/* Education Qualification */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Education Qualification <span className="text-rose-600">*</span>
            </label>
            <select
              name="educationQualification"
              value={formData.educationQualification}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all bg-white"
              disabled={isSubmitting}
            >
              <option value="">Select education</option>
              <option value="High School">High School</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Graduate">Graduate</option>
              <option value="Post Graduate">Post Graduate</option>
              <option value="Diploma">Diploma</option>
              <option value="PhD">PhD</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Working As & Marriage Type */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Working As <span className="text-rose-600">*</span>
              </label>
              <select
                name="EmployementType"
                value={formData.EmployementType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all bg-white"
                disabled={isSubmitting}
              >
                {occupations.map((occ) => (
                  <option key={occ} value={occ}>
                    {occ}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Marriage Type <span className="text-rose-600">*</span>
              </label>
              <select
                name="marriageType"
                value={formData.marriageType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all bg-white"
                disabled={isSubmitting}
              >
                {marriageTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Working As */}
            {formData.EmployementType === "Other" && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Specify Employment Type{" "}
                  <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  name="customEmployementType"
                  value={formData.customEmployementType}
                  onChange={handleChange}
                  placeholder="Enter your employment type"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                  disabled={isSubmitting}
                />
              </div>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              Gender <span className="text-rose-600">*</span>
            </label>
            <div className="flex gap-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  className="w-5 h-5 text-rose-600 focus:ring-rose-500"
                  disabled={isSubmitting}
                />
                <span className="ml-2 text-gray-700">Male</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  className="w-5 h-5 text-rose-600 focus:ring-rose-500"
                  disabled={isSubmitting}
                />
                <span className="ml-2 text-gray-700">Female</span>
              </label>
            </div>
          </div>

          {/* Date of Birth & Age */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Date of Birth <span className="text-rose-600">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Age
              </label>
              <input
                type="number"
                value={formData.age}
                readOnly
                placeholder="Auto-calculated"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
              />
            </div>
          </div>

          {/* Religion & Caste */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Religion <span className="text-rose-600">*</span>
              </label>
              <select
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all bg-white"
              >
                <option value="">Select religion</option>
                {listedReligions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Caste <span className="text-rose-600">*</span>
              </label>
              <select
                name="caste"
                value={formData.caste}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all bg-white"
              >
                {listedCastes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Custom Religion */}
          {formData.religion === "Other" && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Specify Religion <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                name="customReligion"
                value={formData.customReligion}
                onChange={handleChange}
                placeholder="Enter your religion"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                disabled={isSubmitting}
              />
            </div>
          )}

          {/* Custom Caste */}
          {formData.caste === "Other" && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Specify Caste <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                name="customCaste"
                value={formData.customCaste}
                onChange={handleChange}
                placeholder="Enter your caste"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                disabled={isSubmitting}
              />
            </div>
          )}

          {/* City */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              City <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
              disabled={isSubmitting}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-linear-to-r from-rose-800 to-rose-900 text-white py-4 rounded-full font-semibold text-lg hover:from-rose-900 hover:to-rose-950 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>Submitting...</>
            ) : (
              <>
                Register
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
