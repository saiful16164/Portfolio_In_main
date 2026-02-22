import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saiful Islam — Developer Portfolio",
  description:
    "CSE undergraduate, developer, and problem solver. Explore my projects, skills, research, and more.",
  keywords: ["portfolio", "developer", "CSE", "Flutter", "React", "Saiful Islam"],
  authors: [{ name: "Saiful Islam" }],
  openGraph: {
    title: "Saiful Islam — Developer Portfolio",
    description: "CSE undergraduate, developer, and problem solver.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main style={{ paddingTop: "70px", minHeight: "100vh" }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
