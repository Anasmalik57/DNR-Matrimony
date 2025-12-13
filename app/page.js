import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PhotoGallery from "@/components/PhotoGallery";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import WhyChooseUs from "@/components/WhyCHooseUs";
import React from "react";

const page = () => {
  return (
    <div className="bg-linear-to-br from-amber-50 via-orange-50 to-amber-100 min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <PhotoGallery />
      <WhyChooseUs />
      <TestimonialCarousel />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default page;
