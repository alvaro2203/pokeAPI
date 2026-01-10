import { Pokemon } from "./pokemon"

interface queryState {
    loading: boolean
    error: string | null
}

export interface usePokemonsHook extends queryState {
    pokemons: Pokemon[]
    total: number
    offset: number
    limit: number
    setOffset: (offset: number) => void
    setLimit: (limit: number) => void
}

export interface usePokemonHook extends queryState {
    pokemon: Pokemon | null
}