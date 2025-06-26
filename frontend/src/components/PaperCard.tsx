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
        className={`relative bg-white rounded-xl shadow-xl w-32 h-40 p-2 sm:w-66 sm:h-84 sm:p-4 flex flex-col justify-end rotate-[${rotation}deg]`}
      >
        <div className="absolute top-3 left-3 w-12 h-1 bg-gray-200 rounded sm:top-6 sm:left-6 sm:w-20 sm:h-2"></div>
        <div className="absolute top-6 left-3 w-10 h-1 bg-gray-100 rounded sm:top-12 sm:left-6 sm:w-16 sm:h-2"></div>
        <div className="absolute top-9 left-3 w-16 h-1 bg-gray-100 rounded sm:top-16 sm:left-6 sm:w-24 sm:h-2"></div>

        <div className={`absolute bottom-2 right-2 ${badgeColor} w-6 h-6 flex items-center justify-center rounded-full shadow-md border-2 border-white sm:bottom-3 sm:right-3 sm:w-8 sm:h-8`}>
          <span className="text-white text-lg sm:text-xl">{badgeIcon}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PaperCard; 