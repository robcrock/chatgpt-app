import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS ChatGPT",
  description: "NextJS ChatGPT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} px-2 md:px-5`}>
        <header className="mb-3 flex rounded-b-lg bg-green-900 p-2 text-2xl font-bold text-white shadow-lg shadow-gray-700">
          <div className="flex flex-grow">
            <Link href="/" className="font-bold">
              GPT Chat
            </Link>
            <Link href="/about" className="ml-5 font-light">
              About
            </Link>
          </div>
          <div></div>
        </header>
        <div className="flex flex-col md:flex-row">
          <div className="flex-grow">{children}</div>
        </div>
      </body>
    </html>
  );
}
