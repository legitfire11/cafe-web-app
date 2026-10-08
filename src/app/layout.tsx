import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Velvet & Bean | Artisanal Coffee & Bakehouse",
  description: "Handcrafted coffee, wild-fermented sourdough, and fresh daily bakes in Kothrud, Pune. Order pickup directly via WhatsApp.",
  metadataBase: new URL("https://cafe-web-app-8e21.vercel.app"),
  openGraph: {
    title: "Velvet & Bean | Artisanal Coffee & Bakehouse",
    description: "Handcrafted coffee, wild-fermented sourdough, and fresh daily bakes in Kothrud, Pune.",
    url: "https://cafe-web-app-8e21.vercel.app",
    siteName: "Velvet & Bean",
    images: [
      {
        url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Velvet & Bean Artisanal Cafe",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
