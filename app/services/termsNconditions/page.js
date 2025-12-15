"use client";
import { termsContent } from "@/components/DemoData/TermsContentData";
import Link from "next/link";

export default function TermsNconditionsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-rose-50 to-amber-50 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-linear-to-br from-rose-200 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-linear-to-tl from-amber-200 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-linear-to-br from-purple-200 to-transparent rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-2">
          <div className="inline-block">
            <div className="bg-linear-to-r from-rose-600 to-amber-600 text-transparent bg-clip-text">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-2"> Terms & Conditions</h1>
            </div>
          </div>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">Transparent pricing, honest service</p>
          <div className="h-1 w-24 bg-linear-to-r from-rose-500 to-amber-500 mx-auto rounded-full"></div>
        </div>

        {/* Terms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {termsContent.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 ease-in hover:-translate-y-2 border border-red-500/20 overflow-hidden cursor-pointer">
                {/* linear Background on Hover */}
                <div className={`absolute inset-0 bg-linear-to-br ${item?.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`inline-flex p-4 rounded-2xl bg-linear-to-br ${item?.color} shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative space-y-3">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:bg-clip-text group-hover:from-rose-600 group-hover:to-amber-600 transition-all duration-300">
                    {item.title}
                  </h3>
                  
                  <div className={`inline-block px-4 py-2 rounded-full bg-linear-to-r ${item?.color} text-white font-semibold text-sm shadow-md`}>
                    {item.highlight}
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>

                  {item.note && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500 italic flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">•</span>
                        {item.note}
                      </p>
                    </div>
                  )}
                </div>

                {/* Corner Accent */}
                <div className={`absolute -bottom-8 -right-8 w-24 h-24 bg-linear-to-br ${item?.color} opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="relative mt-20">
          <div className="bg-linear-to-r from-rose-600 via-pink-600 to-amber-600 rounded-3xl p-12 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-5"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative text-center space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Ready to Begin Your Journey?
              </h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                By registering, you agree to these terms and conditions. Our team is here to support you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href={"/register"} className="px-8 py-4 bg-white text-rose-600 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in ">
                  Register Now
                </Link>
                <Link href={"/contact"} className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-rose-600 transition-all duration-300 ease-in ">
                  Contact Support
                </Link>
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
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}