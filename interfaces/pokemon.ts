
import { GameIndex, NamedAPIResource } from "./common";
import { PokemonHeldItem } from "./items";
import { PokemonMove } from "./moves";
import { PokemonSprites } from "./sprites";

export * from "./common";
export * from "./items";
export * from "./moves";
export * from "./sprites";

export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: PokemonAbility[];
    forms: NamedAPIResource[];
    game_indices: GameIndex[];
    held_items: PokemonHeldItem[];
    location_area_encounters: string;
    moves: PokemonMove[];
    past_types: PokemonPastType[];
    sprites: PokemonSprites;
    cries: PokemonCries;
    species: NamedAPIResource;
    stats: PokemonStat[];
    types: PokemonType[];
}

export interface PokemonAbility {
    is_hidden: boolean;
    slot: number;
    ability: NamedAPIResource;
}

export interface PokemonType {
    slot: number;
    type: NamedAPIResource;
}

export interface PokemonPastType {
    generation: NamedAPIResource;
    types: PokemonType[];
}

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
}

export interface PokemonCries {
    latest: string;
    legacy: string;
}