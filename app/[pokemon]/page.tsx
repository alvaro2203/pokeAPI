"use client";

import Badge from "@/components/Badge";
import Loader from "@/components/Loader";
import { usePokemon } from "@/hooks/usePokemon";
import { getAllSprites, getAvailableSprite } from "@/interfaces/sprites";
import { typeColors } from "@/lib/consts";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRef } from "react";

export default function PokemonPage() {
  const { pokemon: pokemonName } = useParams();
  const { pokemon, loading, error } = usePokemon(pokemonName as string);

  // Use a ref for the scroll container to enable easier scrolling if needed later
  const scrollRef = useRef<HTMLDivElement>(null);

  if (loading) return <Loader />;
  if (error || !pokemon)
    return (
      <div className="text-2xl font-bold text-white">
        Error: {error || "Pokemon not found"}
      </div>
    );

  const allSprites = getAllSprites(pokemon.sprites);
  const pokemonImage = getAvailableSprite(pokemon.sprites);

  return (
    <>
      <h1 className="mb-5 text-center text-4xl font-extrabold tracking-widest text-slate-100 uppercase drop-shadow-lg">
        {pokemon.name}
      </h1>

      <div className="flex w-full max-w-4xl flex-col justify-center gap-6">
        {/* Top Section: Sprites & Basic Info */}
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 shadow-xl backdrop-blur-md">
          {/* Sprite Carousel */}
          <div className="mb-6 flex flex-col gap-2">
            <h3 className="mb-2 text-lg font-bold text-slate-400 uppercase">
              Sprites Gallery
            </h3>
            <div
              ref={scrollRef}
              className="scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent flex snap-x snap-mandatory gap-4 overflow-x-auto rounded-lg bg-slate-900/50 p-4"
            >
              {allSprites.length > 0 ? (
                allSprites.map((sprite, index) => (
                  <div key={index} className="shrink-0 snap-center">
                    <Image
                      src={sprite}
                      alt={`${pokemon.name} sprite ${index}`}
                      width={150}
                      height={150}
                      className="object-contain transition duration-300 hover:scale-110"
                    />
                  </div>
                ))
              ) : (
                <div className="p-4 text-slate-500 italic">
                  No sprites available
                </div>
              )}
            </div>
            <p className="mt-1 text-center text-xs text-slate-500">
              Scroll to see more forms
            </p>
          </div>

          {/* Types & Basic Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8">
            {/* Main Image (First available or fallback) */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <Image
                  src={pokemonImage}
                  alt={pokemon.name}
                  width={220}
                  height={220}
                  className="animate-fade-in drop-shadow-2xl"
                  priority
                />
              </div>
              <div className="mt-4 flex gap-3">
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

            {/* Stats Graph */}
            <div className="flex min-w-[250px] grow flex-col gap-3 uppercase">
              <h3 className="border-b border-slate-700 pb-2 text-xl font-bold text-slate-200">
                Base Stats
              </h3>
              <div className="flex flex-col gap-2 text-xs font-bold">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">
                        {stat.stat.name.replace("-", " ")}
                      </span>
                      <span className="text-amber-300">{stat.base_stat}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-700">
                      <div
                        className="h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                        style={{
                          width: `${
                            (Math.min(stat.base_stat, 255) / 255) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Base Info Card */}
            <div className="flex min-w-[200px] flex-col gap-4 rounded-lg border border-slate-700/50 bg-slate-900/30 p-5 uppercase">
              <h3 className="border-b border-slate-700 pb-2 text-xl font-bold text-slate-200">
                About
              </h3>
              <div className="grid grid-cols-5 gap-x-2 gap-y-6 text-sm font-semibold">
                <span className="col-span-3 text-slate-400">Height</span>
                <span className="col-span-2 font-mono text-slate-200">
                  {pokemon.height / 10} m
                </span>

                <span className="col-span-3 text-slate-400">Weight</span>
                <span className="col-span-2 font-mono text-slate-200">
                  {pokemon.weight / 10} kg
                </span>

                <span className="col-span-3 text-slate-400">Base Exp.</span>
                <span className="col-span-2 font-mono text-slate-200">
                  {pokemon.base_experience}
                </span>

                <span className="col-span-3 text-slate-400">Id</span>
                <span className="col-span-2 font-mono text-slate-200">
                  #{pokemon.id}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Abilities, Moves, Cries */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Abilities */}
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 shadow-xl backdrop-blur-md">
            <h3 className="mb-4 border-b border-slate-700 pb-2 text-xl font-bold text-slate-200 uppercase">
              Abilities
            </h3>
            <div className="flex flex-col gap-2">
              {pokemon.abilities.map((ability) => (
                <div
                  key={ability.ability.name}
                  className="flex items-center justify-between rounded-lg border border-slate-700/30 bg-slate-900/40 p-3"
                >
                  <span className="font-medium text-slate-200 capitalize">
                    {ability.ability.name.replace("-", " ")}
                  </span>
                  {ability.is_hidden && (
                    <span className="rounded bg-slate-700 px-2 py-1 text-[10px] tracking-wider text-slate-300 uppercase">
                      Hidden
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cries */}
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 shadow-xl backdrop-blur-md">
            <h3 className="mb-4 border-b border-slate-700 pb-2 text-xl font-bold text-slate-200 uppercase">
              Cries
            </h3>
            <div className="flex flex-col gap-3">
              {pokemon.cries.latest && (
                <div className="flex items-center justify-between rounded-lg border border-slate-700/30 bg-slate-900/40 p-3 px-6">
                  <span className="text-slate-300">Latest</span>
                  <audio
                    controls
                    src={pokemon.cries.latest}
                    className="h-8 w-60"
                  />
                </div>
              )}
              {pokemon.cries.legacy && (
                <div className="flex items-center justify-between rounded-lg border border-slate-700/30 bg-slate-900/40 p-3 px-6">
                  <span className="text-slate-300">Legacy</span>
                  <audio
                    controls
                    src={pokemon.cries.legacy}
                    className="h-8 w-60"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Moves Section */}
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 shadow-xl backdrop-blur-md">
          <h3 className="mb-4 border-b border-slate-700 pb-2 text-xl font-bold text-slate-200 uppercase">
            Moves ({pokemon.moves.length})
          </h3>
          <div className="scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800/50 h-64 overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {pokemon.moves.map((move) => (
                <div
                  key={move.move.name}
                  className="rounded border border-slate-700/30 bg-slate-900/40 p-2 text-center transition hover:bg-slate-700/50"
                >
                  <span className="text-xs text-slate-300 capitalize">
                    {move.move.name.replace("-", " ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
