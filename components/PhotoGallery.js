"use client"
import Image from "next/image";

const photos = [
  { id: 1, src: "/stichedPic1.png", alt: "Happy Couple 1", rotation: -5, positionTop: "top-5", rotate: "rotate-5" },
  { id: 2, src: "/stichedPic2.png", alt: "Happy Couple 2", rotation: 3, positionTop: "top-0", rotate: "-rotate-5" },
  { id: 3, src: "/stichedPic3.png", alt: "Happy Couple 3", rotation: -2, positionTop: "top-6", rotate: "rotate-5" },
  { id: 4, src: "/stichedPic4.png", alt: "Happy Couple 4", rotation: 4, positionTop: "top-0", rotate: "-rotate-5" },
  { id: 5, src: "/stichedPic5.png", alt: "Happy Couple 5", rotation: -3, positionTop: "top-1", rotate: "rotate-5" },
];
const PhotoGallery = () => {
  return (
    <section className="relative pb-24">
      <div className="max-w-7xl scale-105 mx-auto">
        {/* Rope Image */}
        <div className="relative mb-8">
          <Image
            src="/rope.png"
            alt="Hanging Rope"
            width={4000}
            height={100}
            priority
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Polaroid Photos Container */}
        <div className="relative flex flex-wrap justify-center items-start gap-4 lg:gap-8 -mt-16">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className={`relative group ${photo?.positionTop}`}
              style={{
                transform: `rotate(${photo.rotation}deg)`,
                animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`,
              }}
            >
              {/* Clothespin/Sticker */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                <Image
                  src="/sticher.png"
                  alt="Clothespin"
                  width={60}
                  height={60}
                  className="size-12 object-contain"
                />
              </div>

              {/* Polaroid Frame */}
              <div
                className={`bg-white p-3 pb-8 shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-300 group-hover:scale-105 group-hover:rotate-0 w-48 sm:w-56 ${photo?.rotate}`}
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Shadow Effect */}
              <div
                className="absolute inset-0 bg-black opacity-10 blur-xl -z-10 transform translate-y-4"
                style={{
                  transform: `translateY(16px) rotate(${photo.rotation}deg)`,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Animation Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(var(--rotation));
          }
          50% {
            transform: translateY(-10px) rotate(var(--rotation));
          }
        }
      `}</style>
    </section>
  );
};

export default PhotoGallery;
