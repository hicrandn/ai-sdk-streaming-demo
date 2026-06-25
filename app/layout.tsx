import type { Metadata } from "next";
import { Cinzel, Cinzel_Decorative, Geist } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tower or Free? ⚔️",
  description: "The AI Medieval King judges all. Enter your suspects and learn their fate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cinzelDecorative.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-950">{children}</body>
    </html>
  );
}
