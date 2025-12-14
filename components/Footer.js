"use client"
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/testimonials", label: "Success Stories" },
  { href: "/membership", label: "Membership Plans" },
  { href: "/safety", label: "Safety Tips" },
  { href: "/privacy", label: "Privacy Policy" },
];

const galleryImages = [
  { id: 1, src: "/f1.png", alt: "Happy Couple 1" },
  { id: 2, src: "/f2.png", alt: "Happy Couple 2" },
  { id: 3, src: "/f3.png", alt: "Happy Couple 3" },
  { id: 4, src: "/f4.png", alt: "Happy Couple 4" },
  { id: 5, src: "/f5.png", alt: "Happy Couple 5" },
  { id: 6, src: "/f6.png", alt: "Happy Couple 6" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const router = useRouter()
  const pathname = usePathname()

  return (
    <footer className={`bg-linear-to-br from-rose-900 via-rose-800 to-rose-900 ${pathname.startsWith("/admin") ? "hidden": ""}`}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1 - Brand */}
          <div className="space-y-4">
            {/* Logo */}
            <div onClick={()=> router.push("/")} className="w-40 scale-150 h-fit">
              <Image src="/image.png" alt="DNR Matrimony Logo" width={400} height={400} className="w-full h-auto object-contain " />
            </div>

            {/* Description */}
            <p className="text-rose-100 leading-relaxed text-sm">
              The most trusted matchmaking service for the Telugu community in Calicut. We bring hearts together with tradition, privacy, and modern technology.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <IconComponent className="size-5 text-white group-hover:scale-110 transition-transform" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-rose-100 hover:text-white transition-colors duration-200 font-medium text-xs">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact Us */}
          <div className="space-y-6">
            <h3 className="text-white text-xl font-semibold">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className=" bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="size-5 text-white" />
                </div>
                <Link
                  href="mailto:hello@example.com"
                  className="text-rose-100 hover:text-white transition-colors text-sm"
                >
                  hello@example.com
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <div className=" bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="size-5 text-white" />
                </div>
                <Link
                  href="tel:+919876543210"
                  className="text-rose-100 hover:text-white transition-colors text-sm"
                >
                  +91 98765 43210
                </Link>
              </div>
            </div>
          </div>

          {/* Column 4 - Gallery */}
          <div className="space-y-6">
            <h3 className="text-white text-xl font-semibold">Our Gallery</h3>
            <div className="grid grid-cols-3 gap-2">
              {galleryImages.map((image) => (
                <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-200 ease-in">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300"></div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-rose-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-rose-200 text-sm">
            © {currentYear} DNR Matrimony. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}