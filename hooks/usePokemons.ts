import { usePokemonHook, usePokemonsHook } from "@/interfaces/hooks"
import { Pokemon, PokemonBase } from "@/interfaces/pokemon"
import { getPokemonByName, getAllPokemons } from "@/services/pokemon"
import { useEffect, useState } from "react"


export const usePokemons = (search: string = ""): usePokemonsHook => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [total, setTotal] = useState<number>(0)
    const [allPokemons, setAllPokemons] = useState<PokemonBase[]>([])
    const [initialLoaded, setInitialLoaded] = useState<boolean>(false)
    const [offset, setOffset] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)

    useEffect(() => {
        const loadAll = async () => {
            try {
                const { results } = await getAllPokemons()
                setAllPokemons(results)
                setInitialLoaded(true)
            } catch (error) {
                console.error("Failed to fetch all pokemons:", error)
                setError("Failed to fetch pokemons list")
                setLoading(false)
            }
        }
        loadAll()
    }, [])

    useEffect(() => {
        if (!initialLoaded) return

        const fetchDetails = async () => {
            try {
                setLoading(true)
                setError(null)

                const filtered = search
                    ? allPokemons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
                    : allPokemons

                setTotal(filtered.length)
                const paginated = filtered.slice(offset, offset + limit)
                const details = await Promise.all(
                    paginated.map((p) => getPokemonByName(p.name))
                )
                setPokemons(details)

            } catch (error) {
                console.error("Failed to fetch pokemon details:", error)
                setError("Failed to fetch pokemon details")
            } finally {
                setLoading(false)
            }
        }

        fetchDetails()
    }, [initialLoaded, allPokemons, limit, offset, search])

    return { pokemons, loading, error, total, offset, limit, setOffset, setLimit }
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