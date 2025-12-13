"use client";
import { useState } from "react";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { showToast } from "nextjs-toast-notify";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { email, password } = formData;

    if (!email || !password) {
      showToast.error("Please fill in both email and password", {
        duration: 4000,
        position: "top-right",
        transition: "bounceIn",
      });
      return;
    }

    setLoading(true);

    // Simulate slight delay for better UX
    setTimeout(() => {
      if (email === "admin12@mail.com" && password === "adminDRN@57") {
        showToast.success("Login Successful! Redirecting to admin panel...", {
          duration: 3000,
          position: "top-right",
          transition: "bounceIn",
          sound: true,
        });

        setTimeout(() => {
          router.push("/admin/registrations");
        }, 3000);
      } else {
        console.error("Login failed: Invalid credentials");
        showToast.error("Invalid email or password", {
          duration: 4000,
          position: "top-right",
          transition: "bounceIn",
        });
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen grid place-items-center bg-linear-to-tl from-[#FFF0DD] to-[#f7dfc2]">
      {/* Login Form Card */}
      <div className="bg-white min-w-xl rounded-3xl shadow-2xl p-8 lg:p-12 max-w-md mx-auto">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Admin Login</h2>
            <p className="text-gray-600 mt-2">Access the registration dashboard</p>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address <span className="text-rose-600">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin12@mail.com"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password <span className="text-rose-600">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full cursor-pointer bg-rose-800 text-white py-4 rounded-full font-semibold text-lg hover:from-rose-900 hover:to-rose-900 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
            {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </button>

          {/* Hint (only visible in development) */}
            <p className="text-xs text-gray-500 text-center mt-6">
              Hint: admin12@mail.com / adminDRN@57
            </p>
        </div>
      </div>
    </div>
  );
}