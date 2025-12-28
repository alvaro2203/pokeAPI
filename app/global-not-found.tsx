import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className="flex flex-col gap-4 min-h-screen items-center justify-center bg-linear-to-br to-slate-700">
          <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
          <p className="text-xl">This page does not exist.</p>
        </div>
      </body>
    </html>
  );
}
