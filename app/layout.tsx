import type { Metadata, Viewport } from "next";
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

const APP_TITLE = "Tower or Free? ⚔️";
const APP_DESCRIPTION =
  "The AI Medieval King judges all. Enter your suspects and learn their fate — verdicts streamed live from the throne.";

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
  openGraph: {
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    type: "website",
    siteName: "Tower or Free?",
  },
  twitter: {
    card: "summary",
    title: APP_TITLE,
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0a09",
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
