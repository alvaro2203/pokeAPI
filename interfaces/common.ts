
export interface NamedAPIResource {
    name: string;
    url: string;
}

export interface GameIndex {
    game_index: number;
    version: NamedAPIResource;
}
