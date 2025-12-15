"use client";
import { useState } from "react";
import { Star, Quote, Heart, Users, TrendingUp, Award } from "lucide-react";
import Link from "next/link";

export default function TestimonialsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const testimonials = [
    {
      id: 1,
      name: "Rajesh & Priya Sharma",
      location: "Hyderabad, Telangana",
      image: "👫",
      rating: 5,
      category: "success",
      date: "Married in Dec 2024",
      testimonial: "We are incredibly grateful to DNR Marriage Bureau for helping us find each other. The team was professional, understanding, and truly cared about our preferences. Within just 3 months, we found our perfect match! The personalized service and attention to detail made all the difference. Highly recommended for Telugu families!",
      highlights: ["Found match in 3 months", "Professional service", "Family-oriented"]
    },
    {
      id: 2,
      name: "Srinivas & Lakshmi Reddy",
      location: "Vijayawada, AP",
      image: "💑",
      rating: 5,
      category: "success",
      date: "Married in Nov 2024",
      testimonial: "After searching for the right match for over a year on various platforms, we finally found success with DNR Marriage Bureau. D. Nagaraju sir personally took care of our requirements and arranged meetings that were meaningful. The transparency in the process and genuine efforts to understand family values impressed us. Today we are happily married, thanks to this wonderful service!",
      highlights: ["Personalized attention", "Transparent process", "Value-based matching"]
    },
    {
      id: 3,
      name: "Venkat & Sowmya Krishna",
      location: "Kurnool, AP",
      image: "👩‍❤️‍👨",
      rating: 5,
      category: "success",
      date: "Married in Oct 2024",
      testimonial: "Being from a traditional Telugu family, we were looking for a bureau that understands our culture and values. DNR Marriage Bureau exceeded our expectations! The team arranged meetings with families that matched our horoscope, education, and family background perfectly. Their follow-up and support throughout the process was exceptional.",
      highlights: ["Cultural understanding", "Horoscope matching", "Exceptional support"]
    },
    {
      id: 4,
      name: "Madhavi Rao",
      location: "Guntur, AP",
      image: "👰",
      rating: 5,
      category: "parent",
      date: "Daughter married in Sep 2024",
      testimonial: "As a parent, finding the right match for my daughter was my priority. DNR Marriage Bureau made this journey smooth and stress-free. They understood our requirements, verified all profiles thoroughly, and introduced us to genuine families. The respect and care they showed throughout the process was remarkable. My daughter is now happily settled, and we couldn't be more thankful!",
      highlights: ["Thorough verification", "Parent-friendly", "Genuine profiles"]
    },
    {
      id: 5,
      name: "Ramesh & Divya Naidu",
      location: "Tirupati, AP",
      image: "💏",
      rating: 5,
      category: "success",
      date: "Married in Aug 2024",
      testimonial: "We had almost given up hope after several failed attempts on online matrimony sites. DNR Marriage Bureau restored our faith with their dedicated and personalized service. Unlike automated platforms, here we dealt with real people who genuinely cared. The meeting arrangements were convenient, and the communication was always clear. Found our soulmate within 4 months!",
      highlights: ["Personalized service", "Clear communication", "Quick results"]
    },
    {
      id: 6,
      name: "Suresh Kumar (Parent)",
      location: "Nellore, AP",
      image: "👨‍👩‍👦",
      rating: 5,
      category: "parent",
      date: "Son married in Jul 2024",
      testimonial: "Looking for a suitable bride for my son, I contacted multiple marriage bureaus, but DNR stood out with their professionalism and authenticity. They took time to understand our family values, caste preferences, and financial expectations. Every profile shared was relevant and verified. The team's experience in Telugu matrimony is evident. Excellent service from start to finish!",
      highlights: ["Relevant profiles", "Professional approach", "Experienced team"]
    },
    {
      id: 7,
      name: "Anitha & Karthik Reddy",
      location: "Kakinada, AP",
      image: "🥰",
      rating: 5,
      category: "success",
      date: "Married in Jun 2024",
      testimonial: "What sets DNR Marriage Bureau apart is their human touch in an increasingly digital world. They didn't just match profiles; they matched families, values, and dreams. The team ensured both families were comfortable at every step. The meeting arrangement service was particularly helpful as we live in different cities. Thank you for bringing us together!",
      highlights: ["Family matching", "Inter-city coordination", "Human touch"]
    },
    {
      id: 8,
      name: "Gayatri Devi (Parent)",
      location: "Adoni, AP",
      image: "👵",
      rating: 5,
      category: "parent",
      date: "Daughter married in May 2024",
      testimonial: "Being a widow, finding the right match for my daughter was challenging. DNR Marriage Bureau treated us with utmost respect and sensitivity. D. Nagaraju sir personally handled our case and ensured we met families with similar backgrounds. The affordable pricing and no hidden charges made it accessible for us. Forever grateful for your compassionate service!",
      highlights: ["Compassionate service", "Affordable pricing", "No hidden charges"]
    },
    {
      id: 9,
      name: "Harish & Swathi Varma",
      location: "Rajahmundry, AP",
      image: "💝",
      rating: 5,
      category: "success",
      date: "Married in Apr 2024",
      testimonial: "As working professionals with busy schedules, we appreciated DNR Marriage Bureau's efficient service. They coordinated meetings according to our availability, shared profiles via WhatsApp, and provided regular updates. The quality of profiles was excellent - well-educated, family-oriented matches. We found our perfect partner within 2 months. Highly efficient and reliable service!",
      highlights: ["Efficient service", "Quality profiles", "Regular updates"]
    },
    {
      id: 10,
      name: "Prasad Rao (Parent)",
      location: "Anantapur, AP",
      image: "👴",
      rating: 5,
      category: "parent",
      date: "Son married in Mar 2024",
      testimonial: "After trying online matrimony for 2 years without success, we turned to DNR Marriage Bureau. The difference was night and day! Personal meetings, genuine profiles, and a team that actually listens. They arranged meetings in our city and ensured both families were satisfied. The traditional approach with modern efficiency is their strength. My son is happily married now. Thank you DNR team!",
      highlights: ["Traditional values", "Genuine profiles", "Local meetings"]
    }
  ];

  const stats = [
    { icon: Heart, value: "500+", label: "Happy Couples" },
    { icon: Users, value: "1000+", label: "Active Members" },
    { icon: TrendingUp, value: "95%", label: "Success Rate" },
    { icon: Award, value: "15+", label: "Years Experience" }
  ];

  const filteredTestimonials = activeFilter === "all" 
    ? testimonials 
    : testimonials.filter(t => t.category === activeFilter);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-rose-50 to-red-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-linear-to-br from-rose-200 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-linear-to-tl from-red-200 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-linear-to-br from-purple-200 to-transparent rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-block">
            <div className="bg-linear-to-r from-rose-600 to-red-600 text-transparent bg-clip-text">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-2">
                Success Stories
              </h1>
            </div>
          </div>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Real couples, real love stories. See what our happy families have to say!
          </p>
          <div className="h-1 w-24 bg-linear-to-r from-rose-500 to-red-800 mx-auto rounded-full"></div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 text-center"
              >
                <div className="inline-flex p-3 rounded-xl bg-linear-to-br from-rose-500 to-pink-600 shadow-lg mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeFilter === "all"
                ? "bg-linear-to-r from-rose-600 to-red-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 shadow"
            }`}
          >
            All Stories ({testimonials.length})
          </button>
          <button
            onClick={() => setActiveFilter("success")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeFilter === "success"
                ? "bg-linear-to-r from-rose-600 to-red-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 shadow"
            }`}
          >
            Couples ({testimonials.filter(t => t.category === "success").length})
          </button>
          <button
            onClick={() => setActiveFilter("parent")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeFilter === "parent"
                ? "bg-linear-to-r from-rose-600 to-red-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 shadow"
            }`}
          >
            Parents ({testimonials.filter(t => t.category === "parent").length})
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 relative overflow-hidden group"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <Quote className="w-32 h-32 text-rose-500" />
              </div>

              {/* Header */}
              <div className="flex items-start gap-4 mb-6 relative">
                <div className="text-5xl">{testimonial.image}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{testimonial.location}</p>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-red-400 text-red-400" />
                    ))}
                  </div>
                  <span className="inline-block px-3 py-1 bg-rose-100 text-rose-700 text-xs font-semibold rounded-full">
                    {testimonial.date}
                  </span>
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 leading-relaxed mb-6 relative">
                {testimonial.testimonial}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                {testimonial.highlights.map((highlight, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-linear-to-r from-rose-50 to-red-50 text-rose-700 text-xs font-medium rounded-full border border-rose-200"
                  >
                    ✓ {highlight}
                  </span>
                ))}
              </div>

              {/* Decorative Element */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-linear-to-tl from-rose-100 to-transparent rounded-tl-full opacity-50"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20">
          <div className="bg-linear-to-r from-rose-600 via-pink-600 to-red-600 rounded-3xl p-12 shadow-2xl text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-5"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Start Your Success Story Today!
              </h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                Join hundreds of happy couples who found their perfect match through DNR Marriage Bureau
              </p>
              <Link href={"/register"} className="px-8 py-4 bg-white text-rose-600 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Register Free Now
              </Link>
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
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}