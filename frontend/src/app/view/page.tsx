"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ViewPage() {
  const [questions, setQuestions] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedQuestions = localStorage.getItem("mockQuestions");
    if (storedQuestions) {
      setQuestions(storedQuestions);
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <main className="flex flex-col items-center flex-1 px-4 sm:px-20 text-center w-full">
        <h1 className="text-4xl sm:text-6xl font-extrabold font-[family-name:var(--font-pencil)] mt-12">
          View your test below
        </h1>
        <div className="mt-8 w-full max-w-4xl min-h-[600px] p-6 border-2 border-dashed rounded-lg text-left bg-white shadow-sm">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-neutral-500">Loading questions...</p>
            </div>
          ) : questions ? (
            <pre className="whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed">
              {questions}
            </pre>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-neutral-500">
                No questions found. Please go back and generate them first.
              </p>
            </div>
          )}
        </div>
      </main>
      <footer className="flex justify-between w-full p-4 max-w-4xl mx-auto">
        <Link href="/upload">
          <button className="px-6 py-2 text-lg font-semibold text-white bg-gray-500 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75">
            Back
          </button>
        </Link>
        <button
          className="px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:opacity-50"
          disabled={!questions}
        >
          Download as PDF
        </button>
      </footer>
    </div>
  );
} 