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
          <div className="min-h-screen flex flex-col py-10 bg-linear-to-br to-slate-700">
            <Header />
            <div className="flex-1 flex flex-col gap-4 items-center justify-center">
              {children}
            </div>
          </div>
        </DataProvider>
      </body>
    </html>
  );
}
