import { Briefcase, IndianRupee, MapPin, User, Heart, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfileCard = ({ profile }) => {
  return (
    <Link href={`/profiles/${profile.slug}`} className="block">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-amber-200/50 relative">
        {/* Decorative Corner Accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-[#C4887C]/10 to-transparent rounded-bl-full z-0"></div>
        
        {/* Profile Image Section */}
        <div className="relative h-56 bg-linear-to-br from-[#C4887C] via-[#D4A59A] to-[#E5C4B8] overflow-hidden">
          {profile.pic ? (
            <Image
              src={profile.pic}
              alt={profile.fullName}
              width={400}
              height={224}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
                  <span className="text-5xl font-bold">
                    {profile.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* linear Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3 z-10">
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm border-2 ${
                profile.status === "Available"
                  ? "bg-emerald-500/90 text-white border-emerald-300"
                  : "bg-gray-500/90 text-white border-gray-300"
              }`}
            >
              {profile.status}
            </span>
          </div>

          {/* Featured Badge (Optional) */}
          {profile.featured && (
            <div className="absolute top-3 left-3 z-10">
              <div className="px-3 py-1.5 rounded-full text-xs font-bold bg-amber-400/90 text-amber-900 shadow-lg backdrop-blur-sm border-2 border-amber-300 flex items-center gap-1">
                <Award className="w-3 h-3" />
                Featured
              </div>
            </div>
          )}
        </div>

        {/* Profile Content */}
        <div className="p-5 relative z-10">
          {/* Name & Caste */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#C4887C] transition-colors leading-tight mb-1">
              {profile.fullName}
            </h3>
            <p className="text-sm text-gray-500 font-medium">{profile.caste}</p>
          </div>

          {/* Info Grid - 2 Columns */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {/* Age & Gender */}
            <div className="flex items-center gap-2.5 p-3 bg-linear-to-br from-[#FFF5E6] to-[#FFE8CC] rounded-xl border border-amber-200/50 group-hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#C4887C] to-[#D4A59A] flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 font-medium mb-0.5">Age</p>
                <p className="text-sm text-gray-800 font-bold truncate">
                  {profile.age}y • {profile.gender}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2.5 p-3 bg-linear-to-br from-[#FFF5E6] to-[#FFE8CC] rounded-xl border border-amber-200/50 group-hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#C4887C] to-[#D4A59A] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 font-medium mb-0.5">City</p>
                <p className="text-sm text-gray-800 font-bold truncate">
                  {profile.city}
                </p>
              </div>
            </div>

            {/* Profession */}
            <div className="flex items-center gap-2.5 p-3 bg-linear-to-br from-[#FFF5E6] to-[#FFE8CC] rounded-xl border border-amber-200/50 group-hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#C4887C] to-[#D4A59A] flex items-center justify-center shrink-0">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 font-medium mb-0.5">Work</p>
                <p className="text-sm text-gray-800 font-bold truncate">
                  {profile.EmployementType || "Not Specified"}
                </p>
              </div>
            </div>

            {/* Income */}
            {profile.income && (
              <div className="flex items-center gap-2.5 p-3 bg-linear-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200 group-hover:shadow-md transition-shadow">
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-emerald-500 to-green-500 flex items-center justify-center shrink-0">
                  <IndianRupee className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-emerald-600 font-medium mb-0.5">Income</p>
                  <p className="text-sm text-emerald-700 font-bold truncate">
                    ₹{(profile.income / 100000).toFixed(1)}L
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* View Profile CTA */}
          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center justify-center gap-2 text-[#C4887C] font-bold text-sm group-hover:gap-3 transition-all py-2">
              <span>View Full Profile</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProfileCard;