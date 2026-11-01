import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Providers } from "@/components/shared/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Univora — Together, We Create Change",
  description:
    "A Social Development Events Platform connecting people through volunteering, community support, environmental activities, charity, and social impact.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-[#172033] dark:bg-[#0B1220] dark:text-[#F1F5F9] font-sans transition-colors">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
