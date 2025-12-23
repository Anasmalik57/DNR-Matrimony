import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "DNR Matrimony | Find Your Perfect Life Partner",
  description:
    "DNR Matrimony ek trusted matrimony platform hai jahan aap apne liye perfect life partner dhoondh sakte hain. Verified profiles, secure matching aur personalized experience ke saath apna rishta yahin se shuru karein.",
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
