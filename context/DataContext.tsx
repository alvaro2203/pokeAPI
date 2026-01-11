"use client";

import { usePokemons } from "@/hooks/usePokemons";
import { DataContextType } from "@/interfaces/context";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from "react";

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

  const handleSearch = useCallback(
    (term: string) => {
      setSearch(term);
      setOffset(0);
    },
    [setSearch, setOffset]
  );

  const data = useMemo(
    () => ({
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
    }),
    [
      pokemons,
      loading,
      error,
      total,
      offset,
      limit,
      search,
      handleSearch,
      setOffset,
      setLimit,
    ]
  );

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
