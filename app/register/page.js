"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { occupations, marriageTypes } from "@/components/DemoData/Data";
import { showToast } from "nextjs-toast-notify";
import { listedCastes, listedReligions } from "@/components/DemoData/ListedData";
import CreatableSelect from "react-select/creatable";
import { API_BASE_URL } from "@/lib/api";


export default function RegistrationPage() {
  const [formData, setFormData] = useState({
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
    religion: "",
    city: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Caste & Religion Options
  const casteOptions = listedCastes.map((c) => ({ label: c, value: c }));
  const religionOptions = listedReligions.map((r) => ({ label: r, value: r }));

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
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
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
        showToast.error(`Please fill ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`, {
          duration: 4000,
          position: "top-center",
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/registrations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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

      // Reset form
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
        religion: "",
        city: "",
      });
    } catch (error) {
      showToast.error(error.message || "Something went wrong. Please try again.", {
        duration: 5000,
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Registration Form Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
        <div className="space-y-6">
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
                <option value="">Select occupation</option>
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
                <option value="">Select type</option>
                {marriageTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
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

          {/* Caste & Religion */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Religion <span className="text-rose-600">*</span>
              </label>
              <CreatableSelect
                options={religionOptions}
                value={formData.religion ? { label: formData.religion, value: formData.religion } : null}
                onChange={(selected) =>
                  setFormData((prev) => ({
                    ...prev,
                    religion: selected ? selected.value : "",
                  }))
                }
                placeholder="Select or type religion"
                isClearable
                isDisabled={isSubmitting}
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: "12px",
                    padding: "2px",
                    borderColor: "#d1d5db",
                  }),
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Caste <span className="text-rose-600">*</span>
              </label>
              <CreatableSelect
                options={casteOptions}
                value={formData.caste ? { label: formData.caste, value: formData.caste } : null}
                onChange={(selected) =>
                  setFormData((prev) => ({
                    ...prev,
                    caste: selected ? selected.value : "",
                  }))
                }
                placeholder="Select or type caste"
                isClearable
                isDisabled={isSubmitting}
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: "12px",
                    padding: "2px",
                    borderColor: "#d1d5db",
                  }),
                }}
              />
            </div>
          </div>

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
            className="w-full bg-linear-to-r cursor-pointer from-rose-800 to-rose-900 text-white py-4 rounded-full font-semibold text-lg hover:from-rose-900 hover:to-rose-950 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
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