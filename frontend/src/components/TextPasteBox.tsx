import React from "react";

interface TextPasteBoxProps {
  pastedText: string;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextPasteBox: React.FC<TextPasteBoxProps> = ({ pastedText, handleTextChange }) => (
  <div className="w-full max-w-md p-8 space-y-4 border-2 border-dashed rounded-lg border-neutral-300">
    <textarea
      className="w-full h-full p-2 bg-transparent focus:outline-none resize-none"
      placeholder="Or paste your text here"
      value={pastedText}
      onChange={handleTextChange}
    />
  </div>
);

export default TextPasteBox; 