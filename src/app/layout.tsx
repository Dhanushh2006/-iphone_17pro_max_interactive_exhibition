import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "iPhone 17 Pro Max — Titanium. Reimagined.",
  description: "Experience the luxury digital exhibition of the iPhone 17 Pro Max. Explore the titanium chassis, exploded views of A19 Pro silicon, glass camera refraction, and Apple Intelligence.",
  keywords: ["iPhone 17 Pro Max", "Apple Exhibition", "Interactive 3D", "Three.js", "React Three Fiber", "A19 Pro"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
