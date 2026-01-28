"use client";

import { useData } from "@/context/DataContext";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const { search, setSearch } = useData();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className="mb-6 flex items-center justify-center gap-10">
      <h1 className="text-center text-6xl font-extrabold text-amber-300 uppercase">
        <Link href="/">Pokédex</Link>
      </h1>

      {isHomePage && (
        <div className="flex items-center gap-3 rounded-md border border-gray-300 px-3 py-2 focus-within:border-amber-300">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 text-white focus:ring-0 focus:outline-none"
            placeholder="Buscar Pokemon"
            value={search}
          />
          {search && (
            <button onClick={() => setSearch("")}>
              <X
                className="cursor-pointer text-gray-300 hover:text-amber-300"
                size={20}
              />
            </button>
          )}
          <Search
            className="cursor-pointer text-gray-300 hover:text-amber-300"
            size={20}
          />
        </div>
      )}
    </header>
  );
}
