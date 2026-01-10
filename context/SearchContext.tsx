"use client";

import { usePokemons } from "@/hooks/usePokemons";
import { Pokemon } from "@/interfaces/pokemon";
import { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextType {
  search: string;
  setSearch: (search: string) => void;
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
  total: number;
  offset: number;
  limit: number;
  setLimit: (limit: number) => void;
  setOffset: (offset: number) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState("");
  const {
    pokemons,
    loading,
    error,
    total,
    offset,
    limit,
    setOffset,
    setLimit,
  } = usePokemons(search);

  const handleSearch = (termino: string) => {
    setSearch(termino);
    setOffset(0);
  };

  const data = {
    pokemons,
    loading,
    error,
    total,
    offset,
    limit,
    setSearch: handleSearch,
    setOffset,
    setLimit,
    search,
  };

  return (
    <SearchContext.Provider value={data}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
