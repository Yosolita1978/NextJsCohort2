import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Auth0Provider } from "@auth0/nextjs-auth0";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Modern Tech Blog",
  description: "A beautiful Next.js blog with modern styling",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Auth0Provider>
        <header className="site-header">
          <NavBar />
        </header>
        {children}
        </Auth0Provider>
      </body>
    </html>
  );
}