"use client"
import Image from "next/image";
import { useState } from "react";
import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";

const contactInfo = [
  {
    id: 1,
    icon: MapPin,
    title: "Office Address",
    detail: "12/B, MG Road, Calicut, Kerala",
  },
  {
    id: 2,
    icon: Mail,
    title: "Email Address",
    detail: "support@dnrmatrimony.com",
  },
  {
    id: 3,
    icon: Phone,
    title: "Phone Number",
    detail: "+91 98765 43210",
  },
];

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Add your form submission logic here
    alert("Thank you for contacting us! We'll get back to you soon.");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="relative bg-linear-to-br from-gray-50 via-white to-gray-50 py-20 lg:py-32 overflow-hidden">
      {/* Left Background Flowers */}
      <div className="absolute left-0 bottom-0 w-48 lg:w-72 h-auto opacity-20">
        <Image
          src="/bgflowers.png"
          alt="Decorative Flowers"
          width={400}
          height={600}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Right Background Flowers */}
      <div className="absolute right-0 top-0 w-48 lg:w-72 h-auto opacity-20">
        <Image
          src="/bgflowers2.png"
          alt="Decorative Flowers"
          width={400}
          height={600}
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Content */}
          <div className="space-y-12">
            {/* Header */}
            <div className="space-y-4">
              <p className="text-rose-700 tracking-[0.3em] text-sm font-medium uppercase">
                CONTACT US
              </p>
              <h2 className="text-3xl lg:text-5xl font-serif text-gray-900 leading-tight">
                Get In Touch With Us
              </h2>
              <p className="text-gray-600 text-base leading-relaxed max-w-xl">
                We are here to help you find your perfect match with comfort, trust, and genuine support—making your journey simple, meaningful, and stress-free.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((info) => {
                const IconComponent = info.icon;
                return (
                  <div key={info.id} className="flex items-start gap-4">
                    <div className="shrink-0 size-12 bg-rose-800 rounded-full flex items-center justify-center shadow-lg">
                      <IconComponent className="w-5 text-white" strokeWidth={2} />
                    </div>
                    <div className="pt-1">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {info.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-linear-to-br from-amber-50 to-orange-100 rounded-3xl p-8 lg:p-10 shadow-xl">
            <div className="space-y-5">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-gray-800 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Email and Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-gray-800 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Address"
                    className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-gray-800 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Number"
                    className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-gray-800 font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write here..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-rose-800 text-white py-3 rounded-full font-semibold text-lg hover:bg-rose-900 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                Submit
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}