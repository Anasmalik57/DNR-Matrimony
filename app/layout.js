import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "DNR Matrimony | Find Your Perfect Match",
  description:
    "DNR Matrimony is a trusted matchmaking platform designed to help you find your perfect life partner. Discover verified profiles, secure connections, and meaningful relationships.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <>
          <Navbar />
          <div className="min-h-screen">{children}</div>
          <Footer />
        </>
      </body>
    </html>
  );
}
