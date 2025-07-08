// "use client";
// import { Banner } from "@prisma/client";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// interface BannerProps {
//   banners : Banner[]
// }

// const Slider:React.FC<BannerProps> = ({banners}) => {
//   const [current, setCurrent] = useState<number>(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="h-[calc(100vh-100px)] overflow-hidden relative">
//       <div
//         className="w-max h-full flex transition-all ease-in-out duration-1000"
//         style={{ transform: `translateX(-${current * 100}vw)` }}
//       >
//         {banners.map((slide, index) => (
//           <div
//             className={`${slide.bg} w-screen h-full flex flex-col xl:flex-row`}
//             key={index}
//           >
//             <div className="h-1/2 xl:h-full xl:w-1/2 flex flex-col items-center justify-center gap-4 sm:gap-6 2xl:gap-10 text-center p-6">
//               <h2 className="text-base sm:text-xl lg:text-3xl 2xl:text-5xl mb-2 sm:mb-4">
//                 {slide.description}
//               </h2>
//               <h1 className="text-4xl sm:text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
//                 {slide.title}
//                 <br />
//                 <span className="text-2xl sm:text-3xl lg:text-5xl 2xl:text-6xl font-semibold mt-3 sm:mt-5">
//                   {slide.title1}
//                 </span>
//               </h1>
//               <Link href={slide.url}>
//                 <button className="rounded-md bg-white text-black py-2 px-4 mt-3 shadow-md">
//                   {slide.button}
//                 </button>
//               </Link>
//             </div>
//             <div className="h-1/2 xl:h-full xl:w-1/2 relative">
//               <Image
//                 src={slide.bannerUrl ? slide.bannerUrl : slide.imgUrl}
//                 alt={slide.title}
//                 fill
//                 priority
//                 sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
//                 className="object-cover"
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
//         {banners.map((_, index) => (
//           <div
//             key={index}
//             className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
//               current === index ? "scale-150" : ""
//             }`}
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
