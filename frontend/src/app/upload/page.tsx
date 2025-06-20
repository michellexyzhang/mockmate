"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadPath, setUploadPath] = useState<string | null>(null);
  const router = useRouter();

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
      setPastedText(""); // Clear text if a file is selected
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPastedText(""); // Clear text if a file is selected
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPastedText(e.target.value);
    setFile(null); // Clear file if text is entered
  };

  const handleUpload = async () => {
    if (!file && !pastedText) return;

    setIsUploading(true);
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    } else if (pastedText) {
      formData.append("text", pastedText);
    }

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setUploadPath(data.path);
        console.log("File uploaded successfully:", data.path);
        router.push("/view");
      } else {
        console.error("Upload failed:", data.error);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-extrabold font-[family-name:var(--font-pencil)]">
          Upload Documents
        </h1>
        <div className="mt-12 flex space-x-8">
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
          <div className="w-full max-w-md p-8 space-y-4 border-2 border-dashed rounded-lg border-neutral-300">
            <textarea
              className="w-full h-full p-2 bg-transparent focus:outline-none resize-none"
              placeholder="Or paste your text here"
              value={pastedText}
              onChange={handleTextChange}
            />
          </div>
        </div>
      </main>
      <footer className="flex justify-between w-full p-4 max-w-4xl mx-auto">
        <Link href="/">
          <button className="px-6 py-2 text-lg font-semibold text-white bg-gray-500 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75">
            Back to Home
          </button>
        </Link>
        <button
          className="px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:opacity-50"
          onClick={handleUpload}
          disabled={(!file && !pastedText) || isUploading}
        >
          {isUploading ? "Uploading..." : "Next"}
        </button>
      </footer>
    </div>
  );
} 