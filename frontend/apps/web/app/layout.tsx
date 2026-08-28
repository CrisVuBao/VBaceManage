import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "VBace - Creative & Software Solutions",
  description: "Modern software development and UI/UX design by Vu The Bao.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} font-sans bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary`}>
        {children}
      </body>
    </html>
  );
}
