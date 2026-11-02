import type { Metadata, Viewport } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Providers } from "@/components/shared/Providers";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1220" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://univora.vercel.app"
  ),
  title: {
    default: "Univora — Together, We Create Change",
    template: "%s | Univora",
  },
  description:
    "A Social Development Events Platform connecting people through volunteering, community support, environmental activities, charity, and social impact.",
  keywords: [
    "Univora",
    "Volunteering",
    "Community Development",
    "Social Impact",
    "Tree Plantation",
    "Food Distribution",
    "Charity",
  ],
  authors: [{ name: "Univora Community" }],
  creator: "Univora",
  openGraph: {
    title: "Univora — Together, We Create Change",
    description:
      "A Social Development Events Platform connecting people through volunteering, community support, and impactful grassroots drives.",
    siteName: "Univora",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Univora — Together, We Create Change",
    description:
      "A Social Development Events Platform connecting people through volunteering and grassroots initiatives.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-[#172033] dark:bg-[#0B1220] dark:text-[#F1F5F9] font-sans transition-colors selection:bg-[#3BB3F0]/20 selection:text-[#004AAD] dark:selection:text-[#3BB3F0]">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
