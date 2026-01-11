"use client";

import { usePokemons } from "@/hooks/usePokemons";
import { Pokemon } from "@/interfaces/pokemon";
import { createContext, useContext, useState, ReactNode } from "react";

interface DataContextType {
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

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
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

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
