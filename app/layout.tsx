import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saiful Islam — Developer Portfolio",
  description:
    "CSE undergraduate, developer, and problem solver. Explore my projects, skills, research, and more.",
  keywords: ["portfolio", "developer", "CSE", "Flutter", "React", "Saiful Islam"],
  authors: [{ name: "Saiful Islam" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Saiful Islam — Developer Portfolio",
    description: "CSE undergraduate, developer, and problem solver.",
    type: "website",
    images: ["/saiful_image.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
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
