import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";
import "./globals.css";

const varelaRound = Varela_Round({ weight: "400", subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "Ara AI Playground",
  description: "Test Ara AI in the browser.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={varelaRound.className}>{children}</body>
    </html>
  );
}
