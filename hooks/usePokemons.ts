import { usePokemonsHook } from "@/interfaces/hooks";
import { Pokemon, PokemonBase } from "@/interfaces/pokemon";
import { getPokemonByName, getAllPokemons } from "@/services/pokemon";
import { useEffect, useRef, useState } from "react";

export const usePokemons = (search: string = ""): usePokemonsHook => {
  // Visual state
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);

  // Pagination state
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  // Data state
  const allPokemonsRef = useRef<PokemonBase[]>([]);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

  // Loading state
  const [initialLoaded, setInitialLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const { results } = await getAllPokemons();
        allPokemonsRef.current = results;
        setInitialLoaded(true);
      } catch (error) {
        console.error("Failed to fetch all pokemons:", error);
        setError("Failed to fetch pokemons list");
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 450);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search]);

  useEffect(() => {
    if (!initialLoaded) return;
    let isMounted = true;

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const filtered = debouncedSearch
          ? allPokemonsRef.current.filter((p) =>
              p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
            )
          : allPokemonsRef.current;

        if (!isMounted) return;
        setTotal(filtered.length);

        const paginated = filtered.slice(offset, offset + limit);
        const details = await Promise.all(
          paginated.map((p) => getPokemonByName(p.name))
        );

        if (isMounted) {
          setPokemons(details);
          setLoading(false);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error("Failed to fetch pokemon details:", error);
        setError("Failed to fetch pokemon details");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();

    return () => {
      isMounted = false;
    };
  }, [initialLoaded, limit, offset, debouncedSearch]);

  return {
    pokemons,
    loading,
    error,
    total,
    offset,
    limit,
    setOffset,
    setLimit,
  };
};
