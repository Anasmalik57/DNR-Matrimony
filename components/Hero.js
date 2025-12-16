"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative ">
      {/* Background Flowers - Left Side */}
      <div className="absolute left-0 top-0 w-full md:w-64 h-full opacity-20 sm:opacity-35">
        <Image
          src="/bgflowers.png"
          alt="Background Flowers"
          width={400}
          height={800}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 z-10">
            {/* Perfect Matches Text */}
            <div className="space-y-2">
              <p className="text-rose-700 tracking-[0.3em] text-sm font-medium uppercase">
                PERFECT MATCHES
              </p>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl  font-serif text-gray-900 leading-tight">
                Find Your Perfect
              </h1>
              <h1 className="text-5xl lg:text-6xl  font-serif text-gray-900 leading-tight">
                Telugu Match in Aandra & Telangana
              </h1>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-lg lg:text-xl leading-relaxed max-w-xl">
              Trusted, safe, and community-focused matchmaking designed to bring
              families together. Start your journey today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-rose-800 text-white rounded-full hover:bg-rose-900 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl group"
              >
                Register Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/profiles"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-gray-800 text-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-all duration-300 font-medium text-lg group"
              >
                Explore Match
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Content - Couple Image with Flower Frame */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Flower Frame */}
            <div className="relative w-full max-w-xl">
              <div className="relative aspect-square">
                {/* Frame Background */}
                <div className="absolute inset-0 z-10">
                  <Image
                    src="/flowerFrame.png"
                    alt="Flower Frame"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Couple Image */}
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="relative w-full h-full">
                    <Image
                      src="/couples.png"
                      alt="Happy Telugu Couple"
                      fill
                      className="object-contain rounded-tl-[50%] rounded-tr-[50%]"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-rose-200 rounded-full blur-3xl opacity-30 -z-10"></div>
            <div className="absolute -top-4 -left-4 w-40 h-40 bg-amber-200 rounded-full blur-3xl opacity-30 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
