import { Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Friends Birthday Template",
  description: "This Template is common template for all the birthday wishes",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      // new URL("/favicon.ico", "https://maheshmuttintidev.in"),
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
  // metadataBase: new URL("https://maheshmuttintidev.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Friends Birthday",
    description: "This Template is common template for all the birthday wishes",
    url: "https://maheshmuttintidev.in",
    siteName: "Friends Birthday",
    locale: "en",
    type: "website",
    images: ["/brand_banner.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Friends Birthday",
    description: "This Template is common template for all the birthday wishes",
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
      <body>{children}</body>
    </html>
  );
}
