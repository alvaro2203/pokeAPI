import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Pokédex using PokeAPI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col py-10 bg-linear-to-br to-slate-700">
          <h1 className="text-6xl font-extrabold uppercase text-amber-300 mb-10 text-center">
            <Link href="/">Pokédex</Link>
          </h1>
          <div className="flex-1 flex flex-col gap-4 items-center justify-center">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
