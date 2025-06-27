import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Caveat_Brush } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveatBrush = Caveat_Brush({
  variable: "--font-caveat-brush",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "mock it.",
  description: "Mockmate: Instantly generate LaTeX mock tests from your worksheets or tests.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/mockit-icon.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveatBrush.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
