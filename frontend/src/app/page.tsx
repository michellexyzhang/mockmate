import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-9xl font-extrabold font-[family-name:var(--font-pencil)]">
          mockmate
        </h1>
        <div className="mt-12">
          <Link href="/upload">
            <button className="px-8 py-3 text-lg font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
              Start
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
