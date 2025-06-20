import React from "react";

interface FileUploadBoxProps {
  file: File | null;
  setFile: (file: File | null) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadBox: React.FC<FileUploadBoxProps> = ({ file, setFile, isDragging, setIsDragging, handleChange }) => {
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      className={`w-full max-w-md p-8 space-y-4 border-2 border-dashed rounded-lg flex items-center justify-center ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-neutral-300"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleChange}
        accept=".pdf,.docx,.txt"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        {file ? (
          <p className="text-neutral-700">Selected: {file.name}</p>
        ) : (
          <p className="text-neutral-500">
            Drag and drop your files here or click to browse.
          </p>
        )}
      </label>
    </div>
  );
};

export default FileUploadBox; 