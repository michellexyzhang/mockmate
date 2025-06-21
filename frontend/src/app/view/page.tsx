"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import PDFPreview from "@/components/PDFPreview";

export default function ViewPage() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const storedPdfUrl = localStorage.getItem("mockPdfUrl");
    if (storedPdfUrl) {
      setPdfUrl(storedPdfUrl);
    }
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <main className="flex flex-col items-center flex-1 px-4 sm:px-20 text-center w-full">
        <h1 className="text-4xl sm:text-6xl font-extrabold mt-12">
          View & Export Mock Test
        </h1>
        <PDFPreview pdfUrl={pdfUrl} />
      </main>
      <footer className="flex justify-between w-full p-4 max-w-4xl mx-auto">
        <Link href="/upload">
          <button className="px-6 py-2 text-lg font-semibold text-white bg-gray-500 rounded-full hover:bg-gray-700">
            Back
          </button>
        </Link>
      </footer>
    </div>
  );
} 