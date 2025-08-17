import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import {Footer} from "@/components/Footer";
import { CartProvider } from "@/contexts/Cart/CartContext";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Commerce",
  description: "A Next.js e-commerce application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <CartProvider> */}
          <Providers>
            <Header/>
          {children}
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          <Footer/>
          </Providers>

        {/* </CartProvider> */}
        -
      </body>
    </html>
  );
}
