import { Toaster } from "@/components/ui/sonner";
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
  title: "zTunes - Discover Albums, Audiobooks & Podcasts",
  description:
    "Browse and search the top 20 albums, audiobooks, and podcasts from the iTunes Store. Discover new music, books, and shows with our intuitive media browser.",
  keywords: [
    "iTunes",
    "music",
    "albums",
    "audiobooks",
    "podcasts",
    "Apple",
    "media browser",
    "search",
  ],
  authors: [{ name: "zTunes" }],
  creator: "zTunes",
  publisher: "zTunes",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://itunes-media-browser.vercel.app",
    title: "zTunes - Discover Albums, Audiobooks & Podcasts",
    description:
      "Browse and search the top 20 albums, audiobooks, and podcasts from the iTunes Store.",
    siteName: "zTunes",
  },
  twitter: {
    card: "summary_large_image",
    title: "zTunes - Discover Albums, Audiobooks & Podcasts",
    description:
      "Browse and search the top 20 albums, audiobooks, and podcasts from the iTunes Store.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="canonical" href="https://ztunes.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "zTunes",
              description:
                "Browse and search the top 20 albums, audiobooks, and podcasts from the iTunes Store",
              url: "https://ztunes.vercel.app",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
