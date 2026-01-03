import { Pokemon } from "./pokemon"

interface queryState {
    loading: boolean
    error: string | null
}

export interface usePokemonsHook extends queryState {
    pokemons: Pokemon[]
    total: number
}

export interface usePokemonHook extends queryState {
    pokemon: Pokemon | null
}