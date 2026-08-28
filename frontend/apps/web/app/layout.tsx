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
        {/* Navigation Bar (Glassmorphism) */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b-0 border-white/10">
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between text-sm font-medium">
            <div className="flex items-center gap-8">
              <a href="/" className="font-semibold text-lg tracking-tight hover:opacity-80 transition-opacity">VBace</a>
              <div className="hidden md:flex gap-6 text-muted-foreground">
                <a href="#services" className="hover:text-foreground transition-colors">Services</a>
                <a href="#portfolio" className="hover:text-foreground transition-colors">Portfolio</a>
                <a href="#blog" className="hover:text-foreground transition-colors">Blog</a>
              </div>
            </div>
            <div>
              <a href="#contact" className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full hover:bg-primary/90 transition-all shadow-sm">
                Start Project
              </a>
            </div>
          </div>
        </nav>
        
        {children}
      </body>
    </html>
  );
}
