import { Pokemon } from "./pokemon";

export interface DataContextType {
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