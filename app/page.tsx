"use client";

import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import PokemonCard from "@/components/PokemonCard";
import { usePokemons } from "@/hooks/usePokemons";
import { Pokemon } from "@/interfaces/pokemon";
import Link from "next/link";
import { useState } from "react";
export default function Home() {
  const LIMIT = 10;
  const [offset, setOffset] = useState<number>(0);
  const { pokemons, loading, error } = usePokemons(LIMIT, offset);

  const handlePrevious = () => setOffset(offset - LIMIT);
  const handleNext = () => setOffset(offset + LIMIT);

  if (loading) return <Loader />;
  if (error || !pokemons)
    return <div className="text-2xl font-bold text-white">Error: {error}</div>;

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-5">
        {pokemons.map((pokemon: Pokemon) => (
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
