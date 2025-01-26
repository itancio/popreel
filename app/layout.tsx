import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Popreel",
  description: "Popreel is a social media platform for sharing videos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
