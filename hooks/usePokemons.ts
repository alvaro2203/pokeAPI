import { Pokemon } from "@/interfaces/pokemon"
import { getPokemonByName, getPokemons } from "@/services/pokemon"
import { useEffect, useState } from "react"

interface usePokemonsHook {
    pokemons: Pokemon[]
    loading: boolean
    error: string | null
    total: number
}

export const usePokemons = (limit?: number, offset?: number): usePokemonsHook => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                setLoading(true)
                setError(null)
                const { results, count } = await getPokemons(limit, offset)
                const pokemonsWithDetails = await Promise.all(results.map((pokemon: Pokemon) => getPokemonByName(pokemon.name)))
                setPokemons(pokemonsWithDetails)
                setTotal(count)
            } catch (error) {
                console.error("Failed to fetch pokemons:", error)
                setError("Failed to fetch pokemons")
            } finally {
                setLoading(false)
            }
        }
        fetchPokemons()
    }, [limit, offset])

    return { pokemons, loading, error, total }
}

interface usePokemonHook {
    pokemon: Pokemon | null
    loading: boolean
    error: string | null
}

export const usePokemon = (name: string): usePokemonHook => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!name) return;

        const fetchPokemon = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await getPokemonByName(name)
                setPokemon(data)
            } catch (error) {
                console.error("Failed to fetch pokemon:", error)
                setError("Failed to fetch pokemon")
            } finally {
                setLoading(false)
            }
        }
        fetchPokemon()
    }, [name])

    return { pokemon, loading, error }
}