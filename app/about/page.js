"use client";
import { values, features, milestones, } from "@/components/DemoData/AboutUsPageData";
import { Heart, Users, Clock, Award, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AboutUsPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-rose-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-linear-to-br from-rose-300 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-linear-to-tl from-pink-300 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-linear-to-br from-rose-400 to-transparent rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-block">
            <div className="bg-linear-to-r from-rose-700 via-rose-800 to-rose-900 text-transparent bg-clip-text">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-2">
                About DNR Marriage Bureau
              </h1>
            </div>
          </div>
          <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed"> For over 15 years, we've been bringing Telugu families together with trust, dedication, and personalized matchmaking services across Andhra Pradesh and Telangana. </p>
          <div className="h-1 w-24 bg-linear-to-r from-rose-700 to-rose-900 mx-auto rounded-full"></div>
        </div>

        {/* Story Section */}
        <div className="mb-20">
          <div className="bg-white rounded-3xl p-10 lg:p-16 shadow-2xl border border-rose-100">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
                <div className="h-1 w-16 bg-linear-to-r from-rose-700 to-rose-900 rounded-full"></div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Founded by{" "}
                  <span className="font-bold text-rose-800">D. Nagaraju</span>{" "} in 2009, DNR Marriage Bureau began with a simple mission: to help Telugu families find perfect life partners through personalized, trustworthy matchmaking services.</p>
                <p className="text-gray-700 text-lg leading-relaxed">What started as a small office in Adoni has grown into one of the most trusted matrimony services in Andhra Pradesh and Telangana, with over 1000+ successful marriages to our credit. </p>
                <p className="text-gray-700 text-lg leading-relaxed">Unlike online platforms that rely on algorithms, we believe in the power of personal connection, family values, and human understanding to create lasting relationships. </p>
              </div>
              <div className="relative">
                <div className="aspect-square relative">
                  <div className="absolute inset-0 bg-linear-to-br from-rose-700 to-rose-900 rounded-3xl transform rotate-6"></div>
                  <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-8xl transform -rotate-3">💑</div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-linear-to-br from-rose-600 to-rose-800 text-white rounded-2xl p-6 shadow-xl">
                  <p className="text-3xl font-bold">15+</p>
                  <p className="text-sm">Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">The principles that guide every match we make</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white cursor-pointer rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-rose-100 group" >
                  <div className={`inline-flex p-4 rounded-2xl bg-linear-to-br ${value.color} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`} >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="hidden md:block mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Key milestones in our 15-year legacy</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-rose-700 via-rose-800 to-rose-900 transform -translate-x-1/2"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center gap-8 ${ index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse" }`} >
                  <div className={`flex-1 ${ index % 2 === 0 ? "lg:text-right" : "lg:text-left" }`} >
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-rose-100">
                      <h3 className="text-3xl font-bold text-rose-800 mb-2">{milestone.year}</h3>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h4>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden lg:flex w-16 h-16 rounded-full bg-linear-to-br from-rose-700 to-rose-900 items-center justify-center shadow-xl z-10 shrink-0">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="bg-linear-to-br from-rose-700 via-rose-800 to-rose-900 rounded-3xl p-10 lg:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>

            <div className="relative">
              <h2 className="text-4xl font-bold text-white text-center mb-12">Why Choose DNR?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300" >
                      <Icon className="w-6 h-6 text-white shrink-0" />
                      <span className="text-white font-medium">{feature.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { icon: Heart, value: "1000+", label: "Happy Marriages" },
            { icon: Users, value: "2000+", label: "Active Members" },
            { icon: TrendingUp, value: "95%", label: "Success Rate" },
            { icon: Clock, value: "15+", label: "Years Experience" },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-rose-100 text-center group" >
                <div className="inline-flex p-4 rounded-xl bg-linear-to-br from-rose-700 to-rose-900 shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-linear-to-r from-rose-700 via-rose-800 to-rose-900 rounded-3xl p-12 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-5"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>

          <div className="relative space-y-6">
            <h2 className="text-3xl lg:text-5xl font-bold text-white">Ready to Find Your Perfect Match?</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">Join our family of 1000+ successful couples. Let us help you begin your journey to a happy married life.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 text-sm">
              <button onClick={()=> router.push('/register')} className="px-8 py-4 bg-white text-rose-800 rounded-full font-semibold  shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">Register Free Now</button>
              <button onClick={()=> router.push('/services/contactUs')} className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold  hover:bg-white hover:text-rose-800 transition-all duration-300">Contact Us</button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
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
