"use client";

import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import PokemonCard from "@/components/PokemonCard";
import { usePokemons } from "@/hooks/usePokemons";
import { Pokemon } from "@/interfaces/pokemon";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const LIMIT = 10;
  const [offset, setOffset] = useState<number>(0);
  const {
    pokemons: paginatedPokemons,
    loading,
    error,
  } = usePokemons(LIMIT, offset);
  const [search, setSearch] = useState<string>("");

  const handlePrevious = () => setOffset(offset - LIMIT);
  const handleNext = () => setOffset(offset + LIMIT);

  const filteredPokemons = paginatedPokemons.filter((pokemon: Pokemon) =>
    pokemon.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  if (loading) return <Loader />;
  if (error || !paginatedPokemons)
    return <div className="text-2xl font-bold text-white">Error: {error}</div>;

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div className="flex gap-3 mb-10 items-center">
        <Search className="text-gray-300" size={24} />
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300"
          placeholder="Buscar Pokemon"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-5">
        {filteredPokemons.map((pokemon: Pokemon) => (
          <Link href={`/${pokemon.name}`} key={pokemon.name}>
            <PokemonCard pokemon={pokemon} />
          </Link>
        ))}
      </div>
      <Pagination
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        offset={offset}
      />
    </div>
  );
}
