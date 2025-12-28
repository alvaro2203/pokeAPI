"use client";

import PokemonCard from "@/components/PokemonCard";
import { usePokemons } from "@/hooks/usePokemons";
import { Pokemon } from "@/interfaces/pokemon";
import Link from "next/link";

export default function Home() {
  const { pokemons, loading, error } = usePokemons();

  if (loading)
    return <div className="text-2xl font-bold text-white">Loading...</div>;
  if (error || !pokemons)
    return <div className="text-2xl font-bold text-white">Error: {error}</div>;

  console.log(pokemons);

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {pokemons.map((pokemon: Pokemon) => (
          <Link href={`/${pokemon.name}`} key={pokemon.name}>
            <PokemonCard pokemon={pokemon} />
          </Link>
        ))}
      </div>
    </div>
  );
}
