"use client";

import Badge from "@/components/Badge";
import Loader from "@/components/Loader";
import { usePokemon } from "@/hooks/usePokemons";
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
      <h1 className="text-4xl font-extrabold uppercase text-center mb-5 tracking-widest text-slate-100 drop-shadow-lg">
        {pokemon.name}
      </h1>

      <div className="w-full max-w-4xl flex flex-col gap-6 justify-center">
        {/* Top Section: Sprites & Basic Info */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 shadow-xl border border-slate-700">
          {/* Sprite Carousel */}
          <div className="flex flex-col gap-2 mb-6">
            <h3 className="text-lg font-bold uppercase text-slate-400 mb-2">
              Sprites Gallery
            </h3>
            <div
              ref={scrollRef}
              className="flex overflow-x-auto gap-4 p-4 bg-slate-900/50 rounded-lg snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent"
            >
              {allSprites.length > 0 ? (
                allSprites.map((sprite, index) => (
                  <div key={index} className="shrink-0 snap-center">
                    <Image
                      src={sprite}
                      alt={`${pokemon.name} sprite ${index}`}
                      width={150}
                      height={150}
                      className="object-contain hover:scale-110 transition duration-300"
                    />
                  </div>
                ))
              ) : (
                <div className="text-slate-500 italic p-4">
                  No sprites available
                </div>
              )}
            </div>
            <p className="text-xs text-center text-slate-500 mt-1">
              Scroll to see more forms
            </p>
          </div>

          {/* Types & Basic Stats */}
          <div className="flex flex-wrap gap-8 justify-center items-center">
            {/* Main Image (First available or fallback) */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <Image
                  src={pokemonImage}
                  alt={pokemon.name}
                  width={220}
                  height={220}
                  className="drop-shadow-2xl animate-fade-in"
                  priority
                />
              </div>
              <div className="flex gap-3 mt-4">
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
            <div className="flex flex-col gap-3 min-w-[250px] grow uppercase">
              <h3 className="text-xl font-bold text-slate-200 border-b border-slate-700 pb-2">
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
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                      <div
                        className="bg-amber-400 h-1.5 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"
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
            <div className="flex flex-col gap-4 min-w-[200px] bg-slate-900/30 p-5 rounded-lg border border-slate-700/50 uppercase">
              <h3 className="text-xl font-bold text-slate-200 border-b border-slate-700 pb-2">
                About
              </h3>
              <div className="grid grid-cols-5 gap-y-6 gap-x-2 text-sm font-semibold">
                <span className="text-slate-400 col-span-3">Height</span>
                <span className="text-slate-200 font-mono col-span-2">
                  {pokemon.height / 10} m
                </span>

                <span className="text-slate-400 col-span-3">Weight</span>
                <span className="text-slate-200 font-mono col-span-2">
                  {pokemon.weight / 10} kg
                </span>

                <span className="text-slate-400 col-span-3">Base Exp.</span>
                <span className="text-slate-200 font-mono col-span-2">
                  {pokemon.base_experience}
                </span>

                <span className="text-slate-400 col-span-3">Id</span>
                <span className="text-slate-200 font-mono col-span-2">
                  #{pokemon.id}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Abilities, Moves, Cries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Abilities */}
          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 shadow-xl border border-slate-700">
            <h3 className="text-xl font-bold text-slate-200 mb-4 border-b border-slate-700 pb-2 uppercase">
              Abilities
            </h3>
            <div className="flex flex-col gap-2">
              {pokemon.abilities.map((ability) => (
                <div
                  key={ability.ability.name}
                  className="flex items-center justify-between bg-slate-900/40 p-3 rounded-lg border border-slate-700/30"
                >
                  <span className="capitalize text-slate-200 font-medium">
                    {ability.ability.name.replace("-", " ")}
                  </span>
                  {ability.is_hidden && (
                    <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-1 rounded tracking-wider uppercase">
                      Hidden
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cries */}
          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 shadow-xl border border-slate-700">
            <h3 className="text-xl font-bold text-slate-200 mb-4 border-b border-slate-700 pb-2 uppercase">
              Cries
            </h3>
            <div className="flex flex-col gap-3">
              {pokemon.cries.latest && (
                <div className="flex items-center justify-between bg-slate-900/40 p-3 rounded-lg border border-slate-700/30 px-6">
                  <span className="text-slate-300">Latest</span>
                  <audio
                    controls
                    src={pokemon.cries.latest}
                    className="h-8 w-60"
                  />
                </div>
              )}
              {pokemon.cries.legacy && (
                <div className="flex items-center justify-between bg-slate-900/40 p-3 rounded-lg border border-slate-700/30 px-6">
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
        <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 shadow-xl border border-slate-700">
          <h3 className="text-xl font-bold text-slate-200 mb-4 border-b border-slate-700 pb-2 uppercase">
            Moves ({pokemon.moves.length})
          </h3>
          <div className="h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800/50">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {pokemon.moves.map((move) => (
                <div
                  key={move.move.name}
                  className="bg-slate-900/40 p-2 rounded text-center border border-slate-700/30 hover:bg-slate-700/50 transition"
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
