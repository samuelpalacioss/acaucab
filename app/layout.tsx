import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="flex h-screen flex-col justify-center items-center mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  );
}
