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
        className={`relative bg-white rounded-xl shadow-xl w-66 h-84 flex flex-col justify-end p-4 rotate-[${rotation}deg]`}
      >
        <div className="absolute top-6 left-6 w-20 h-2 bg-gray-200 rounded"></div>
        <div className="absolute top-12 left-6 w-16 h-2 bg-gray-100 rounded"></div>
        <div className="absolute top-16 left-6 w-24 h-2 bg-gray-100 rounded"></div>

        <div className={`absolute bottom-3 right-3 ${badgeColor} w-8 h-8 flex items-center justify-center rounded-full shadow-md border-2 border-white`}>
          <span className="text-white text-xl">{badgeIcon}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PaperCard; 