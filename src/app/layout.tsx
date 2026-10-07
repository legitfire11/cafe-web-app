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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
