import { AdBanner } from "@/components/ad-banner";
import { AdSense } from "@/components/ad-sense";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "AI Image Generator | Mahesh Muttinti",
  description: "Generate AI images with various prompts and sizes.",
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-icon.png" }],
  },
  metadataBase: new URL(
    "https://ai-image-generator-unlimited.maheshmuttintidev.in"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI Image Generator | Mahesh Muttinti",
    description: "Generate AI images with various prompts and sizes.",
    url: "https://ai-image-generator-unlimited.maheshmuttintidev.in",
    siteName: "AI Image Generator",
    locale: "en",
    type: "website",
    images: ["/brand_banner.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image Generator | Mahesh Muttinti",
    description: "Generate AI images with various prompts and sizes.",
    creator: "@MaheshMuttinti",
    images: ["/brand_banner.webp"],
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body className="bg-slate-800 md:flex">
        {children}
        <article className="px-4">
          <nav className="w-full md:hidden">
            {/* @ts-ignore */}
            <AdBanner adSlot="4166061088" />
            {/* @ts-ignore */}
            <AdSense pId="3909331636598544" />
          </nav>
        </article>

        <nav className="md:max-w-24 md:visible hidden max-w-36">
          {/* @ts-ignore */}
          <AdBanner adSlot="4166061088" />
          {/* @ts-ignore */}
          <AdSense pId="3909331636598544" />
        </nav>
      </body>
    </html>
  );
}
