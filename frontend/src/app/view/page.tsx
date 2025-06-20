"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";
import PDFPreview from "@/components/PDFPreview";
import PDFActions from "@/components/PDFActions";

export default function ViewPage() {
  const [questions, setQuestions] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const storedQuestions = localStorage.getItem("mockQuestions");
    if (storedQuestions) {
      setQuestions(storedQuestions);
    }
  }, []);

  const generatePDF = () => {
    if (!questions) return;
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(questions, 180);
    doc.text(lines, 10, 10);
    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
  };

  const downloadPDF = () => {
    if (!questions) return;
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(questions, 180);
    doc.text(lines, 10, 10);
    doc.save("mock-questions.pdf");
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <main className="flex flex-col items-center flex-1 px-4 sm:px-20 text-center w-full">
        <h1 className="text-4xl sm:text-6xl font-extrabold mt-12">
          View & Export Mock Test
        </h1>
        <div className="mt-8 w-full max-w-4xl min-h-[400px] p-6 border-2 border-dashed rounded-lg text-left bg-white shadow-sm">
            <pre className="whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed">
            {questions || "No questions found. Please go back and generate them first."}
            </pre>
        </div>
        <PDFActions onGenerate={generatePDF} onDownload={downloadPDF} />
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