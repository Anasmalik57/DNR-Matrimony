import { UserPlus } from "lucide-react";
import React from "react";

const registerPageLayout = ({ children }) => {
  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-rose-50 via-orange-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-800 rounded-full mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div> */}
            <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-2">
              Register Yourself Now
            </h1>
            <p className="text-gray-600 text-lg">
              Start your journey to find your perfect match
            </p>
          </div>
          <>{children}</>
        </div>
      </div>
    </>
  );
};

export default registerPageLayout;
