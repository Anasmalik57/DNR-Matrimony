"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, User, MessageSquare, Calendar } from "lucide-react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    timeToCall: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    
    // Optional: Show success message
    alert("Thank you for contacting us! We will get back to you soon.");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      gender: "",
      age: "",
      timeToCall: "",
      description: ""
    });
  };

  const timeSlots = [
    "9:00 AM - 11:00 AM",
    "11:00 AM - 1:00 PM",
    "1:00 PM - 3:00 PM",
    "3:00 PM - 5:00 PM",
    "5:00 PM - 7:00 PM",
    "7:00 PM - 9:00 PM"
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-rose-50 to-amber-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-linear-to-br from-rose-200 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-linear-to-tl from-amber-200 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-block">
            <div className="bg-linear-to-r from-rose-600 to-amber-600 text-transparent bg-clip-text">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-2">
                Get In Touch
              </h1>
            </div>
          </div>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            We're here to help you find your perfect match. Reach out to us anytime!
          </p>
          <div className="h-1 w-24 bg-linear-to-r from-rose-500 to-amber-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-100">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                <p className="text-gray-600">Fill out the form below and we'll get back to you shortly</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 mr-2 text-rose-600" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email and Phone Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="w-4 h-4 mr-2 text-rose-600" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 mr-2 text-rose-600" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-300"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                {/* Gender, Age, Time to Call Row */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <User className="w-4 h-4 mr-2 text-rose-600" />
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-300 bg-white"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 mr-2 text-rose-600" />
                      Age *
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      min="18"
                      max="100"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-300"
                      placeholder="Age"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <Clock className="w-4 h-4 mr-2 text-rose-600" />
                      Best Time to Call *
                    </label>
                    <select
                      name="timeToCall"
                      value={formData.timeToCall}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-300 bg-white"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((slot, index) => (
                        <option key={index} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description Field */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 mr-2 text-rose-600" />
                    Message / Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-300 resize-none"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-rose-600 to-amber-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            {/* Office Address Card */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300">
              <div className="inline-flex p-4 rounded-2xl bg-linear-to-br from-rose-500 to-pink-600 shadow-lg mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visit Our Office</h3>
              <div className="space-y-2 text-gray-600 leading-relaxed">
                <p className="font-semibold text-gray-900">D. Nagaraju</p>
                <p>Dno 17/661 RRL Colony</p>
                <p>Alur Road Adoni</p>
                <p>Kurnool dt</p>
                <p className="font-semibold">Andhra Pradesh</p>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-linear-to-br from-rose-600 to-pink-600 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 text-white">
              <div className="inline-flex p-4 rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Email Us</h3>
              <a 
                href="mailto:dnrmarrigebuero6000@gmail.com"
                className="text-white/90 hover:text-white break-all underline decoration-white/50 hover:decoration-white transition-all duration-300"
              >
                dnrmarrigebuero6000@gmail.com
              </a>
            </div>

            {/* Working Hours Card */}
            <div className="bg-linear-to-br from-amber-500 to-orange-600 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 text-white">
              <div className="inline-flex p-4 rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Working Hours</h3>
              <div className="space-y-2">
                <p className="text-white/90">Monday - Saturday</p>
                <p className="font-semibold text-xl">9:00 AM - 9:00 PM</p>
                <p className="text-white/90 text-sm">Sunday: By Appointment</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}