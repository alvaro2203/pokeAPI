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
    <header className="flex justify-center items-center gap-10 mb-6">
      <h1 className="text-6xl font-extrabold uppercase text-amber-300 text-center">
        <Link href="/">Pokédex</Link>
      </h1>

      {isHomePage && (
        <div className="flex gap-3 items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-amber-300">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className="text-white border-0 focus:outline-none focus:ring-0"
            placeholder="Buscar Pokemon"
            value={search}
          />
          <Search className="text-gray-300" size={20} />
        </div>
      )}
    </header>
  );
}
