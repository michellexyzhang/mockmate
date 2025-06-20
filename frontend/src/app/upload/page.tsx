"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUploadBox from "@/components/FileUploadBox";
import TextPasteBox from "@/components/TextPasteBox";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

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
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setIsUploading(true);

    try {
      // Step 1: Upload the file to the backend
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.detail || "File upload failed.");
      }

      const uploadData = await uploadResponse.json();
      const filePath = uploadData.path;

      // Step 2: Generate questions from the uploaded file
      const questionsResponse = await fetch(
        "http://127.0.0.1:8000/generate-questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ file_path: filePath }),
        }
      );

      if (!questionsResponse.ok) {
        const errorData = await questionsResponse.json();
        throw new Error(errorData.detail || "Failed to generate questions.");
      }

      const questionsData = await questionsResponse.json();

      // Step 3: Store questions and navigate
      localStorage.setItem("mockQuestions", questionsData.questions);
      router.push("/view");
    } catch (error: any) {
      console.error("An error occurred:", error);
      alert(`An error occurred: ${error.message}`);
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
          <FileUploadBox
            file={file}
            setFile={setFile}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            handleChange={handleChange}
          />
          <TextPasteBox
            pastedText={pastedText}
            handleTextChange={handleTextChange}
          />
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
          {isUploading ? "Generating..." : "Next"}
        </button>
      </footer>
    </div>
  );
} 