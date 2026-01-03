"use client";

import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import PokemonCard from "@/components/PokemonCard";
import { useSearch } from "@/context/SearchContext";
import { usePokemons } from "@/hooks/usePokemons";
import { Pokemon } from "@/interfaces/pokemon";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const LIMIT = 10;
  const [offset, setOffset] = useState<number>(0);
  const { search } = useSearch();
  const {
    pokemons: paginatedPokemons,
    loading,
    error,
    total,
  } = usePokemons(LIMIT, offset, search);

  const [prevSearch, setPrevSearch] = useState(search);

  if (search !== prevSearch) {
    setPrevSearch(search);
    setOffset(0);
  }

  const totalPages = Math.ceil(total / LIMIT);

  const handleFirstPage = () => setOffset(0);
  const handleNext = () => offset + LIMIT < total && setOffset(offset + LIMIT);
  const handlePrevious = () => offset - LIMIT >= 0 && setOffset(offset - LIMIT);
  const handleLastPage = () => setOffset((totalPages - 1) * LIMIT);

  const currentPage = Math.ceil((offset + 1) / LIMIT);

  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      {loading ? (
        <Loader />
      ) : error || !paginatedPokemons ? (
        <div className="text-2xl font-bold text-white">Error: {error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {paginatedPokemons.map((pokemon: Pokemon) => (
              <Link href={`/${pokemon.name}`} key={pokemon.name}>
                <PokemonCard pokemon={pokemon} />
              </Link>
            ))}
          </div>
          <div className="flex justify-between items-center w-full px-6 mt-1 text-gray-400 text-sm">
            <span>Pokemons totales: {total}</span>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <Pagination
              handleFirstPage={handleFirstPage}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              handleLastPage={handleLastPage}
              isPreviousDisabled={offset === 0}
              isNextDisabled={offset + LIMIT >= total}
            />
          </div>
        </>
      )}
    </div>
  );
}
