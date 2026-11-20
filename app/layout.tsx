import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  title: "EDU YODHA LLP | Education & Technology Company",
  description:
    "EDU YODHA LLP is an Indian education and technology company focused on building opportunities through digital learning, skill development, internships, and innovative technology solutions. Empowering the next generation of learners and professionals.",
  keywords: [
    "EDU YODHA",
    "EdTech India",
    "internships",
    "skill development",
    "digital learning",
    "education technology",
    "online learning",
    "career development",
    "LLP",
    "Indian EdTech",
  ],
  authors: [{ name: "EDU YODHA LLP" }],
  creator: "EDU YODHA LLP",
  publisher: "EDU YODHA LLP",
  metadataBase: new URL("https://eduyodha.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://eduyodha.com",
    siteName: "EDU YODHA LLP",
    title: "EDU YODHA LLP | Education & Technology Company",
    description:
      "Empowering the next generation through digital learning, skill development, and internship programs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EDU YODHA LLP | Education & Technology Company",
    description:
      "Empowering the next generation through digital learning, skill development, and internship programs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans antialiased bg-white dark:bg-[#0f172a] text-slate-900 dark:text-slate-100">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
