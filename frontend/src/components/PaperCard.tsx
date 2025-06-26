"use client";
import { motion } from "framer-motion";

interface PaperCardProps {
  rotation: number;
  badgeColor: string;
  badgeIcon: string;
  className?: string;
}

const PaperCard = ({ rotation, badgeColor, badgeIcon, className = "" }: PaperCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: rotation > 0 ? 40 : -40, y: rotation > 0 ? 40 : -40 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ type: "spring", bounce: 0.3, duration: 1 }}
      className={className}
    >
      <div
        className={`relative bg-white rounded-xl shadow-xl w-16 h-20 p-1 md:w-24 md:h-28 md:p-2 lg:w-32 lg:h-40 lg:p-3 xl:w-44 xl:h-56 xl:p-4 flex flex-col justify-end rotate-[${rotation}deg]`}
      >
        <div className="absolute top-2 left-2 w-8 h-1 bg-gray-200 rounded md:top-3 md:left-3 md:w-12 md:h-1 lg:top-4 lg:left-4 lg:w-16 lg:h-1 xl:top-6 xl:left-6 xl:w-20 xl:h-2"></div>
        <div className="absolute top-4 left-2 w-6 h-1 bg-gray-100 rounded md:top-6 md:left-3 md:w-10 md:h-1 lg:top-8 lg:left-4 lg:w-12 lg:h-1 xl:top-12 xl:left-6 xl:w-16 xl:h-2"></div>
        <div className="absolute top-6 left-2 w-10 h-1 bg-gray-100 rounded md:top-9 md:left-3 md:w-14 md:h-1 lg:top-12 lg:left-4 lg:w-20 lg:h-1 xl:top-16 xl:left-6 xl:w-24 xl:h-2"></div>

        <div className={`absolute bottom-1 right-1 ${badgeColor} w-4 h-4 flex items-center justify-center rounded-full shadow-md border-2 border-white md:bottom-2 md:right-2 md:w-6 md:h-6 lg:bottom-3 lg:right-3 lg:w-8 lg:h-8`}>
          <span className="text-white text-xs md:text-lg lg:text-xl">{badgeIcon}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PaperCard; 