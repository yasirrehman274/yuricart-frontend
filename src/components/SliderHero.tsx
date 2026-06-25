// "use client";
// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";

// interface Slide {
//   id: number;
//   title: string;
//   subtitle: string;
//   image: string;
//   link: string;
// }

// const slides: Slide[] = [
//   {
//     id: 1,
//     title: "",
//     subtitle: "",
//     image: "/images/banner1.png",
//     link: "/shop",
//   },
//   {
//     id: 2,
//     title: "",
//     subtitle: "",
//     image: "/images/banner2.png",
//     link: "/shop",
//   },
//   {
//     id: 3,
//     title: "Exclusive Offers",
//     subtitle: "",
//     image: "/images/banner3.png",
//     link: "/shop",
//   },
//   {
//     id: 4,
//     title: "Exclusive Offers",
//     subtitle: "",
//     image: "/images/banner4.png",
//     link: "/shop",
//   },
//   {
//     id: 5,
//     title: "",
//     subtitle: "",
//     image: "/images/banner5.png",
//     link: "/shop",
//   },

// ];

// export default function HeroSlider() {
//   const [index, setIndex] = useState<number>(0);

//   useEffect(() => {
//     const t = setInterval(() => setIndex((p) => (p + 1) % slides.length), 5000);
//     return () => clearInterval(t);
//   }, []);

//   return (
//     <div className="relative h-[44vh] w-full md:h-[75vh] overflow-hidden">
//       <AnimatePresence initial={false}>
//         <motion.div
//           key={slides[index].id}
//           className="absolute inset-0"
//           initial={{ x: "100%" }}
//           animate={{ x: 0 }}
//           exit={{ x: "-100%" }}
//           transition={{ duration: 0.8, ease: "easeInOut" }}
//         >
//           {/* Background Image (responsive) */}
//           <Image
//             src={slides[index].image}
//             alt={slides[index].title}
//             fill
//             priority={index === 0}
//             quality={85}
//             className="object-cover"
//             sizes="100vw" // ensures correct responsive image sizes
//           />

//           {/* Overlay */}
//           <div className="absolute inset-0  flex flex-col items-center justify-center text-center text-white px-4 md:px-8">
//             <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3">
//               {slides[index].title}
//             </h1>
//             <p className="text-sm sm:text-lg md:text-2xl max-w-2xl">
//               {slides[index].subtitle}
//             </p>
//           </div>

//           {/* Shop Now button (responsive) */}
//           <div className="absolute bottom-[2.5rem] md:bottom-[4rem] left-1/2 -translate-x-1/2">
//             <Link
//               href={slides[index].link}
//               className="inline-flex items-center px-[.5rem] py-2 sm:px-6 sm:py-3 bg-orange-600 rounded-2xl shadow-lg hover:bg-orange-500 text-sm sm:text-base md:text-lg"
//             >
//               Shop Now <ArrowRight className="ml-2 size-5" />
//             </Link>
//           </div>
//         </motion.div>
//       </AnimatePresence>

//       {/* Dots */}
//       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
//         {slides.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setIndex(i)}
//             className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition ${
//               i === index ? "bg-white" : "bg-gray-400/70"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { ArrowRight } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// const slides = [
//   {
//     id: 1,
//     title: "",
//     description: "",
//     img: "/images/banner1.png",
//     url: "/",
//     bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
//   },
//   {
//     id: 2,
//     title: "",
//     description: "",
//     img: "/images/banner2.png",
//     url: "/",
//     bg: "bg-gradient-to-r from-pink-50 to-blue-50",
//   },
//   {
//     id: 3,
//     title: "Spring Sale Collections",
//     description: "Sale! Up to 50% off!",
//     img: "/images/banner3.png",
//     url: "/",
//     bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
//   },
//   {
//     id: 4,
//     title: "Spring Sale Collections",
//     description: "Sale! Up to 40% off!",
//     img: "/images/banner4.png",
//     url: "/",
//   },
//   {
//     id: 5,
//     title: "Spring Sale Collections",
//     description: "Sale! Up to 50% off!",
//     img: "/images/banner5.png",
//     url: "/",
//     bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
//   },
// ];

// const Slider = () => {
//   const [current, setCurrent] = useState(0);

//   // useEffect(() => {
//   //   const interval = setInterval(() => {
//   //     setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//   //   }, 3000);

//   //   return () => clearInterval(interval);
//   // }, []);

//   return (
//     <div className="h-[calc(100vh-80px)] overflow-hidden">
//       <div
//         className="w-max h-full flex transition-all ease-in-out duration-1000"
//         style={{ transform: `translateX(-${current * 100}vw)` }}
//       >
//         {slides.map((slide) => (
//           <div
//             // className={`${slide.bg} w-screen h-[75vh] flex flex-col gap-16 xl:flex-row`}
//             className="className={`${slide.bg} w-screen h-auto md:h-[75vh] flex flex-col xl:flex-row`}"
//             key={slide.id}
//           >

//             {/* IMAGE CONTAINER */}
//             <div className="h-1/2 xl:w-full xl:h-full relative">
//               <Image
//                 src={slide.img}
//                 alt=""
//                 fill
//                 sizes="100%"
//                 className="object-cover"
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
//         {slides.map((slide, index) => (
//           <div
//             className={`w-3 h-3  rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
//               current === index ? "scale-150" : ""
//             }`}
//             key={slide.id}
//             onClick={() => setCurrent(index)}
//           >
//             {current === index && (
//               <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slider;

// "use client";

// import { ArrowRight } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// const slides = [
//   {
//     id: 1,
//     title: "",
//     description: "",
//     img: "/images/banner1.jpg",
//     url: "/",
//     bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
//   },
//   {
//     id: 2,
//     title: "",
//     description: "",
//     img: "/images/banner2.png",
//     url: "/",
//     bg: "bg-gradient-to-r from-pink-50 to-blue-50",
//   },
//   {
//     id: 3,
//     title: "Spring Sale Collections",
//     description: "Sale! Up to 50% off!",
//     img: "/images/banner3.png",
//     url: "/",
//     bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
//   },
//   {
//     id: 4,
//     title: "Spring Sale Collections",
//     description: "Sale! Up to 40% off!",
//     img: "/images/banner4.png",
//     url: "/",
//   },
//   {
//     id: 5,
//     title: "Spring Sale Collections",
//     description: "Sale! Up to 50% off!",
//     img: "/images/banner5.png",
//     url: "/",
//     bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
//   },
// ];

// const Slider = () => {
//   const [current, setCurrent] = useState(0);

//   // Auto-play (optional)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative overflow-hidden">
//       <div
//         className="w-max flex transition-all ease-in-out duration-1000"
//         style={{ transform: `translateX(-${current * 100}vw)` }}
//       >
//         {slides.map((slide) => (
//           <div
//             key={slide.id}
//             className={`${slide.bg || ""} w-screen h-auto md:h-[75vh] flex flex-col xl:flex-row`}
//           >
//             {/* IMAGE CONTAINER */}
//             <div className="w-full h-[40vh] sm:h-[50vh] md:h-full relative">
//               <Image
//                 src={slide.img}
//                 alt=""
//                 fill
//                 sizes="100vw"
//                 className="object-cover"
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* DOTS */}
//       <div className="absolute left-1/2 -translate-x-1/2 bottom-4 md:bottom-8 flex gap-4">
//         {slides.map((slide, index) => (
//           <div
//             key={slide.id}
//             onClick={() => setCurrent(index)}
//             className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
//               current === index ? "scale-150" : ""
//             }`}
//           >
//             {current === index && (
//               <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slider;

// "use client";

// import { ArrowRight } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// const slides = [
//   {
//     id: 1,
//     title: "",
//     description: "",
//     img: "/images/banner1.jpg",
//     url: "/",
//     bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
//   },
//   {
//     id: 2,
//     title: "",
//     description: "",
//     img: "/images/banner2.png",
//     url: "/",
//     bg: "bg-gradient-to-r from-pink-50 to-blue-50",
//   },
//   {
//     id: 3,
//     title: "Spring Sale Collections",
//     description: "Sale! Up to 50% off!",
//     img: "/images/banner3.png",
//     url: "/",
//     bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
//   },
//   {
//     id: 4,
//     title: "Spring Sale Collections",
//     description: "Sale! Up to 40% off!",
//     img: "/images/banner4.png",
//     url: "/",
//   },
//   {
//     id: 5,
//     title: "Spring Sale Collections",
//     description: "Sale! Up to 50% off!",
//     img: "/images/banner5.png",
//     url: "/",
//     bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
//   },
// ];

// const Slider = () => {
//   const [current, setCurrent] = useState(0);
//   const [paused, setPaused] = useState(false);

//   // Auto-play
//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (!paused) {
//       interval = setInterval(() => {
//         setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//       }, 3000);
//     }
//     return () => clearInterval(interval);
//   }, [paused]);

//   return (
//     <div
//       className="relative overflow-hidden"
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//     >
//       {/* Slides container */}
//       <div
//         className="w-max flex transition-transform duration-1000 ease-in-out"
//         style={{ transform: `translateX(-${current * 100}vw)` }}
//       >
//         {slides.map((slide) => (
//           <div
//             key={slide.id}
//             className={`${slide.bg || ""} w-screen h-[50vh] md:h-[70vh] lg:h-[80vh] flex flex-col xl:flex-row relative`}
//           >
//             {/* IMAGE */}
//             <div className="w-full h-full relative">
//               <Image
//                 src={slide.img}
//                 alt=""
//                 fill
//                 sizes="100vw"
//                 className="object-contain md:object-cover"
//                 priority
//               />
//             </div>

//             {/* TEXT OVERLAY (optional) */}
//             {(slide.title || slide.description) && (
//               <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-gray-800 bg-black/30">
//                 <h2 className="text-lg sm:text-2xl md:text-4xl font-bold">
//                   {slide.title}
//                 </h2>
//                 <p className="mt-2 text-sm sm:text-base md:text-xl">
//                   {slide.description}
//                 </p>
//                 <Link
//                   href={slide.url}
//                   className="mt-4 flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary/90 transition"
//                 >
//                   Shop Now <ArrowRight className="w-4 h-4" />
//                 </Link>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* DOTS */}
//       <div className="absolute left-1/2 -translate-x-1/2 bottom-2 sm:bottom-4 md:bottom-8 flex gap-3">
//         {slides.map((slide, index) => (
//           <div
//             key={slide.id}
//             onClick={() => setCurrent(index)}
//             className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center transition-transform ${
//               current === index ? "scale-150" : ""
//             }`}
//           >
//             {current === index && (
//               <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slider;

"use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";

// const slides = [
//   {
//     id: 1,
//     title: "",
//     description: "",
//     img: "/images/banner1.jpg",
//     url: "/",
//     bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
//   },
//   {
//     id: 2,
//     title: "",
//     description: "",
//     img: "/images/banner2.png",
//     url: "/",
//     bg: "bg-gradient-to-r from-pink-50 to-blue-50",
//   },
//   {
//     id: 3,
//     title: "Spring Sale Collections",
//     description: "Sale! Up to 50% off!",
//     img: "/images/banner3.png",
//     url: "/",
//     bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
//   },
//   {
//     id: 4,
//     title: "Spring Sale Collections",
//     description: "Sale! Up to 40% off!",
//     img: "/images/banner4.png",
//     url: "/",
//   },
//   {
//     id: 5,
//     title: "Spring Sale Collections",
//     description: "Sale! Up to 50% off!",
//     img: "/images/banner5.png",
//     url: "/",
//     bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
//   },
// ];

// const Slider = () => {
//   const [current, setCurrent] = useState(0);
//   const [paused, setPaused] = useState(false);

//   // Auto-play
//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (!paused) {
//       interval = setInterval(() => {
//         setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//       }, 3000);
//     }
//     return () => clearInterval(interval);
//   }, [paused]);

//   return (
//     <div
//       className="relative overflow-hidden"
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//     >
//       {/* Slides container */}
//       <div
//         className="flex w-max transition-transform duration-1000 ease-in-out"
//         style={{ transform: `translateX(-${current * 100}vw)` }}
//       >
//         {slides.map((slide) => (
//           <div
//             key={slide.id}
//             className={`${slide.bg || ""} relative flex h-[50vh] w-screen flex-col md:h-[70vh] lg:h-[80vh] xl:flex-row`}
//           >
//             {/* IMAGE */}
//             <div className="relative h-full w-full">
//               <Image
//                 src={slide.img}
//                 alt=""
//                 fill
//                 sizes="100vw"
//                 className="object-cover"
//                 priority
//               />
//             </div>

//             {/* TEXT OVERLAY (optional) */}
//             {(slide.title || slide.description) && (
//               <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 text-center text-gray-800">
//                 <h2 className="text-lg font-bold sm:text-2xl md:text-4xl">
//                   {slide.title}
//                 </h2>
//                 <p className="mt-2 text-sm sm:text-base md:text-xl">
//                   {slide.description}
//                 </p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* DOTS */}
//       <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-3 sm:bottom-4 md:bottom-8">
//         {slides.map((slide, index) => (
//           <div
//             key={slide.id}
//             onClick={() => setCurrent(index)}
//             className={`flex h-3 w-3 cursor-pointer items-center justify-center rounded-full ring-1 ring-gray-600 transition-transform ${
//               current === index ? "scale-150" : ""
//             }`}
//           >
//             {current === index && (
//               <div className="h-[6px] w-[6px] rounded-full bg-gray-600"></div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slider;

// import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const slides = [
  {
    id: 1,
    title: "",
    description: "",
    img: "/images/banner1.jpg",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "",
    description: "",
    img: "/images/banner2.png",
    url: "/",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "",
    description: "",
    img: "/images/banner3.png",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
  {
    id: 4,
    title: "",
    description: "",
    img: "/images/banner4.png",
    url: "/",
  },
  {
    id: 5,
    title: "",
    description: "",
    img: "/images/banner5.png",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
];

const Slider = () => {
  return (
    <>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#000",
            "--swiper-navigation-size": "20px",
          } as React.CSSProperties
        }
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image
            src="/images/banner1.png"
            alt="aaaa"
            width={1920}
            height={500}
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Image
            src="/images/banner2.png"
            width={1920}
            height={500}
            alt="aaaa"
            className="rounded-lg"
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Image
            src="/images/banner3.png"
            width={1920}
            height={500}
            alt="aaaa"
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Image
            src="/images/banner4.png"
            width={1920}
            height={500}
            alt="aaaa"
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Image
            src="/images/banner5.png"
            width={1920}
            height={500}
            alt="aaaa"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
