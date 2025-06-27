"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import PaperCard from "@/components/PaperCard";
import { useEffect, useState } from "react";

export default function Home() {
  // Only render decorative elements on md+ screens
  const [isMdUp, setIsMdUp] = useState(false);
  useEffect(() => {
    const checkScreen = () => setIsMdUp(window.innerWidth >= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      {/* Only render on md+ screens */}
      {isMdUp && (
        <>
          <PaperCard
            rotation={-8}
            badgeColor="bg-yellow-400"
            badgeIcon="📄"
            className="absolute top-2 left-2 w-20 h-24 md:top-8 md:left-8 md:w-28 md:h-32 lg:top-16 lg:left-16 lg:w-44 lg:h-56 xl:top-44 xl:left-34 xl:w-66 xl:h-84 z-10"
          />
          <PaperCard
            rotation={6}
            badgeColor="bg-blue-500"
            badgeIcon="📝"
            className="absolute bottom-2 right-2 w-20 h-24 md:bottom-8 md:right-8 md:w-28 md:h-32 lg:bottom-16 lg:right-16 lg:w-44 lg:h-56 xl:bottom-54 xl:right-34 xl:w-66 xl:h-84 z-10"
          />
          <motion.div
            initial={{ opacity: 0, x: 40, y: -40 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ type: "spring", bounce: 0.3, duration: 1 }}
            className="absolute top-8 right-4 md:top-24 md:right-16 lg:top-50 lg:right-16 z-10"
          >
            <span
              style={{
                fontFamily: "'Caveat Brush', cursive",
                display: "inline-block",
                transform: "rotate(12deg)"
              }}
              className="text-2xl md:text-3xl lg:text-4xl text-gray-700 whitespace-nowrap select-none"
            >
              ∫₀^∞ e<sup>-x²</sup> dx = √π &nbsp; + &nbsp; limₙ→∞ (1 + 1/n)<sup>n</sup> &nbsp;
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -40, y: 40 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ type: "spring", bounce: 0.3, duration: 1 }}
            className="absolute bottom-8 left-4 md:bottom-24 md:left-16 lg:bottom-50 lg:left-30 z-10"
          >
            <span
              style={{
                fontFamily: "'Caveat Brush', cursive",
                display: "inline-block",
                transform: "rotate(-12deg)"
              }}
              className="text-2xl md:text-4xl lg:text-5xl text-gray-700 select-none"
            >
              E = mc²
            </span>
          </motion.div>
        </>
      )}
      <main className="flex flex-col items-center justify-center flex-1 px-4 md:px-20 text-center">
        <div className="inline-block mb-4 px-2 py-0.5 sm:px-4 sm:py-1 rounded-full bg-blue-100">
          <span className="text-blue-700 font-semibold text-xs sm:text-sm md:text-lg">need extra test prep?</span>
        </div>
        <div className="flex items-end space-x-2">
          <span
            className="font-extrabold text-black text-xl md:text-3xl lg:text-5xl relative inline-block mr-4"
            style={{ transform: 'rotate(-6deg)' }}
          >
            simply
            <span className="block absolute left-0 right-0 -bottom-0 md:-bottom-2 h-0.5 md:h-1 lg:h-2 bg-blue-100 rounded-full w-full"></span>
          </span>
          <span
            className="font-extrabold text-5xl md:text-7xl lg:text-8xl text-blue-600"
            style={{
              background: "linear-gradient(45deg, #91B6D5 0%, #52749B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            mock it.
          </span>
        </div>
        <div className="mt-12">
          <Link href="/upload">
            <button className="px-8 py-3 text-lg font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
              Start
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
