import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Caveat_Brush } from "next/font/google";
import Script from "next/script";
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
  description: "mock it: Instantly generate LaTeX mock tests from your worksheets or tests.",
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2D4J48PFRG"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2D4J48PFRG');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveatBrush.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
