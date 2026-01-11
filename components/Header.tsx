"use client";

import { useData } from "@/context/DataContext";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const { search, setSearch } = useData();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className="flex justify-center items-center gap-6 mb-6">
      <h1 className="text-6xl font-extrabold uppercase text-amber-300 text-center">
        <Link href="/">Pokédex</Link>
      </h1>

      {isHomePage && (
        <div className="flex gap-3 items-center">
          <Search className="text-gray-300" size={24} />
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-1.5 rounded-md border border-gray-300 text-white"
            placeholder="Buscar Pokemon"
            value={search}
          />
        </div>
      )}
    </header>
  );
}
