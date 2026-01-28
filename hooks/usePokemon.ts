import { usePokemonHook } from "@/interfaces/hooks";
import { Pokemon } from "@/interfaces/pokemon";
import { getPokemonByName } from "@/services/pokemon";
import { useEffect, useState } from "react";

export const usePokemon = (name: string): usePokemonHook => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;

    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPokemonByName(name);
        setPokemon(data);
      } catch (error) {
        console.error("Failed to fetch pokemon:", error);
        setError("Failed to fetch pokemon");
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [name]);

  return { pokemon, loading, error };
};
