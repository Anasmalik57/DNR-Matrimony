import ContactUs from "@/components/ContactUs";
import Hero from "@/components/Hero";
import PhotoGallery from "@/components/PhotoGallery";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import WhyChooseUs from "@/components/WhyCHooseUs";

const page = () => {
  return (
    <div className="bg-linear-to-br from-amber-50 via-orange-50 to-amber-100 min-h-screen overflow-hidden">
      <Hero />
      <PhotoGallery />
      <WhyChooseUs />
      <TestimonialCarousel />
      <ContactUs />
    </div>
  );
};

export default page;
