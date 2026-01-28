"use client";

import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import PokemonCard from "@/components/PokemonCard";
import { useData } from "@/context/DataContext";
import { Pokemon } from "@/interfaces/pokemon";
import Link from "next/link";

export default function Home() {
  const { pokemons: paginatedPokemons, loading, error } = useData();

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {loading ? (
        <Loader />
      ) : error || !paginatedPokemons ? (
        <div className="text-2xl font-bold text-white">Error: {error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {paginatedPokemons.map((pokemon: Pokemon) => (
              <Link href={`/${pokemon.name}`} key={pokemon.name}>
                <PokemonCard pokemon={pokemon} />
              </Link>
            ))}
          </div>
          <div className="mt-1 flex w-full items-center justify-between px-6 text-sm text-gray-400">
            <Pagination />
          </div>
        </>
      )}
    </div>
  );
}
