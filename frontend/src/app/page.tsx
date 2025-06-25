"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PaperCard from "@/components/PaperCard";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      {/* Top-left card */}
      <PaperCard
        rotation={-8}
        badgeColor="bg-yellow-400"
        badgeIcon="📄"
        className="absolute top-44 left-34 z-10"
      />
      {/* Bottom-right card */}
      <PaperCard
        rotation={6}
        badgeColor="bg-blue-500"
        badgeIcon="📝"
        className="absolute bottom-54 right-34 z-10"
      />
      {/* Top-right math equation */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: -40 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ type: "spring", bounce: 0.3, duration: 1 }}
        className="absolute top-50 right-16 z-10"
      >
        <span
            style={{
            fontFamily: "'Caveat Brush', cursive",
            display: "inline-block",
            transform: "rotate(12deg)"
  }}
          className="text-4xl sm:text-5xl text-gray-700 whitespace-nowrap select-none"
        >
          ∫₀^∞ e<sup>-x²</sup> dx = √π &nbsp; + &nbsp; limₙ→∞ (1 + 1/n)<sup>n</sup> &nbsp;
        </span>
      </motion.div>
      {/* Bottom-left physics/science symbol */}
      <motion.div
        initial={{ opacity: 0, x: -40, y: 40 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ type: "spring", bounce: 0.3, duration: 1 }}
        className="absolute bottom-50 left-30 z-10"
      >
        <span
            style={{
            fontFamily: "'Caveat Brush', cursive",
            display: "inline-block",
            transform: "rotate(-12deg)"
  }}
          className="text-5xl text-gray-700 select-none"
        >
          E = mc²
        </span>
      </motion.div>
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-9xl font-extrabold font-[family-name:var(--font-pencil)]">
          mockmate
        </h1>
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
