"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  occupations,
  marriageTypes,
  religions,
  castesByReligion,
  defaultCastes,
} from "@/components/DemoData/Data";
import { showToast } from "nextjs-toast-notify";

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    education: "",
    occupation: "",
    marriageType: "",
    phone: "",
    gender: "",
    dob: "",
    age: "",
    caste: "",
    religion: "",
    city: "",
  });

  // To store the current available castes based on selected religion
  const [availableCastes, setAvailableCastes] = useState(defaultCastes);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // When religion changes, update available castes and reset caste selection
    if (name === "religion") {
      const selectedCastes = castesByReligion[value] || defaultCastes;
      setAvailableCastes(selectedCastes);
      setFormData((prev) => ({
        ...prev,
        caste: "", // reset caste when religion changes
      }));
    }

    // Auto-calculate age from DOB
    if (name === "dob" && value) {
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
      setFormData((prev) => ({ ...prev, age: age.toString() }));
    }
  };

  const handleSubmit = () => {
    // LocalStorage mein form data save karo
    localStorage.setItem("registrationData", JSON.stringify(formData));

    console.log("Registration Data:", formData);

    showToast.success("Congrats 😃! Registration Successfull", {
      duration: 4000,
      progress: true,
      position: "top-right",
      transition: "bounceIn",
      icon: "",
      sound: true,
    });

    setTimeout(() => {
      setFormData({
        fullName: "",
        fatherName: "",
        motherName: "",
        education: "",
        occupation: "",
        marriageType: "",
        phone: "",
        gender: "",
        dob: "",
        age: "",
        caste: "",
        religion: "",
        city: "",
      });
    }, 500);
  };

  return (
    <>
      {/* Registration Form Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
        <div className="space-y-6">
          {/* Full Name */}
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
              />
            </div>
            {/* Phone Number */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number <span className="text-rose-600">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Father's Name & Mother's Name */}
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
              />
            </div>
          </div>

          {/* Education Qualification */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Education Qualification <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="e.g., Bachelor's in Engineering"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Working As & Marriage Type */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Working As <span className="text-rose-600">*</span>
              </label>
              <select
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all bg-white"
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
              >
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
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Age
              </label>
              <input
                type="number"
                name="age"
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
              <select
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all bg-white"
              >
                {religions.map((religion) => (
                  <option key={religion} value={religion}>
                    {religion}
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all bg-white"
              >
                {availableCastes.map((caste) => (
                  <option key={caste} value={caste}>
                    {caste}
                  </option>
                ))}
              </select>
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
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-linear-to-r cursor-pointer from-rose-800 to-rose-900 text-white py-4 rounded-full font-semibold text-lg hover:from-rose-900 hover:to-rose-950 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group mt-8"
          >
            Register
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Login Link */}
          {/* <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-rose-700 font-semibold hover:text-rose-800 transition-colors"
            >
              Login
            </Link>
          </p> */}
        </div>
      </div>
    </>
  );
}
