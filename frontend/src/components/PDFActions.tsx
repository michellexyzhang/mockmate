import React from "react";

interface PDFActionsProps {
  onGenerate: () => void;
  onDownload: () => void;
  disabled?: boolean;
}

const PDFActions: React.FC<PDFActionsProps> = ({ onGenerate, onDownload, disabled }) => (
  <div className="flex gap-4 mt-4">
    <button
      onClick={onGenerate}
      className="px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-700"
      disabled={disabled}
    >
      Generate PDF
    </button>
    <button
      onClick={onDownload}
      className="px-6 py-2 text-lg font-semibold text-white bg-green-500 rounded-full hover:bg-green-700"
      disabled={disabled}
    >
      Download PDF
    </button>
  </div>
);

export default PDFActions; 