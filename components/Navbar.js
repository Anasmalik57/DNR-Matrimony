"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Jost } from "next/font/google";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact Us" },
];

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jost",
});

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-linear-to-r from-red-900 via-red-800 to-red-900 shadow-xl shadow-red-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <div className="w-36 h-auto scale-110">
              <Image
                src="/image.png"
                alt="DNR Matrimony Logo"
                width={500}
                height={500}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`text-white  hover:text-yellow-300 transition-colors duration-200 text-sm font-medium ${jost.variable}`} > {link.label} </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/register" className="px-6 py-2.5 text-xs border-2 border-pink-300/20 h-fit text-pink-300 rounded-full hover:bg-pink-300 hover:text-red-900 transition-all duration-200 font-medium" > Sign Up </Link>
            <Link href="/login" className="px-6 py-2.5 text-xs border-2 bg-amber-100 text-red-900 rounded-full hover:bg-amber-200 transition-all duration-200 font-medium shadow-md" > Login </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-yellow-300 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-white hover:text-yellow-300 transition-colors duration-200 text-lg font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col space-y-3 pt-4">
              <Link
                href="/signup"
                className="px-6 py-2.5 border-2 border-pink-300 text-pink-300 rounded-full hover:bg-pink-300 hover:text-red-900 transition-all duration-200 font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="px-6 py-2.5 bg-amber-100 text-red-900 rounded-full hover:bg-amber-200 transition-all duration-200 font-medium text-center shadow-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
