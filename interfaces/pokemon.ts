import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface Pokemon {
    name: string;
    url: string
    sprites: PokemonSprites
    types: { type: PokemonType }[]
    stats: PokemonStat[]
    weight: number
}

export interface PokemonStat {
    base_stat: number
    stat: PokemonType
}

export interface PokemonType {
    name: string
}

export interface PokemonSprites {
    front_default: string | StaticImport
}