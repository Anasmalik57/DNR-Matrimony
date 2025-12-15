"use client"
import Image from "next/image";
import { CheckCircle, Users, Shield, Heart } from "lucide-react";

const features = [
  {
    id: 1,
    icon: CheckCircle,
    title: "Verified Profiles",
    description: "100% manually screened profiles to ensure safety.",
  },
  {
    id: 2,
    icon: Users,
    title: "Community Focus",
    description: "Dedicated to the Telugu community in Aandra & Telangana.",
  },
  {
    id: 3,
    icon: Shield,
    title: "Secure & Private",
    description: "Your data and photos are completely secure.",
  },
  {
    id: 4,
    icon: Heart,
    title: "Easy Matchmaking",
    description: "Smart algorithms to find your perfect partner.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative bg-[#FFFEFF] py-20 lg:py-32 overflow-hidden">
      {/* Left Background Flowers */}
      <div className="absolute left-0 bottom-0 w-48 lg:w-64 h-auto opacity-30">
        <Image
          src="/bgflowers.png"
          alt="Decorative Flowers"
          width={300}
          height={400}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Right Background Flowers */}
      <div className="absolute right-0 top-0 w-48 lg:w-64 h-auto opacity-30">
        <Image
          src="/bgflowers2.png"
          alt="Decorative Flowers"
          width={300}
          height={400}
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-rose-700 tracking-[0.3em] text-sm font-medium uppercase">
            WHY CHOOSE US
          </p>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-serif text-gray-900 leading-tight max-w-4xl mx-auto">
            Bringing Hearts Together
            <br />
            With Trust & Tradition.
          </h2>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="group bg-linear-to-br from-rose-800 to-rose-900 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-rose-100 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}