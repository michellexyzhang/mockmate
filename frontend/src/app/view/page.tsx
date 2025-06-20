import Link from "next/link";

export default function ViewPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-extrabold font-[family-name:var(--font-pencil)]">
          View your test below
        </h1>
        <div className="mt-12 w-full max-w-4xl h-[600px] border-2 border-dashed rounded-lg flex items-center justify-center">
          <p className="text-neutral-500">PDF preview will be here.</p>
        </div>
      </main>
      <footer className="flex justify-between w-full p-4 max-w-4xl mx-auto">
        <Link href="/upload">
          <button className="px-6 py-2 text-lg font-semibold text-white bg-gray-500 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75">
            Back
          </button>
        </Link>
        <button className="px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          Download as PDF
        </button>
      </footer>
    </div>
  );
} 