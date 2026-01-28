import type { Metadata } from "next";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";
import Header from "@/components/Header";

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
        <DataProvider>
          <div className="flex min-h-screen flex-col bg-linear-to-br to-slate-700 py-10">
            <Header />
            <div className="flex flex-1 flex-col items-center justify-center gap-4">
              {children}
            </div>
          </div>
        </DataProvider>
      </body>
    </html>
  );
}
