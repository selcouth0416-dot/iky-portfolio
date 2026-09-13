import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iky — Portfolio",
  description: "Portfolio website of Iky, AI Engineer and digital builder.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}