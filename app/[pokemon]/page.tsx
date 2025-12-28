"use client";

import Badge from "@/components/Badge";
import { usePokemon } from "@/hooks/usePokemons";
import { typeColors } from "@/lib/consts";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function PokemonPage() {
  const { pokemon: pokemonName } = useParams();
  const { pokemon, loading, error } = usePokemon(pokemonName as string);

  if (loading)
    return <div className="text-2xl font-bold text-white">Loading...</div>;
  if (error || !pokemon)
    return <div className="text-2xl font-bold text-white">Error: {error}</div>;

  return (
    <>
      <h1 className="text-4xl font-extrabold uppercase text-center mb-5">
        {pokemon.name}
      </h1>
      <div className="flex gap-5 items-center justify-center shadow-xl px-2 py-5 rounded-lg bg-linear-to-t to-slate-900">
        <div className="flex flex-col items-center">
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon?.name}
            className="hover:scale-110 transition duration-300"
            width={256}
            height={256}
          />
          <div className="flex gap-4 items-center">
            {pokemon.types.map((type) => (
              <Badge
                key={type.type.name}
                className={typeColors[type.type.name]}
              >
                {type.type.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 font-semibold uppercase">
          {pokemon.stats.map((stat) => (
            <div key={stat.stat.name} className="grid grid-cols-12">
              <span className="text-slate-200 col-span-10 hover:text-amber-300 transition duration-300 hover:cursor-pointer">
                {stat.stat.name}
              </span>
              <span className="text-amber-300">{stat.base_stat}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
