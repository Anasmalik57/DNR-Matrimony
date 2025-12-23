"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    image: "/corousalimage1.png",
    quote: "I had tried many platforms before, but this one felt different from the start. Clean, simple, and full of genuine profiles. Within a month, I found someone who matched my values perfectly.",
    name: "Petra Analova",
    rating: 5,
  },
  {
    id: 2,
    image: "/corousalimage2.png",
    quote: "The community-focused approach made all the difference. I felt safe and respected throughout my journey. Found my soulmate within weeks!",
    name: "Rajesh Kumar",
    rating: 5,
  },
  {
    id: 3,
    image: "/corousalimage3.png",
    quote: "Amazing experience! The verified profiles gave me confidence, and the matchmaking algorithm truly works. Thank you for bringing us together.",
    name: "Priya Sharma",
    rating: 5,
  },
  {
    id: 4,
    image: "/corousalimage4.png",
    quote: "Best matrimony platform for Telugu community in Aandra, Telangana & Karnataka. Professional, secure, and effective. Highly recommend to everyone looking for their life partner.",
    name: "Venkat Reddy",
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative bg-[#FFF0DD] py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-rose-700 tracking-[0.3em] text-sm font-medium uppercase">
            SUCCESS STORIES
          </p>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-serif text-gray-900 leading-tight">
            Happily Ever Afters
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Large Quotation Marks - Background */}
          <div className="absolute -left-4 lg:-left-12 top-0 text-rose-200 opacity-40 text-[200px] lg:text-[300px] font-serif leading-none pointer-events-none select-none">
            "
          </div>

          {/* Testimonial Card */}
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 lg:p-12 max-w-4xl mx-auto">
            {/* Profile Image */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
              <div className="w-24 h-24 rounded-full border-4 border-rose-700 overflow-hidden shadow-xl">
                <Image
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="mt-16 space-y-6 text-center">
              {/* Quote */}
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed italic">
                "{currentTestimonial.quote}"
              </p>

              {/* Name */}
              <div className="space-y-3">
                <p className="text-2xl font-cursive text-rose-700" style={{ fontFamily: 'Brush Script MT, cursive' }}>
                  {currentTestimonial.name}
                </p>

                {/* Star Rating */}
                <div className="flex justify-center gap-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-rose-600 text-rose-600"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 lg:-left-20 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-rose-800 group-hover:text-rose-900" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 lg:-right-20 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-rose-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(index);
                setTimeout(() => setIsAutoPlaying(true), 5000);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-rose-800 w-8"
                  : "bg-rose-300 hover:bg-rose-500"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}