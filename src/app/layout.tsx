import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="antialiased selection:bg-[#E8DCCF]">
        {children}
      </body>
    </html>
  );
}
